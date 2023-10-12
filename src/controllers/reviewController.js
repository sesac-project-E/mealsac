const path = require('path');
const {
  sequelize,
  User,
  Review,
  ReviewImage,
  ReviewUsefulness,
  Restaurant,
} = require('../models');

exports.getAllReviews = async (req, res) => {
  const user_id = req.session.userInfo ? req.session.userId : null;
  const { restaurant_id } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { restaurant_id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_name'],
        },
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
  const userInfo = req.session.userInfo ? req.session.userInfo : null;

  if (!userInfo || !userInfo.id) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const transaction = await sequelize.transaction();

  try {
    let restaurant = await Restaurant.findOne(
      {
        attributes: ['reviews_count', 'rating'],
        where: { restaurant_id },
      },
      { transaction },
    );

    const reviews_count = restaurant.dataValues.reviews_count;
    const restaurantRating = restaurant.dataValues.rating;

    const newReview = await Review.create(
      {
        review_id: null,
        content,
        rating,
        user_id: userInfo.id,
        restaurant_id: Number(restaurant_id),
      },
      { transaction },
    );

    if (!newReview || !newReview.review_id) {
      await transaction.rollback();
      return res.status(500).json({
        status: 'error',
        message: '리뷰 생성에 실패했습니다.',
      });
    }

    const imagePromises = (req.files || []).map(file => {
      const filePath = path.join('/static/img/reviewImage', file.filename);
      return ReviewImage.create(
        {
          image_id: null,
          review_id: newReview.review_id,
          image_url: filePath,
        },
        { transaction },
      );
    });

    const images = await Promise.all(imagePromises);
    const updateRating =
      (restaurantRating * reviews_count + rating) / (reviews_count + 1);
    await Restaurant.update(
      {
        reviews_count: reviews_count + 1,
        rating: updateRating,
      },
      {
        where: { restaurant_id },
        transaction,
      },
    );

    await transaction.commit();

    res.status(201).json({
      status: 'success',
      message: '성공적으로 리뷰를 등록했습니다.',
      review: {
        review_id: newReview.review_id,
        content: newReview.content,
        rating: newReview.rating,
        user_id: newReview.user_id,
        images: images.map(image => image.image_url),
      },
    });
  } catch (error) {
    await transaction.rollback();
    console.error('에러 정보: ', error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 등록하는 동안 오류가 발생했습니다.',
    });
  }
};

exports.recommendReview = async (req, res) => {
  const userInfo = req.session.userInfo ? req.session.userInfo : null;

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
  const userInfo = req.session.userInfo ? req.session.userInfo : null;

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
  const userInfo = req.session.userInfo ? req.session.userInfo : null;

  if (!userInfo || !userInfo.id) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.id;

  try {
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
    });

    if (reviews.length === 0) {
      return res.json({
        status: 'success',
        message: '사용자가 작성한 리뷰가 없습니다.',
        data: [],
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

    res.json({ status: 'success', data: reviewsWithUsefulness });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 가져오는 동안 오류가 발생했습니다.',
    });
  }
};

exports.editReview = async (req, res) => {
  const userInfo = req.session.userInfo ? req.session.userInfo : null;

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
    const oldReviewRating = review.dataValues.rating;
    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: '해당 리뷰를 찾을 수 없거나 사용자가 작성한 리뷰가 아닙니다.',
      });
    }

    review.content = content;
    review.rating = rating;

    await review.save();
    const restaurant_id = review.restaurant_id;
    const currRating = review.rating;
    const restaurant = await Restaurant.findOne({
      attributes: ['restaurant_id', 'reviews_count', 'rating'],
      where: { restaurant_id: restaurant_id },
    });
    const reviews_count = restaurant.dataValues.reviews_count;
    const oldRating = restaurant.dataValues.rating;
    const updateRating =
      (oldRating * reviews_count - oldReviewRating + currRating) /
      reviews_count;
    await restaurant.update(
      {
        rating: updateRating,
      },
      {
        where: { restaurant_id: restaurant.dataValues.restaurant_id },
      },
    );
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
  const userInfo = req.session.userInfo ? req.session.userInfo : null;

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
    const reviews_count = restaurant.dataValues.reviews_count;
    const restaurantRating = restaurant.dataValues.rating;
    const updateRating =
      (restaurantRating * reviews_count - currRating) / (reviews_count - 1);
    await Restaurant.update(
      {
        reviews_count: reviews_count - 1,
        rating: updateRating,
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
