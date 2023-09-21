const freeBoardBtn = document.querySelector('#freeBoard');
const noticeBoardBtn = document.querySelector('#noticeBoard');
const freeBoardList = document.querySelector('#freeBoardList');
const noticeBoardList = document.querySelector('#noticeBoardList');

const switchToFreeBoard = () => {
  freeBoardBtn.classList.add('clicked');
  noticeBoardBtn.classList.remove('clicked');
  freeBoardList.style.display = 'flex';
  noticeBoardList.style.display = 'none';
  fetchAndDisplayPosts(1, '.freeBoardTable', '#freeBoardPage');
};

const switchToNoticeBoard = () => {
  noticeBoardBtn.classList.add('clicked');
  freeBoardBtn.classList.remove('clicked');
  freeBoardList.style.display = 'none';
  noticeBoardList.style.display = 'flex';
  fetchAndDisplayPosts(2, '.noticeBoardTable', '#noticeBoardPage');
};

freeBoardBtn.addEventListener('click', switchToFreeBoard);
noticeBoardBtn.addEventListener('click', switchToNoticeBoard);

async function fetchAndDisplayPosts(boardId, tableSelector, pageSelector) {
  const tableBody = document.querySelector(tableSelector);
  const pagination = document.querySelector(pageSelector);
  const postsPerPage = 10;
  let currentPage = 1;

  let endpoint = `/api/board/?page=${currentPage}`;
  if (boardId === 2) {
    endpoint = `/api/board/notice?page=${currentPage}`;
  }

  try {
    const res = await axios.get(endpoint);
    const posts = res.data.rows;

    if (!Array.isArray(posts)) {
      console.error('Unexpected response format.');
      return;
    }

    displayPosts(posts, currentPage, boardId, tableBody);
    updatePagination(posts, postsPerPage, boardId, pagination);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

function displayPosts(posts, page, boardId, tableBody) {
  const postsPerPage = 10;
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const displayedPosts = posts.slice(startIndex, endIndex);

  tableBody.innerHTML = '';
  displayedPosts.forEach((post, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row" class="idx">${startIndex + index + 1}</th>
        <td class="title"><a href="/post/${post.post_id}">${post.title}</a></td>
        <td class="writer">${post.board_name}</td>
        <td class="date">${post.updated_at}</td>
    `;
    tableBody.appendChild(row);
  });
}

function updatePagination(posts, postsPerPage, boardId, pagination) {
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.classList.add('page-link');
    pageLink.href = '#';
    pageLink.textContent = i;
    pageLink.dataset.page = i;

    pageLink.addEventListener('click', event => {
      event.preventDefault();
      currentPage = parseInt(event.target.dataset.page, 10);
      displayPosts(posts, currentPage, boardId, tableBody);
    });

    const pageItem = document.createElement('li');
    pageItem.classList.add('page-item');
    pageItem.appendChild(pageLink);
    pagination.appendChild(pageItem);
  }
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(name + '=') === 0) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

window.addEventListener('load', () => {
  switchToFreeBoard();
  const loginStatus = getCookie('loginStatus');
  const userId = 'admin'; // 임시 설정

  if (loginStatus === 'loggedIn') {
    if (userId === 'admin') {
      document.querySelector('#freeWrite').style.display = 'block';
      document.querySelector('#noticeWrite').style.display = 'block';
    } else {
      document.querySelector('#freeWrite').style.display = 'block';
      document.querySelector('#noticeWrite').style.display = 'none';
    }
  } else {
    document.querySelector('#freeWrite').style.display = 'none';
    document.querySelector('#noticeWrite').style.display = 'none';
  }
});
