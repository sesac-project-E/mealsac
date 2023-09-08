const inputId = document.getElementById('inputId').value;
const inputName = document.getElementById('inputName').value;
const inputPw = document.getElementById('inputPw').value;
const confirmPw = document.getElementById('confirmPw').value;
const pwPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const pwMsg = document.querySelector('#pwMsg');
const idMsg = document.querySelector('#idMsg');
const nameMsg = document.querySelector('#nameMsg');

const overlapId = async () => {
  const res = await axios({
    url: '/user/register',
    method: 'POST',
    data: {
      user_id: inputId,
    },
  });

  if (res.data.result) {
    idMsg.textContent = '사용 가능한 아이디입니다.';
  } else {
    idMsg.textContent = '중복된 아이디입니다.';
  }
};

const overlapPw = async () => {
  const res = await axios({
    url: '/user/register',
    method: 'POST',
    data: {
      user_name: inputName,
    },
  });

  if (res.data.result) {
    nameMsg.textContent = '사용 가능한 닉네임입니다.';
  } else {
    nameMsg.textContent = '중복된 닉네임입니다.';
  }
};

const doRegister = async () => {
  try {
    const res = await axios({
      url: '/user/register',
      method: 'POST',
      data: {
        user_id: inputId,
        password: inputPw,
        user_name: inputName,
      },
    });

    if (inputPw === confirmPw || !pwPattern.test(inputPw)) {
      pwMsg.textContent =
        '비밀번호는 8자 이상 영문 + 숫자를 혼합하여야 합니다.';
    } else {
      pwMsg.textContent = '비밀번호가 일치하지 않습니다.';
    }
  } catch (error) {
    console.log(error);
  }
};
