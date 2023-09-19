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

const noticeBoard = () => {
  noticeBoardBtn.classList.add('clicked');
  freeBoardBtn.classList.remove('clicked');

  freeBoardList.style.display = 'none';
  noticeBoardList.style.display = 'flex';
};

// 임시 데이터
const freePosts = [
  {
    title: '제목12',
    board_name: '닉네임12',
    updated_at: '2023.10.08 14:55',
  },
  {
    title: '제목11',
    board_name: '닉네임11',
    updated_at: '2023.10.07 09:10',
  },
  {
    title: '제목10',
    board_name: '닉네임10',
    updated_at: '2023.10.06 22:30',
  },
  {
    title: '제목9',
    board_name: '닉네임9',
    updated_at: '2023.10.05 20:05',
  },
  {
    title: '제목8',
    board_name: '닉네임8',
    updated_at: '2023.10.04 18:25',
  },
  {
    title: '제목7',
    board_name: '닉네임7',
    updated_at: '2023.10.03 17:45',
  },
  {
    title: '제목6',
    board_name: '닉네임6',
    updated_at: '2023.10.02 16:10',
  },
  {
    title: '제목5',
    board_name: '닉네임5',
    updated_at: '2023.10.01 14:20',
  },
  {
    title: '제목4',
    board_name: '닉네임4',
    updated_at: '2023.09.30 12:30',
  },
  {
    title: '제목3',
    board_name: '닉네임3',
    updated_at: '2023.09.29 11:15',
  },
  {
    title: '제목2',
    board_name: '닉네임2',
    updated_at: '2023.09.28 10:45',
  },
  {
    title: '제목1',
    board_name: '닉네임1',
    updated_at: '2023.09.27 09:36',
  },
];
const noticePosts = [
  {
    title: '공지12',
    board_name: 'admin',
    updated_at: '2023.10.08 14:55',
  },
  {
    title: '공지11',
    board_name: 'admin',
    updated_at: '2023.10.07 09:10',
  },
  {
    title: '공지10',
    board_name: 'admin',
    updated_at: '2023.10.06 22:30',
  },
  {
    title: '공지9',
    board_name: 'admin',
    updated_at: '2023.10.05 20:05',
  },
  {
    title: '공지8',
    board_name: 'admin',
    updated_at: '2023.10.04 18:25',
  },
  {
    title: '공지7',
    board_name: 'admin',
    updated_at: '2023.10.03 17:45',
  },
  {
    title: '공지6',
    board_name: 'admin',
    updated_at: '2023.10.02 16:10',
  },
  {
    title: '공지5',
    board_name: 'admin',
    updated_at: '2023.10.01 14:20',
  },
  {
    title: '공지4',
    board_name: 'admin',
    updated_at: '2023.09.30 12:30',
  },
  {
    title: '공지3',
    board_name: 'admin',
    updated_at: '2023.09.29 11:15',
  },
  {
    title: '공지2',
    board_name: 'admin',
    updated_at: '2023.09.28 10:45',
  },
  {
    title: '공지1',
    board_name: 'admin',
    updated_at: '2023.09.27 09:36',
  },
];

// 자유게시판 페이지
document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.querySelector('.freeBoardTable');
  const pagination = document.querySelector('#freeBoardPage');

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
              <td class="title"><a href="/post">${post.title}</a></td>
              <td class="writer">${post.board_name}</td>
              <td class="date">${post.updated_at}</td>
            `;
      tableBody.appendChild(row);
    });
  }

  function updatePagination(totalPosts) {
    pagination.innerHTML = ''; // 페이지네이션 초기화

    // 전체 페이지 수를 계산
    const totalPages = Math.ceil(totalPosts.length / postsPerPage);

    // 페이지 번호를 생성, 이벤트 등록
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.classList.add('page-link');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.dataset.page = i;

      pageLink.addEventListener('click', event => {
        event.preventDefault();
        currentPage = parseInt(event.target.dataset.page, 10);
        displayPosts(freePosts, currentPage);
      });

      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      pageItem.appendChild(pageLink);

      pagination.appendChild(pageItem);
    }
  }

  displayPosts(freePosts, currentPage);
  updatePagination(freePosts);
});

// 공지사항 페이지네이션
document.addEventListener('DOMContentLoaded', function () {
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
                <td class="title"><a href="/post">${post.title}</a></td>
                <td class="writer">${post.board_name}</td>
                <td class="date">${post.updated_at}</td>
              `;
      tableBody.appendChild(row);
    });
  }

  function updatePagination(totalPosts) {
    pagination.innerHTML = ''; // 페이지네이션 초기화

    // 전체 페이지 수를 계산
    const totalPages = Math.ceil(totalPosts.length / postsPerPage);

    // 페이지 번호를 생성, 이벤트 등록
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.classList.add('page-link');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.dataset.page = i;

      pageLink.addEventListener('click', event => {
        event.preventDefault();
        currentPage = parseInt(event.target.dataset.page, 10);
        displayPosts(noticePosts, currentPage);
      });

      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      pageItem.appendChild(pageLink);

      pagination.appendChild(pageItem);
    }
  }

  displayPosts(noticePosts, currentPage);
  updatePagination(noticePosts);
});

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
