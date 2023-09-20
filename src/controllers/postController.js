const { User, Post } = require('../models');

exports.getPosts = (req, res) => {
  Post.findAll().then(response => {
    res.send(response);
  });
};

// const getPosts = async (req, res) => {
//   const result = await Post.findAll();

//   const formattedData = [];
//   for (const entry of result) {
//     const formattedEntry = {
//       post_id: entry.dataValues.post_id,
//       title: entry.dataValues.title,
//       content: entry.dataValues.content,
//       createdAt: entry.dataValues.createdAt,
//       updatedAt: entry.dataValues.updatedAt,
//     };
//     formattedData.push(formattedEntry);
//   }

// console.log(formattedData);
// res.render('board', {
//   data: formattedData,
// });
// };

exports.getPost = async (req, res) => {
  const { post_id } = req.params;
  try {
    const { post_id, user_id } = req.body;
    const userid = await Post.findOne({
      where: { user_id },
    });
    const postid = await Post.findOne({
      where: { post_id },
    });

    if (post_id > 0) {
      const response = await Post.findAll({
        where: { postid: postid },
        attributes: ['postid'],
        include: [
          {
            model: Post,
            attributes: ['post_id', 'user_id', 'board_id', 'title', 'content'],
          },
        ],
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while render post.',
    });
  }
};

exports.postCreatePost = async (req, res) => {

  const { id } =
    req.session && req.session.userInfo ? req.session.userInfo : -1;

  console.log(req.session)
  console.log(req.session.userInfo)
  const { title, content, board_id } = req.body;

  const result = await Post.create({
    title,
    content,
    user_id : id,
    board_id,
  });


  console.log(req.session);
  console.log(req.session.userInfo);

  if (req.session.userInfo) {
    const { title, content, board_id } = req.body;

    const result = await Post.create({
      title,
      content,
      user_id: id,
      board_id,
    });
    res.json({ result: true, message: '전송 완료!' });
    // res.send({
    //   post_id: result.dataValues.post_id,
    //   user_id: result.dataValues.user_id,
    //   board_id: result.dataValues.board_id,
    //   title: result.dataValues.title,
    //   content: result.dataValues.content,
    //   // createdAt: result.dataValues.createdAt,
    //   // updatedAt: result.dataValues.updatedAt,
    // });
  } else {
    res.json({ result: false, message: '현재 로그인되어있지 않습니다.' });
  }
};

// exports.getPost = async (req, res) => {
//   const { post_id } = req.params;
//   console.log(req.body);
//   try {
//     const { post_id, user_id, title, content, created_at, updated_at, views } =
//       req.body;

//     res.send({ what: req.params });
//   } catch (err) {
//     //   res.send({  });

//     res.status(500).json({
//       status: 'error',
//       message: 'An error occurred while register.',
//     });
//   }
// }

// exports.postPost = async (req, res) => {
//   const exist = await Post.findOne({
//     where: { post_id: post_id },
//   });
//   if (exist) {
//     res.status(400).send('이미 생성되었습니다.');
//   } else {
//     Post.create({
//       post_id: post_id,
//     });
//   }
// };
//   const { id } =
//     req.session && req.session.userInfo ? req.session.userInfo : -1;
//   console.log('****************', req.session);

//   if (1) {
//     const response = await User.findAll({
//       where: { post_id: id },
//       attributes: ['post_id'],
//       include: [
//         {
//           model: Post,
//           attributes: [
//             'post_id',
//             'user_id',
//             'board_id',
//             'title',
//             'content',
//             'created_at',
//             'updated_at',
//             'views',
//           ],
//         },
//       ],
//     });
//     //response 키 값에 userName넣어서 전송
//     // response['userName'] = user_name;
//     console.log(response);
//     res.send(response);
//   } else {
//     res.send('session에 저장된 정보가 없습니다.').status(400);
//   }
//   res.send('tttt');
// };

//   try {
//     // Step1. 아이디를 찾아서 사용자 존재 유무 체크
//     const user = await User.findOne({
//       where: { user_id },
//     });

//     // Step2. 입력된 비밀번호 암호화하여 기존 데이터와 비교
//     if (user) {
//       res.json({ result: true });
//     } else {
//       res.json({ result: false });
//     }
//   } catch (err) {
//     console.error('에러 정보: ', err);
//     res.status(500).json({
//       status: 'error',
//       message: 'An error occurred while login.',
//     });
//   }
