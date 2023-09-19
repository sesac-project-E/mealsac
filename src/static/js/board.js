const freeBoardBtn = document.querySelector('#freeBoard');
const noticeBoardBtn = document.querySelector('#noticeBoard');
const freeBoardList = document.querySelector('#freeBoardList');
const noticeBoardList = document.querySelector('#noticeBoardList');
const noticeBoardPage = document.querySelector('#noticeBoardPage');
const freeBoardPage = document.querySelector('#freeBoardPage');

const freeBoard = () => {
  freeBoardBtn.classList.add('clicked');
  noticeBoardBtn.classList.remove('clicked');

  freeBoardList.style.display = 'flex';
  noticeBoardList.style.display = 'none';
};

const noticeBoard = async () => {
  noticeBoardBtn.classList.add('clicked');
  freeBoardBtn.classList.remove('clicked');

  freeBoardList.style.display = 'none';
  noticeBoardList.style.display = 'flex';

  try {
    const res = await axios.get('/api/post/notice');
    const noticePosts = res.data;

    const tableBody = document.querySelector('.noticeBoardTable');
    const pagination = document.querySelector('#noticeBoardPage');

    const postsPerPage = 10; // 페이지 당 게시물 수
    let currentPage = 1; // 현재 페이지

    function displayPosts(posts, page) {
      const startIndex = (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const displayedPosts = posts.slice(startIndex, endIndex);

      tableBody.innerHTML = '';

      displayedPosts.forEach((post, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
              <th scope="row" class="idx">${startIndex + index + 1}</th>
              <td class="title"><a href="/post/${post.post_id}">${
          post.title
        }</a></td>
              <td class="writer">${post.board_name}</td>
              <td class="date">${post.updated_at}</td>
            `;
        tableBody.appendChild(row);
      });
    }

    function updatePagination(totalPosts) {
      pagination.innerHTML = ''; // 페이지네이션 초기화
      const totalPages = Math.ceil(totalPostsForBoard1 / postsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.classList.add('page-link');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.dataset.page = i;

        pageLink.addEventListener('click', event => {
          event.preventDefault();
          currentPage = parseInt(event.target.dataset.page, 10);
          displayPosts(Post, currentPage);
        });

        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.appendChild(pageLink);

        pagination.appendChild(pageItem);
      }
    }

    displayPosts(Post, currentPage);
    updatePagination(Post);
  } catch (error) {
    // 에러가 발생하면 콘솔에 에러 메시지를 출력합니다.
    console.error('에러 발생:', error);
  }
};

// 임시 데이터
const Post = [
  {
    post_id: 1,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 2,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 3,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 4,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 5,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 6,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 7,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 8,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 9,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 10,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 11,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 12,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 13,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 14,
    user_id: 4,
    board_id: 1,
    title: 'aaa',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 1,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 2,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 3,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 4,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 5,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 6,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 7,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 8,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 9,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 10,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 11,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 12,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 13,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
  {
    post_id: 14,
    user_id: 4,
    board_id: 2,
    title: '공지',
    board_name: 'dd',
    content: 'ssss',
    updated_at: '2023.10.07 09:10',
    views: 12,
  },
];

document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.querySelector('.freeBoardTable');
  const pagination = document.querySelector('#freeBoardPage');

  const postsPerPage = 10; // 페이지 당 게시물 수
  let currentPage = 1; // 현재 페이지

  function displayPosts(posts, page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    // board_id가 1인 게시물만 필터링
    const displayedPosts = posts
      .filter(post => post.board_id === 1)
      .slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    displayedPosts.forEach((post, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
              <th scope="row" class="idx">${startIndex + index + 1}</th>
              <td class="title"><a href="/post/${post.post_id}">${
        post.title
      }</a></td>
              <td class="writer">${post.board_name}</td>
              <td class="date">${post.updated_at}</td>
            `;
      tableBody.appendChild(row);
    });
  }

  function updatePagination(totalPosts) {
    pagination.innerHTML = ''; // 페이지네이션 초기화

    // board_id가 1인 게시물 수를 세기
    const totalPostsForBoard1 = totalPosts.filter(
      post => post.board_id === 1,
    ).length;

    const totalPages = Math.ceil(totalPostsForBoard1 / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.classList.add('page-link');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.dataset.page = i;

      pageLink.addEventListener('click', event => {
        event.preventDefault();
        currentPage = parseInt(event.target.dataset.page, 10);
        displayPosts(Post, currentPage);
      });

      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      pageItem.appendChild(pageLink);

      pagination.appendChild(pageItem);
    }
  }

  displayPosts(Post, currentPage);
  updatePagination(Post);
});

// 공지사항
// document.addEventListener('DOMContentLoaded', function () {
// const tableBody = document.querySelector('.noticeBoardTable');
// const pagination = document.querySelector('#noticeBoardPage');
// const postsPerPage = 10; // 페이지 당 게시물 수
// let currentPage = 1; // 현재 페이지
// function displayPosts(posts, page) {
//   const startIndex = (page - 1) * postsPerPage;
//   const endIndex = startIndex + postsPerPage;
//   // board_id가 2인 게시물만 필터링
//   const displayedPosts = posts
//     .filter(post => post.board_id === 2)
//     .slice(startIndex, endIndex);
//   tableBody.innerHTML = '';
//   displayedPosts.forEach((post, index) => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//             <th scope="row" class="idx">${startIndex + index + 1}</th>
//             <td class="title"><a href="/post/${post.post_id}">${
//       post.title
//     }</a></td>
//             <td class="writer">${post.board_name}</td>
//             <td class="date">${post.updated_at}</td>
//           `;
//     tableBody.appendChild(row);
//   });
// }
// function updatePagination(totalPosts) {
//   pagination.innerHTML = ''; // 페이지네이션 초기화
//   const totalPostsForBoard1 = totalPosts.filter(
//     post => post.board_id === 2,
//   ).length;
//   const totalPages = Math.ceil(totalPostsForBoard1 / postsPerPage);
//   for (let i = 1; i <= totalPages; i++) {
//     const pageLink = document.createElement('a');
//     pageLink.classList.add('page-link');
//     pageLink.href = '#';
//     pageLink.textContent = i;
//     pageLink.dataset.page = i;
//     pageLink.addEventListener('click', event => {
//       event.preventDefault();
//       currentPage = parseInt(event.target.dataset.page, 10);
//       displayPosts(Post, currentPage);
//     });
//     const pageItem = document.createElement('li');
//     pageItem.classList.add('page-item');
//     pageItem.appendChild(pageLink);
//     pagination.appendChild(pageItem);
//   }
// }
// displayPosts(Post, currentPage);
// updatePagination(Post);
// });

// 로그인 유무 글쓰기 버튼
function getCookie(name) {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(name + '=') === 0) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

window.addEventListener('load', () => {
  var loginStatus = getCookie('loginStatus');

  if (loginStatus === 'loggedIn') {
    document.querySelector('.write').style.display = 'block';
    document.querySelector('#noticeWrite').style.display = 'block';
  } else {
    document.querySelector('.write').style.display = 'none';
    document.querySelector('#noticeWrite').style.display = 'none';
  }
});
