const { Review, ReviewImage, ReviewUsefulness } = require('../models');

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
          as: 'images',
        },
        {
          model: ReviewUsefulness,
          attributes: ['review_id', 'user_id'],
          as: 'ReviewUsefulness',
        },
      ],
    });

    const reviewsWithUsefulness = reviews.map(review => {
      const totalRecommendations = review.ReviewUsefulness.length;
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

    res.json({ status: 'success', data: reviewsWithUsefulness });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '리뷰를 가져오는 동안 오류가 발생했습니다.',
    });
  }
};
