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
      document.cookie = 'loginStatus=loggedIn; path=/; max-age=86400';
      document.location.href = '/';
    } else if (res.data.result === 'kakao') {
      alert('카카오로 가입된 아이디입니다.');
    } else {
      loginMsg.textContent = `아이디 또는 비밀번호를 잘못 입력했습니다.`;
    }
  } catch (error) {
    console.log(error);
  }
};
