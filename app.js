const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const fs = require('fs');
dotenv.config();

const app = express();
const db = require('./src/models');
const PORT = process.env.PORT;
// const indexRouter = require('./src/routes');

const reviewDirectory = path.join(
  __dirname,
  'src',
  'static',
  'images',
  'reviewImage',
);
if (!fs.existsSync(reviewDirectory)) {
  fs.mkdirSync(reviewDirectory, { recursive: true });
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'src', 'static')));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 1000, // 1분
    },
  }),
);

// app.use('/', indexRouter);

const userRouter = require('./src/routes/user');
app.use('/', userRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
