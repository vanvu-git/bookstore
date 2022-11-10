const express = require('express');
const router = express.Router();
const {verifyToken, isNhanVien, isAdmin} = require('../middleware/auth');
const userController = require('../controllers/user');

router.post('/',verifyToken,isAdmin, userController.create);
router.get('/',verifyToken, isAdmin, userController.find);
 router.get('/:id',verifyToken, userController.findById);
router.put('/:id',verifyToken, isAdmin, userController.update);
router.delete('/:id',verifyToken, isAdmin,  userController.delete);
module.exports = router;