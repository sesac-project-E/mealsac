const express = require('express');

const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const fs = require('fs');
const { swaggerUi, specs } = require('./src/swagger');
const indexRouter = require('./src/routes/index.js');

dotenv.config();

const app = express();
const db = require('./src/models');
const { title } = require('process');
const PORT = process.env.PORT;

const reviewDirectory = path.join(
  __dirname,
  'src',
  'static',
  'img',
  'reviewImage',
);
if (!fs.existsSync(reviewDirectory)) {
  fs.mkdirSync(reviewDirectory, { recursive: true });
}

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'src', 'static')));
app.use(express.json());
app.use('/static', express.static(__dirname + '/static'));

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 1D
    },
  }),
);

app.get('/board', (req, res) => {
  const freePosts = [
    {
      title: '제목1',
      board_name: '닉네임1',
      updated_at: '2023.09.27 09:36',
    },
    {
      title: '제목2',
      board_name: '닉네임2',
      updated_at: '2023.09.28 10:45',
    },
    {
      title: '제목3',
      board_name: '닉네임3',
      updated_at: '2023.09.29 11:15',
    },
    {
      title: '제목4',
      board_name: '닉네임4',
      updated_at: '2023.09.30 12:30',
    },
    {
      title: '제목5',
      board_name: '닉네임5',
      updated_at: '2023.10.01 14:20',
    },
    {
      title: '제목6',
      board_name: '닉네임6',
      updated_at: '2023.10.02 16:10',
    },
    {
      title: '제목7',
      board_name: '닉네임7',
      updated_at: '2023.10.03 17:45',
    },
    {
      title: '제목8',
      board_name: '닉네임8',
      updated_at: '2023.10.04 18:25',
    },
    {
      title: '제목9',
      board_name: '닉네임9',
      updated_at: '2023.10.05 20:05',
    },
    {
      title: '제목10',
      board_name: '닉네임10',
      updated_at: '2023.10.06 22:30',
    },
    {
      title: '제목11',
      board_name: '닉네임11',
      updated_at: '2023.10.07 09:10',
    },
    {
      title: '제목12',
      board_name: '닉네임12',
      updated_at: '2023.10.08 14:55',
    },
  ];

  const noticePosts = [
    {
      title: '제목1',
      board_name: 'admin',
      updated_at: '2023.09.27 09:36',
    },
    {
      title: '제목2',
      board_name: 'admin',
      updated_at: '2023.09.28 10:45',
    },
    {
      title: '제목3',
      board_name: 'admin',
      updated_at: '2023.09.29 11:15',
    },
  ];
  res.render('board', { freePosts, noticePosts });
});
app.get('/board', (req, res) => {
  res.render('board', { noticePosts });
});

app.get('/boardWrite', (req, res) => {
  res.render('boardWrite');
});

app.get('/post', (req, res) => {
  res.render('boardPost');
});

app.get('/boardModify', (req, res) => {
  res.render('boardModify');
});

app.use('/', indexRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
