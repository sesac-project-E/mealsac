app.get('/', async (req, res) => {
  // 데이터베이스 또는 API에서 식당 정보 가져오기
  const popularRestaurants = await getPopularRestaurants(); // 인기 식당 가져오는 함수
  const recentRestaurants = await getRecentRestaurants(); // 신규 식당 가져오는 함수
  const userPickRestaurants = await getUserPickRestaurants(); // 사용자가 찜한 식당 가져오는 함수

  res.render('index', {
    popularRestaurants: popularRestaurants,
    newRestaurants: newRestaurants,
    userFavorites: userFavorites,
  });
});
