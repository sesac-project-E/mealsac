const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();

const app = express();
const db = require('./models');
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('/views', 'view');
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register/index');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
