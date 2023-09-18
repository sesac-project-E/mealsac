const { Post } = require('../models');

exports.getPost = (req, res) => {
  Post.findAll().then(response => {
    res.send(response);
  });
};
