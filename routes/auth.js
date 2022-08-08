const express = require("express");
const router = express.Router();
const max = require("../middleware/rateLimit");

const authCtrl = require("../controllers/auth");


router.post('/signup', authCtrl.signup);
router.post('/login', max.limiter, authCtrl.login);

module.exports = router;