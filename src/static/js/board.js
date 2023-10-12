const freeBoardBtn = document.querySelector('#freeBoard');
const noticeBoardBtn = document.querySelector('#noticeBoard');
const freeBoardList = document.querySelector('#freeBoardList');
const noticeBoardList = document.querySelector('#noticeBoardList');

const switchToFreeBoard = () => {
  freeBoardBtn.classList.add('clicked');
  noticeBoardBtn.classList.remove('clicked');
  freeBoardList.style.display = 'flex';
  noticeBoardList.style.display = 'none';
  fetchAndDisplayPosts(1, '.freeBoardTable', '#pagination-container-freeBoard');
};

const switchToNoticeBoard = () => {
  noticeBoardBtn.classList.add('clicked');
  freeBoardBtn.classList.remove('clicked');
  freeBoardList.style.display = 'none';
  noticeBoardList.style.display = 'flex';
  fetchAndDisplayPosts(
    2,
    '.noticeBoardTable',
    '#pagination-container-noticeBoard',
  );
};

freeBoardBtn.addEventListener('click', switchToFreeBoard);
noticeBoardBtn.addEventListener('click', switchToNoticeBoard);

async function fetchAndDisplayPosts(
  boardId,
  tableSelector,
  pageSelector,
  currentPage = 1,
) {
  const tableBody = document.querySelector(tableSelector);
  const pagination = document.querySelector(pageSelector);
  const postsPerPage = 10;

  let endpoint = `/api/board/?page=${currentPage}`;
  if (boardId === 2) {
    endpoint = `/api/board/notice?page=${currentPage}`;
  }

  try {
    const res = await axios.get(endpoint);
    const posts = res.data.rows;
    const totalPosts = res.data.count;

    if (!Array.isArray(posts)) {
      console.error('Unexpected response format.');
      return;
    }

    displayPosts(posts, currentPage, boardId, tableBody);
    updatePagination(
      totalPosts,
      posts,
      postsPerPage,
      boardId,
      pagination,
      tableBody,
      tableSelector, // 변수 추가
      pageSelector, // 변수 추가
    );
    document
      .querySelectorAll('.page-link')
      [currentPage - 1].classList.add('clicked');
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

function formatDate(rawDate) {
  let dateObj = new Date(rawDate);
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(dateObj.getDate()).padStart(2, '0')}`;
}

function displayPosts(posts, page, boardId, tableBody) {
  const postsPerPage = 10;
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const displayedPosts = posts;

  tableBody.innerHTML = '';
  displayedPosts.forEach((post, index) => {
    const formattedDate = formatDate(post.createdAt); // 변환된 날짜
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row" class="idx">${startIndex + index + 1}</th>
        <td class="title"><a href="/post/${post.post_id}">${post.title}</a></td>
        <td class="writer">${post.User.user_name}</td> 
        <td class="date">${formattedDate}</td>
    `;
    tableBody.appendChild(row);
  });
}

function updatePagination(
  totalPosts,
  posts,
  postsPerPage,
  boardId,
  pagination,
  tableBody,
  tableSelector, // 변수 추가
  pageSelector, // 변수 추가
) {
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
      const clickedPage = parseInt(event.target.dataset.page, 10);
      fetchAndDisplayPosts(boardId, tableSelector, pageSelector, clickedPage);
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

  if (loginStatus === 'loggedIn' && userInfo) {
    if (userInfo.isAdmin) {
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
