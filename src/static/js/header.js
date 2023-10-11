let isLoggedIn = false;

// DOM 참조 초기화
const loginBtn = document.querySelector('.login');
const registerBtn = document.querySelector('.register');
const logoutBtn = document.querySelector('.logout');
const mypageBtn = document.querySelector('.mypage');
const hamburgerMenu = document.querySelector('.hamburger');
const mobileLoginBtn = document.querySelector('.mobile-login');
const loggedOutDiv = document.querySelector('.logged-out');
const loggedInDiv = document.querySelector('.logged-in');
const dropdown = document.querySelector('.dropdown-content');

const updateButtonVisibility = () => {
  const isMobileOrFolded = window.innerWidth <= 480;

  if (isLoggedIn) {
    if (isMobileOrFolded) {
      hamburgerMenu.style.display = 'inline-block';
      loginBtn.style.display = 'none';
      registerBtn.style.display = 'none';
      logoutBtn.style.display = 'none';
      mypageBtn.style.display = 'none';
    } else {
      logoutBtn.style.display = 'inline-block';
      mypageBtn.style.display = 'inline-block';
      hamburgerMenu.style.display = 'none';
      loginBtn.style.display = 'none';
      registerBtn.style.display = 'none';
    }

    loggedOutDiv.style.display = 'none';
    loggedInDiv.style.display = 'block';
  } else {
    if (isMobileOrFolded) {
      hamburgerMenu.style.display = 'none';
      loginBtn.style.display = 'none';
      registerBtn.style.display = 'none';
      logoutBtn.style.display = 'none';
      mypageBtn.style.display = 'none';
    } else {
      loginBtn.style.display = 'inline-block';
      registerBtn.style.display = 'inline-block';
      hamburgerMenu.style.display = 'none';
      logoutBtn.style.display = 'none';
      mypageBtn.style.display = 'none';
    }

    loggedOutDiv.style.display = 'block';
    loggedInDiv.style.display = 'none';
  }

  dropdown.style.display = 'none'; // 드롭다운 메뉴 초기화
};

const toggleLoginStatus = status => {
  isLoggedIn = status;
  updateButtonVisibility();
};

function getCookie(name) {
  let value = '; ' + document.cookie;
  let parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
}

isLoggedIn = getCookie('loginStatus');
updateButtonVisibility();

function logout() {
  if (document.cookie.indexOf('loginStatus') === -1) {
    alert('이미 로그아웃 상태입니다.');
    document.cookie =
      'loginStatus=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    toggleLoginStatus(false);
    window.location.href = '/';
    return;
  }

  axios
    .post('/api/user/logout')
    .then(() => {
      document.cookie =
        'loginStatus=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      toggleLoginStatus(false);
      window.location.href = '/';
    })
    .catch(error => {
      console.error('Logout Error:', error);
      if (error.response && error.response.status === 400) {
        alert(
          '이미 로그아웃 상태이거나 세션이 만료되어 로그아웃에 실패했습니다.',
        );
        document.cookie =
          'loginStatus=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        toggleLoginStatus(false);
        window.location.href = '/';
      } else {
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
    });
}

mobileLoginBtn.addEventListener('click', () => {
  document.cookie = 'loginStatus=loggedIn; path=/; max-age=86400';
  toggleLoginStatus(true);
});

hamburgerMenu.addEventListener('click', () => {
  dropdown.style.display =
    dropdown.style.display === 'block' ? 'none' : 'block';
});

const mobileLogout = document.querySelector('.mobileLogout');

window.addEventListener('resize', updateButtonVisibility); // 반응형 사이즈 변경에 대응
