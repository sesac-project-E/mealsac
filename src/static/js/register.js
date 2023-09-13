const form = document.forms['register'];
const pwMsg = document.querySelector('#pwMsg');
const idMsg = document.querySelector('#idMsg');
const nameMsg = document.querySelector('#nameMsg');

const overlapId = async () => {
  try {
    const res = await axios({
      url: '/api/user/overlapid',
      method: 'POST',
      data: {
        user_id: form.inputId.value,
      },
    });

    if (res.data.result) {
      console.log('ok');
      idMsg.innerHTML = '<p style="color:green">사용 가능한 아이디입니다.</p>';
      form.checkedId.value = 'Y';
    } else {
      idMsg.textContent = '중복된 아이디입니다.';
      form.inputId.value = '';
    }
  } catch (error) {
    console.log(error);
  }
};

const overlapName = async () => {
  try {
    const res = await axios({
      url: '/api/user/overlapname',
      method: 'POST',
      data: {
        user_name: form.inputName.value,
      },
    });

    if (res.data.result) {
      nameMsg.innerHTML =
        '<p style="color:green">사용 가능한 닉네임입니다.</p>';
      form.checkedName.value = 'Y';
    } else {
      nameMsg.textContent = '중복된 닉네임입니다.';
      form.inputName.value = '';
    }
  } catch (error) {
    console.log(error);
  }
};

const doRegister = async () => {
  const inputPw = form.inputPw.value;
  const confirmPw = form.confirmPw.value;
  const pwPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!pwPattern.test(inputPw)) {
    pwMsg.textContent = '비밀번호는 8자 이상 영문 + 숫자를 혼합하여야 합니다.';
  } else if (inputPw !== confirmPw) {
    pwMsg.textContent = '비밀번호가 일치하지 않습니다.';
  } else if (form.checkedId.value !== 'Y' || form.checkedName.value !== 'Y') {
    alert('회원 정보를 다시 검토해주세요.');
    throw new Error('중복 확인 오류');
  } else {
    if (
      pwPattern.test(inputPw) &&
      form.checkedId.value === 'Y' &&
      form.checkedName.value === 'Y' &&
      inputPw === confirmPw
    ) {
      try {
        const res = await axios({
          url: '/api/user/register',
          method: 'POST',
          data: {
            user_id: form.inputId.value,
            user_name: form.inputName.value,
            password: form.inputPw.value,
          },
        });
        console.log(res.status);
        if (res.status === 200) {
          alert('회원가입 성공!');
          document.location.href = '/';
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
