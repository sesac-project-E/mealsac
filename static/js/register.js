function overlapId() {
  // db userId와 중복 확인
}

function doRegister() {
  const inputPw = document.getElementById('inputPw').value;
  const confirmPw = document.getElementById('confirmPw').value;
  const pwPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const pwMsg = document.querySelector('#pwMsg');
  if (!pwPattern.test(inputPw)) {
    pwMsg.textContent = '비밀번호는 8자 이상 영문 + 숫자를 혼합하여야 합니다.';
  } else if (inputPw !== confirmPw) {
    pwMsg.textContent = '비밀번호가 일치하지 않습니다.';
  } else {
    // db로 보내는 코드 필요
    alert('회원가입 성공!');
    document.location.href = '/login';
  }
}

function overlapName() {
  // db userName와 중복 확인
}
