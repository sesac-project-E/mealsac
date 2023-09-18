document
  .querySelector('.userRestaurant button:first-child')
  .addEventListener('click', () => {
    console.log('1');

    document
      .querySelector('.userRestaurant button:first-child')
      .classList.add('clicked');
    document
      .querySelector('.userRestaurant button:nth-child(2)')
      .classList.remove('clicked');
    document
      .querySelector('.userRestaurant button:nth-child(3)')
      .classList.remove('clicked');
    document.querySelector('.list div:first-child').style.display = 'block';
    document.querySelector('.list div:nth-child(2)').style.display = 'none';
    document.querySelector('.list div:nth-child(3)').style.display = 'none';
  });

document
  .querySelector('.userRestaurant button:nth-child(2)')
  .addEventListener('click', () => {
    console.log('2');

    document
      .querySelector('.userRestaurant button:first-child')
      .classList.remove('clicked');
    document
      .querySelector('.userRestaurant button:nth-child(2)')
      .classList.add('clicked');
    document
      .querySelector('.userRestaurant button:nth-child(3)')
      .classList.remove('clicked');
    document.querySelector('.list div:first-child').style.display = 'none';
    document.querySelector('.list div:nth-child(2)').style.display = 'block';
    document.querySelector('.list div:nth-child(3)').style.display = 'none';
  });

document
  .querySelector('.userRestaurant button:nth-child(3)')
  .addEventListener('click', () => {
    console.log('3');

    document
      .querySelector('.userRestaurant button:first-child')
      .classList.remove('clicked');
    document
      .querySelector('.userRestaurant button:nth-child(2)')
      .classList.remove('clicked');
    document
      .querySelector('.userRestaurant button:nth-child(3)')
      .classList.add('clicked');
    document.querySelector('.list div:first-child').style.display = 'none';
    document.querySelector('.list div:nth-child(2)').style.display = 'block';
    document.querySelector('.list div:nth-child(3)').style.display = 'none';
  });

// const likeList = () => {
//   alert('...b');
//   document.getElementById('myLike').classList.add('clicked');
//   document.getElementById('myReview').classList.remove('clicked');
//   document.getElementById('myPost').classList.remove('clicked');
//   document.getElementById('myLikes').style.display = 'block';
//   document.getElementById('myReviews').style.display = 'none';
//   document.getElementById('myPosts').style.display = 'none';
// };

// const reviewList = () => {
//   alert('...b');

//   document.getElementById('myReview').classList.add('clicked');
//   document.getElementById('myLike').classList.remove('clicked');
//   document.getElementById('myPost').classList.remove('clicked');
//   document.getElementById('myReviews').style.display = 'block';
//   document.getElementById('myLikes').style.display = 'none';
//   document.getElementById('myPosts').style.display = 'none';
// };
// const postList = () => {
//   alert('...b');

//   document.getElementById('myPost').classList.add('clicked');
//   document.getElementById('myReview').classList.remove('clicked');
//   document.getElementById('myLike').classList.remove('clicked');
//   document.getElementById('myReviews').style.display = 'block';
//   document.getElementById('myLikes').style.display = 'none';
//   document.getElementById('myPosts').style.display = 'none';
// };

const heartElements = document.querySelectorAll('.heart');
heartElements.forEach(heartElement => {
  heartElement.addEventListener('click', e => {
    e.target.setAttribute('src', '../../static/img/heartFilled.png');
  });
});
