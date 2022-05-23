const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require('../middleware/auth');



// Creation des routes post user
//router.get('/token/:token', auth, userCtrl.getUserFromToken);
router.get('/:id', auth, userCtrl.getUserProfile);
router.delete('/:id', auth,  userCtrl.deleteUser);
router.put('/:id', auth, userCtrl.updateUser);


module.exports = router;