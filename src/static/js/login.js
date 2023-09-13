const msg = document.querySelector('#loginMsg');
const form = document.forms['login'];

const doLogin = async () => {
  try {
    const res = await axios({
      url: '/api/user/login',
      method: 'POST',
      data: {
        user_id: form.inputId.value,
        password: form.inputPw.value,
      },
    });
    if (res.data.result === true) {
      console.log(res.data.result);
      alert(`${res.data.data.user_id}님, 로그인 성공!`);
      document.location.href = '/mypage';
    } else {
      console.log(res.data.result);
      loginMsg.textContent = `아이디 또는 비밀번호를 잘못 입력했습니다.`;
    }
  } catch (error) {
    console.log(error);
  }
};
