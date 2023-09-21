const category = () => {
  history.back();
};

// 컨트롤러 완성 후 주석 풀기
const myPost = () => {
  const btnBox = document.querySelector('.btnBox');
  if (`${post.user_id}` === `${user.id}`) {
    btnBox.style.display = 'block';
  } else {
    btnBox.style.display = 'none';
  }
};

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

// 수정
const modifyBtn = () => {
  location.href = `/post/edit/${post_id}`;
  // location.href = `/post/edit/post_id`;
};

// 삭제
const deleteBtn = async () => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/post/${post.post_id}`,
      data: { post_id: post.post_id },
    });
    if (res.data.result) {
      location.href = '/board';
    }
  } catch (err) {
    console.log(err);
  }
};
