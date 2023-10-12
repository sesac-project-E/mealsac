const { User } = require('../models');
const { bcryptPassword, compareFunc } = require('../utils/encrypt');

exports.index = (req, res) => {
  res.render('index', { data: req.session.userInfo });
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.getUsers = async (req, res) => {
  if (req.session.userInfo) {
    const result = await User.findAll();
    res.render('users', {
      user_name: req.session.userInfo.user_name,
      users: result,
    });
  } else {
    res.redirect('/login');
  }
};

exports.getProfile = async (req, res) => {
  const result = await User.findOne({
    where: { id: req.session.userInfo.id }, // 세션으로 아이디 꺼내와서 한 명 조회
  });
  res.render('profile', { data: result });
};

exports.postOverLapId = async (req, res) => {
  try {
    // Step1. 아이디 존재 유무 체크
    const { user_id } = req.body;
    const user = await User.findOne({
      where: { user_id },
    });

    // Step2. 기존 데이터와 아이디 비교
    if (user) {
      res.json({ result: false }); //중복될 경우
    } else {
      res.json({ result: true }); //신규 아이디 일 경우
    }
  } catch (err) {
    console.error('에러 정보: ', err);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while duplicateTest.',
    });
  }
};

exports.postOverLapName = async (req, res) => {
  try {
    // Step1. 닉네임 DB 존재 유무 체크
    const { user_name } = req.body;
    const user = await User.findOne({
      where: { user_name },
    });

    // Step2. 기존 데이터와 닉네임 비교
    if (user) {
      res.json({ result: false }); //중복될 경우
    } else {
      res.json({ result: true }); //신규 닉네임일 경우
    }
  } catch (err) {
    console.error('에러 정보: ', err);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while duplicateTest.',
    });
  }
};

exports.postRegister = async (req, res) => {
  try {
    const { password, user_name, user_id } = req.body;
    // Step1. 아이디를 찾아서 사용자 존재 유무 체크
    const userid = await User.findOne({
      where: { user_id },
    });
    const username = await User.findOne({
      where: { user_name },
    });
    if (userid) {
      res.json({ result: false, message: '아이디 중복체크를 해주세요' });
    } else if (username) {
      res.json({ result: false, message: '닉네임 중복체크를 해주세요' });
    } else {
      const hash = await bcryptPassword(password); // 비밀번호 암호화하여 저장

      await User.create({ user_id, user_name, password: hash });
      res.json({ result: true });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while register.',
    });
  }
};

exports.postLogin = async (req, res) => {
  try {
    // Step1. 아이디를 찾아서 사용자 존재 유무 체크
    const { user_id, password } = req.body;
    const user = await User.findOne({
      where: { user_id },
    });

    // Step2. 입력된 비밀번호 암호화하여 기존 데이터와 비교
    if (user) {
      if (user.password === '') {
        res.json({ result: 'kakao' });
        return;
      }
      const result = await compareFunc(password, user.password); // true or false
      if (result) {
        req.session.userInfo = {
          user_name: user.user_name,
          id: user.id,
          isAdmin: user.is_admin,
        }; // 세션 생성
        res.json({ result: true, data: user });
        console.log(req.session.userInfo);
      } else {
        res.json({ result: false, message: '비밀번호가 틀렸습니다.' });
      }
    } else {
      res.json({ result: false, message: '존재하는 사용자가 없습니다' });
    }
  } catch (err) {
    console.error('에러 정보: ', err);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while login.',
    });
  }
};

exports.postLogout = (req, res) => {
  try {
    if (req.session.userInfo) {
      req.session.destroy(err => {
        if (err) {
          console.error('세션 삭제 도중 에러가 발생했습니다.');
          return res.status(500).json({
            status: 'error',
            message: '로그아웃 중 문제가 발생했습니다.',
          });
        }

        res.json({
          status: 'success',
          message: '로그아웃 되었습니다.',
        });
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: '로그인 상태가 아닙니다.',
      });
    }
  } catch (err) {
    console.error('에러 정보: ', err);
    res.status(500).json({
      status: 'error',
      message: '로그아웃 도중 문제가 발생했습니다.',
    });
  }
};

exports.patchProfile = async (req, res) => {
  try {
    const { user_name, password, id } = req.body;
    const hash = await bcryptPassword(password);

    await User.update({ user_name, password: hash }, { where: { id } });

    res.json({ result: true });
  } catch (err) {
    console.error('에러 정보: ', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while change profile.',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await User.destroy({
      where: { id },
    });
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.send('Internal Server Error');
      }
      res.json({ result: true });
    }); // 세션 삭제
  } catch (err) {
    console.error('에러 정보: ', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while delete user.',
    });
  }
};
