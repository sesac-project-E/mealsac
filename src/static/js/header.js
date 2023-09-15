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

function getLoginStatusFromCookie() {
  let loginStatus = getCookie('loginStatus');
  return loginStatus === 'loggedIn';
}

function getCookie(name) {
  let value = '; ' + document.cookie;
  let parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// 초기 로딩 시 버튼 상태 업데이트
isLoggedIn = getLoginStatusFromCookie();
updateButtonVisibility();

// 로그인 상태 변경 시
// 로그인 상태 변경 시
document.querySelector('.login').addEventListener('click', () => {
  isLoggedIn = true;
  document.cookie = 'loginStatus=loggedIn; path=/; max-age=3600'; // 1시간 동안 유지
  updateButtonVisibility();
});

document.querySelector('.logout').addEventListener('click', () => {
  isLoggedIn = false;
  document.cookie =
    'loginStatus=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
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

console.log(updateButtonVisibility());
