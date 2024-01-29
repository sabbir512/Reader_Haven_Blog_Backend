const mysql = require("../db");
const jwt = require("jsonwebtoken");
//FOR POSTS
exports.getPosts = (req, res) => {
  const queryPost = req.query.category
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  mysql.query(queryPost, [req.query.category], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).json(result);
  });
};

//FOR SINGLE POST
exports.getSinglePosts = (req, res) => {
  const getPostQuery = `
  SELECT u.name, p.title, p.description, p.img, u.img AS userImg, p.category, p.date
  FROM users u
  JOIN posts p ON u.id = p.user_id
  WHERE p.id = ?
`;

  mysql.query(getPostQuery, [req.params.id], (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json(result[0]);
  });
};

//FOR ADD OR WRITE POST
exports.addPosts = (req, res) => {
  res.json("This is api path from handler");
};

//FOR DELETE POST

exports.deletePosts = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You cannot delete this post");

  jwt.verify(token, "defaultSecretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid");

    const postId = req.params.id;

    const queryDelete = `DELETE FROM posts WHERE id = ? AND user_id = ?`;
    mysql.query(queryDelete, [postId, userInfo.id], (err, result) => {
      if (err) return res.status(500).json("You can delete only your posts");

      return res.json("Post has been deleted");
    });
  });
};

//FOR UPDATE POST
exports.updatePosts = (req, res) => {
  res.json("This is api path from handler");
};
