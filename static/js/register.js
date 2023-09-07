const doRegister = () => {
  const inputId = document.getElementById('inputId').value;
  const inputName = document.getElementById('inputName').value;
  const inputPw = document.getElementById('inputPw').value;
  const confirmPw = document.getElementById('confirmPw').value;
  const pwPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const pwMsg = document.querySelector('#pwMsg');
  const idMsg = document.querySelector('#idMsg');
  const nameMsg = document.querySelector('#nameMsg');
  if (inputId === '') {
    idMsg.textContent = '아이디를 입력해주세요';
  } else if (inputPw === '') {
    pwMsg.textContent = '비밀번호를 입력해주세요';
  } else if (inputName === '') {
    nameMsg.textContent = '닉네임을 입력해주세요';
  } else {
    if (!pwPattern.test(inputPw)) {
      pwMsg.textContent =
        '비밀번호는 8자 이상 영문 + 숫자를 혼합하여야 합니다.';
    } else if (inputPw !== confirmPw) {
      pwMsg.textContent = '비밀번호가 일치하지 않습니다.';
    } else {
      // db로 보내는 코드 필요
      alert('회원가입 성공!');
      document.location.href = '/login';
    }
  }
};
