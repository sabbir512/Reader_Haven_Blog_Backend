const express = require("express");
const handlePost = require("../dbController/handlePost");
const router = express.Router();

router.get("/", handlePost.getPosts);
router.get("/:id", handlePost.getSinglePosts);
router.post("/", handlePost.addPosts);
router.delete("/:id", handlePost.deletePosts);
router.put("/:id", handlePost.updatePosts);

module.exports = router;
