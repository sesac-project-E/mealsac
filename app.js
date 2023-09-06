const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();

const app = express();
const db = require('./models');
const PORT = process.env.PORT;
// const PORT = 8000;

app.set('view engine', 'ejs');
app.set('/views', 'view');
app.use(express.urlencoded({ extended: true }));
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

const userRouter = require('./routes/user');
app.use('/', userRouter);

app.get('*', (req, res) => {
  res.render('404');
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
