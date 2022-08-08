const express = require('express');
const router = express.Router();

const commentCtrl = require("../controllers/comments");
//const multer = require('../middleware/multer');
const auth = require('../middleware/auth');



//router.get("/", auth, commentCtrl.getAllComments);
router.get("/post/:id", auth, commentCtrl.getAllCommentsFromPost);
router.get("/:id", auth, commentCtrl.getOneComment);
router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);




module.exports = router;