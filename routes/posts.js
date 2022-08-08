const express = require('express');
const router = express.Router();

const postCtrl = require("../controllers/posts");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);





module.exports = router;