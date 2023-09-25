/**
 * 주어진 인덱스에 해당하는 음식점 타입을 반환한다.
 *
 * @param {number} restaurantType - 음식점 타입에 대한 인덱스 (1부터 시작)
 * @returns {string} 해당 인덱스에 대응되는 음식점 타입
 *
 * @example
 * const type = restaurantType(1); // '한식'
 */
module.exports.restaurantType = restaurantType => {
  const type = [
    '한식',
    '중식',
    '분식',
    '일식',
    '양식',
    '펍',
    '치킨',
    '족발, 보쌈',
    '카페',
    '고기구이',
    '아시안',
    '디저트',
    '패스트푸드',
    '편의점',
  ];

  return type[restaurantType - 1];
};
