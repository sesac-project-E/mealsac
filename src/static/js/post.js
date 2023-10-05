const replyForm = document.querySelector('#replyForm')
const replyBtnGroup = document.querySelector('.replyBtnGroup')
const replyToggleBtn = document.querySelector('.replyToggleBtn')
const commentModifyBtn = document.querySelector('.commentModifyBtn')

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
  const postId = document.querySelector('.postBox').id;
  const formData = new FormData(replyForm);
  const replyContent = formData.get('replyContent');
  await axios.post('/api/comment', {
    post_id : `${postId}`,
    content : `${replyContent}`
  })
  .then(() => {
    location.reload(true)
  })
  .catch((err) => {
    console.error(err)
  })
};
replyForm.addEventListener('submit', enterReply)

// 수정
const modifyBtn = () => {
  const postId = document.querySelector('.postBox').id;
  location.href = `/post/edit/${postId}`;
};

// 삭제
const deleteBtn = async () => {
  const postId = document.querySelector('.postBox').id;
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/post/${postId}`,
    });
    if (res.data.status === 'success') {
      location.href = '/board';
    }
  } catch (err) {
    console.log(err);
  }
};


const toggleReply = (commentId, content) => {
  const replyContent = document.querySelector(`#replyContent_${commentId}`)
  if (replyContent.classList.contains('notEdit')) {
    replyContent.remove()
    const replyContentContainer = document.querySelector(`#replyContentContainer_${commentId}`)
    replyContentContainer.innerHTML = `
    <input autofocus type="text" class="replycontent" value="${content}" id="replyContent_${commentId}">
    <div class="replyBtnGroup" id="replyBtnGroup_${commentId}">
      <button class="replyBtn replyModifyBtn" onclick="editReply(${commentId})" >수정</button>
      <button class="replyBtn replyDeleteBtn" onclick="deleteReply(${commentId})">삭제</button>
    </div>
    `
  } else {
    const replyContentContainer = document.querySelector(`#replyContentContainer_${commentId}`)
    replyContentContainer.innerHTML = `<div style="" class="replyContent notEdit" id="replyContent_${commentId}"> ${content}</div>`
  }
}
// reply Edit
const editReply = (commentId) => {
  if (confirm('수정하시겠습니까?')) {
    const replyInput = document.querySelector(`#replyContent_${commentId}`)
    axios({
      method : 'put',
      url : '/api/comment',
      data : {
        comment_id : commentId,
        content : replyInput.value
      }
    })
    .then(() => {
      location.reload(true)
    })
    .catch((error) => {
      console.error(error)
    })
  }
}

// reply Delete
const deleteReply = (commentId) => {
  if (confirm("정말로 삭제하시겠습니까?")) {
    axios({
      method: 'delete',
      url : '/api/comment/',
      data : {
        comment_id : commentId
      }
    })
    .then(() => {
      document.querySelector(`#reply_${commentId}`).remove()
      // location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
    console.log(commentId)
  }
}
