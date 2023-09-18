const path = require('path');
const {
  Review,
  ReviewImage,
  ReviewUsefulness,
  Restaurant,
} = require('../models');

exports.getAllReviews = async (req, res) => {
  const user_id = req.session ? req.session.userId : null;
  const { restaurant_id } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { restaurant_id },
      include: [
        {
          model: ReviewImage,
          attributes: ['image_url'],
        },
        {
          model: ReviewUsefulness,
          attributes: ['review_id', 'user_id'],
          as: 'reviewUsefulness',
        },
      ],
    });

    const reviewsWithUsefulness = reviews.map(review => {
      const totalRecommendations = review.ReviewUsefulness
        ? review.ReviewUsefulness.length
        : 0;
      let didIRecommend = false;

      if (user_id) {
        didIRecommend = !!review.ReviewUsefulness.find(
          data => data.user_id === user_id,
        );
      }

      return {
        ...review.get(),
        totalRecommendations,
        is_useful: didIRecommend,
      };
    });
    // res.json({ status: 'success', data: reviewsWithUsefulness });
    return reviewsWithUsefulness;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 가져오는 동안 오류가 발생했습니다.',
    });
  }
};

exports.postReview = async (req, res) => {
  const { restaurant_id } = req.params;
  const { content, rating } = req.body;
  const userInfo = req.session ? req.session.userInfo : null;
  if (!userInfo || !userInfo.id) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  try {
    let restaurant = await Restaurant.findOne({
      attributes: ['reviews_count', 'rating'],
      where: { restaurant_id: restaurant_id },
    });
    let reviews_count = restaurant.dataValues.reviews_count;
    let restaurantRating = restaurant.dataValues.rating;
    const newReview = await Review.create({
      content: content,
      rating: rating,
      user_id: userInfo.id,
      restaurant_id: Number(restaurant_id),
    });

    const imagePromises = (req.files || []).map(file => {
      const filePath = path.join('/static/img/reviewImage', file.filename);
      return ReviewImage.create({
        review_id: newReview.review_id,
        image_url: filePath,
      });
    });
    await Promise.all(imagePromises);
    await Restaurant.update(
      {
        reviews_count: reviews_count + 1,
        rating:
          (restaurantRating * reviews_count + rating) / (reviews_count + 1),
      },
      { where: { restaurant_id: restaurant_id } },
    );
    res.status(201).json({
      status: 'success',
      message: '성공적으로 리뷰를 등록했습니다.',
    });
  } catch (error) {
    console.error('에러 정보: ', error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 등록하는 동안 오류가 발생했습니다.',
    });
  }
};

exports.recommendReview = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || !userInfo.id) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.id;
  const { review_id } = req.params;

  try {
    const existingUsefulness = await ReviewUsefulness.findOne({
      where: {
        review_id,
        user_id,
      },
    });

    if (existingUsefulness) {
      return res.json({
        isSuccess: false,
        message: '이미 해당 리뷰에 추천을 하셨습니다.',
      });
    }

    await ReviewUsefulness.create({
      review_id,
      user_id,
    });

    res.json({ message: '성공적으로 리뷰를 추천하셨습니다.' });
  } catch (error) {
    res
      .status(500)
      .json({ message: '해당 리뷰를 추천하는 것에 오류가 발생했습니다.' });
  }
};

exports.unrecommendReview = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || !userInfo.id) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.id;
  const { review_id } = req.params;

  try {
    const existingUsefulness = await ReviewUsefulness.findOne({
      where: {
        review_id,
        user_id,
      },
    });

    if (!existingUsefulness) {
      return res.status(400).json({
        isSuccess: false,
        message: '해당 리뷰에 추천을 하지 않으셨습니다.',
      });
    }

    await ReviewUsefulness.destroy({
      where: {
        review_id,
        user_id,
      },
    });

    res.json({ message: '성공적으로 리뷰 추천을 취소하셨습니다.' });
  } catch (error) {
    res
      .status(500)
      .json({ message: '리뷰 추천을 취소하는 것에 오류가 발생했습니다.' });
  }
};

exports.getMyReviews = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || !userInfo.id) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.id;
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    const totalReviews = await Review.count({ where: { user_id } });
    const totalPages = Math.ceil(totalReviews / limit);

    const reviews = await Review.findAll({
      where: { user_id },
      include: [
        {
          model: ReviewImage,
          attributes: ['image_url'],
        },
        {
          model: Restaurant,
          attributes: ['restaurant_name'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    if (reviews.length === 0) {
      return res.json({
        status: 'success',
        message: '사용자가 작성한 리뷰가 없습니다.',
        data: [],
        totalPages: 0,
      });
    }

    const reviewsWithUsefulness = await Promise.all(
      reviews.map(async review => {
        const reviewJSON = review.toJSON();
        const usefulnessCount = await ReviewUsefulness.count({
          where: { review_id: reviewJSON.review_id },
        });
        return { ...reviewJSON, usefulnessCount };
      }),
    );

    res.json({ status: 'success', data: reviewsWithUsefulness, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 가져오는 동안 오류가 발생했습니다.',
    });
  }
};

exports.editReview = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || !userInfo.id) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.id;
  const { review_id } = req.params;
  const { content, rating } = req.body;

  try {
    const review = await Review.findOne({
      where: { review_id, user_id },
    });

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: '해당 리뷰를 찾을 수 없거나 사용자가 작성한 리뷰가 아닙니다.',
      });
    }

    review.content = content;
    review.rating = rating;

    await review.save();

    res.json({
      status: 'success',
      message: '리뷰가 성공적으로 업데이트되었습니다.',
      data: review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 업데이트하는 동안 오류가 발생했습니다.',
    });
  }
};

exports.deleteReview = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || (!userInfo.id && !userInfo.isAdmin)) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.id;
  const { review_id } = req.params;

  try {
    const review = await Review.findOne({
      where: { review_id },
    });

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: '해당 리뷰를 찾을 수 없습니다.',
      });
    }

    // 리뷰 작성자 또는 관리자만 리뷰를 삭제할 수 있도록 함
    if (review.user_id !== user_id && !userInfo.isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: '리뷰를 삭제할 권한이 없습니다.',
      });
    }

    const restaurant_id = review.restaurant_id;
    const currRating = review.rating;

    await ReviewUsefulness.destroy({ where: { review_id } });
    await ReviewImage.destroy({ where: { review_id } });
    await review.destroy();
    let restaurant = await Restaurant.findOne({
      attributes: ['reviews_count', 'rating'],
      where: { restaurant_id: restaurant_id },
    });
    let reviews_count = restaurant.dataValues.reviews_count;
    let restaurantRating = restaurant.dataValues.rating;

    await Restaurant.update(
      {
        reviews_count: reviews_count - 1,
        rating:
          (restaurantRating * reviews_count - currRating) / (reviews_count - 1),
      },
      { where: { restaurant_id: restaurant_id } },
    );
    res.json({
      status: 'success',
      message: '리뷰가 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 삭제하는 동안 오류가 발생했습니다.',
    });
  }
};
