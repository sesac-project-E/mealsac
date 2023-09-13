let isLoggedIn = false;

const updateButtonVisibility = () => {
  if (isLoggedIn) {
    // 로그인 후 버튼 표시
    document.querySelector('.logout').style.display = 'inline-block';
    document.querySelector('.mypage').style.display = 'inline-block';

    // 로그인 전 버튼 숨기기
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.register').style.display = 'none';
  } else {
    // 로그인 전 버튼 표시
    document.querySelector('.login').style.display = 'inline-block';
    document.querySelector('.register').style.display = 'inline-block';

    // 로그인 후 버튼 숨기기
    document.querySelector('.logout').style.display = 'none';
    document.querySelector('.mypage').style.display = 'none';
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
