const express = require('express');
const router = express.Router();

const commentCtrl = require("../controllers/comments");
const multer = require('../middleware/multer');



router.get("/", commentCtrl.getAllComments);
router.get("/:id", commentCtrl.getOneComment);
router.post("/", commentCtrl.createComment);
router.put("/", commentCtrl.updateComment);
router.delete("/:id", commentCtrl.deleteComment);





module.exports = router;