const express = require('express');
const router = express.Router();

const postCtrl = require("../controllers/posts");
const multer = require('../middleware/multer');
//const auth = require('../middleware/auth');



router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.post("/", postCtrl.createPost);
router.put("/", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);





module.exports = router;