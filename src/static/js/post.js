const category = () => {
  history.back();
};

// 컨트롤러 완성 후
// const myPost = () => {
//   const btnBox = document.querySelector('.btnBox');
//   if (`${post.user_id}` === `${user.id}`) {
//     btnBox.style.display = 'block';
//   } else {
//     btnBox.style.display = 'none';
//   }
// };

document.addEventListener('DOMContentLoaded', function () {
  const replyForm = document.getElementById('replyForm');
  const loginStatus = getCookie('loginStatus');

  if (loginStatus === 'loggedIn') {
    replyForm.style.display = 'flex';
  } else {
    replyForm.style.display = 'none';
  }
});

// 리뷰 등록
const enterReply = async e => {
  e.preventDefault();

  const replyForm = document.getElementById('replyForm');

  const formData = new FormData(replyForm);
  const replyContent = formData.get('replyContent');
};
