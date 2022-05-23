const express = require('express');
const router = express.Router();

const postCtrl = require("../controllers/posts");
//const multer = require('../middleware/multer');
const auth = require('../middleware/auth');



router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);





module.exports = router;