const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController.js');

router.get('/', controller.index);
router.get('/users', controller.getUsers);

router.get('/register', controller.getRegister);
router.post('/register', controller.postRegister);

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/profile', controller.getProfile);
router.delete('/destroy', controller.deleteUser);

module.exports = router;
