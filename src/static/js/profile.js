const form = document.forms['profile'];

form.userName.addEventListener('input', () => {
  form.checkedName.value = 'N';
});

const overlapName = async () => {
  try {
    const res = await axios({
      url: '/api/user/overlapname',
      method: 'POST',
      data: {
        user_name: form.userName.value,
      },
    });

    if (res.data.result) {
      nameMsg.innerHTML =
        '<p style="color:green">사용 가능한 닉네임입니다.</p>';
      form.checkedName.value = 'Y';
    } else {
      nameMsg.textContent = '중복된 닉네임입니다.';
      form.userName.value = '';
    }
  } catch (error) {
    console.log(error);
  }
};

const edit = async () => {
  const userPw = form.userPw.value;
  const confirmPw = form.confirmPw.value;
  const pwPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  if (!pwPattern.test(userPw)) {
    pwMsg.textContent = '비밀번호는 8자 이상 영문 + 숫자를 혼합하여야 합니다.';
  } else if (userPw !== confirmPw) {
    pwMsg.textContent = '비밀번호가 일치하지 않습니다.';
  } else if (form.checkedName.value === 'N') {
    alert('중복 확인을 해주세요!');
    throw new Error('중복 확인 오류');
  } else {
    if (pwPattern.test(userPw) && userPw === confirmPw) {
      try {
        const res = await axios({
          method: 'PATCH',
          url: '/api/user/patch',
          data: {
            id: Number(document.querySelector('#id').value),
            user_id: form.userId.value,
            user_name: form.userName.value,
            password: form.userPw.value,
          },
        });
        if (res.data.result) {
          alert('정보 수정이 완료되었습니다!');
          console.log(res.data);
          document.location.href = '/';
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};

const destroy = async () => {
  if (!confirm('회원탈퇴 하시겠습니까?')) return;

  axios({
    method: 'DELETE',
    url: '/api/user/destroy',
    data: {
      id: Number(document.querySelector('#id').value),
    },
  }).then(res => {
    if (res.data.result) {
      alert('회원탈퇴 완료되었습니다');
      document.location.href = '/';
    }
  });
};
