const likeList = () => {
  document.getElementById('myLike').classList.add('clicked');
  document.getElementById('myReview').classList.remove('clicked');
  document.getElementById('myPost').classList.remove('clicked');
  document.getElementById('myLikes').style.display = 'block';
  document.getElementById('myReviews').style.display = 'none';
  document.getElementById('myPosts').style.display = 'none';
};

const reviewList = () => {
  document.getElementById('myReview').classList.add('clicked');
  document.getElementById('myLike').classList.remove('clicked');
  document.getElementById('myPost').classList.remove('clicked');
  document.getElementById('myReviews').style.display = 'block';
  document.getElementById('myLikes').style.display = 'none';
  document.getElementById('myPosts').style.display = 'none';
};
const postList = () => {
  document.getElementById('myPost').classList.add('clicked');
  document.getElementById('myReview').classList.remove('clicked');
  document.getElementById('myLike').classList.remove('clicked');
  document.getElementById('myReviews').style.display = 'block';
  document.getElementById('myLikes').style.display = 'none';
  document.getElementById('myPosts').style.display = 'none';
};

const heartElements = document.querySelectorAll('.heart');
heartElements.forEach(heartElement => {
  heartElement.addEventListener('click', e => {
    e.target.setAttribute('src', '../../static/img/heartFilled.png');
  });
});
