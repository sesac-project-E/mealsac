const express = require('express');

const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const fs = require('fs');
const { swaggerUi, specs } = require('./src/swagger');

dotenv.config();

const app = express();
const db = require('./src/models');
const PORT = process.env.PORT;
const indexRouter = require('./src/routes/index.js');

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
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1D
    },
  }),
);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/mypage', (req, res) => {
  res.render('mypage', { restaurant });
});

app.use('/', indexRouter);

app.get('*', (req, res) => {
  res.render('404');
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});

const restaurant = {
  restaurantName: '장수식당',
  restaurantStyle: '한식',
  restaurantPhone: '0226331870',
  restaurantAddress: '서울특별시 영등포구 문래동2가 2-0번지',
  restaurantImage: '../../static/img/food/jpeg',
  restaurantRate: '4.5',
  restaurantComment: '15',
};
