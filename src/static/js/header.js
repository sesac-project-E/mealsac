let isLoggedIn = false;

const updateButtonVisibility = () => {
  const loginBtn = document.querySelector('.login');
  const registerBtn = document.querySelector('.register');
  const logoutBtn = document.querySelector('.logout');
  const mypageBtn = document.querySelector('.mypage');
  const hamburgerMenu = document.querySelector('.hamburger');

  if (isLoggedIn) {
    // 로그인 후 버튼 및 아이콘 표시
    logoutBtn.style.display = 'inline-block';
    mypageBtn.style.display = 'inline-block';
    hamburgerMenu.style.display = 'inline-block'; // 햄버거 메뉴 보이기

    // 로그인 전 버튼 숨기기
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
  } else {
    // 로그인 전 버튼 및 아이콘 표시
    loginBtn.style.display = 'inline-block';
    registerBtn.style.display = 'inline-block';
    hamburgerMenu.style.display = 'none'; // 햄버거 메뉴 숨기기

    // 로그인 후 버튼 숨기기
    logoutBtn.style.display = 'none';
    mypageBtn.style.display = 'none';
  }
};

// 초기 로딩 시 버튼 상태 업데이트
updateButtonVisibility();

// 로그인 상태 변경 시
document.querySelector('.login').addEventListener('click', () => {
  isLoggedIn = true;
  updateButtonVisibility();
});

document.querySelector('.logout').addEventListener('click', () => {
  isLoggedIn = false;
  updateButtonVisibility();
});

document.querySelector('.hamburger').addEventListener('click', () => {
  const dropdown = document.querySelector('.dropdown-content');
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
  }
});
