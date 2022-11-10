const express = require('express');
const router = express.Router();
const {verifyToken, isNhanVien, isAdmin} = require('../middleware/auth');
const userController = require('../controllers/user');

router.post('/',verifyToken,isAdmin, userController.create);
router.get('/:id',verifyToken, userController.findById);
router.get('/',verifyToken, isAdmin, userController.find);
router.put('/unlock/:id',verifyToken, isAdmin, userController.unlock);
router.put('/lock/:id',verifyToken, isAdmin, userController.lock);
router.put('/:id',verifyToken, userController.update);

router.delete('/:id',verifyToken, isAdmin,  userController.delete);
module.exports = router;