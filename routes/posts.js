const express = require('express');
const router = express.Router();

const postCtrl = require("../controllers/posts");



router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.post("/", postCtrl.createPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);





module.exports = router;