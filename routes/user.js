const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');



router.get('/:id', auth, userCtrl.getUserProfile);
router.delete('/:id', auth,  userCtrl.deleteUser);
router.put('/:id', auth, multer, userCtrl.updateUser);


module.exports = router;