const express = require('express');
const router = express.Router();
const {verifyToken, isAdmin} = require('../middleware/auth');
const userController = require('../controllers/user');

router.post('/',verifyToken,isAdmin, userController.create);
router.get('/find5newest',verifyToken,isAdmin, userController.find5newest);
router.get('/:id',verifyToken, userController.findById);
router.get('/',verifyToken, isAdmin, userController.find);
router.put('/unlock/:id',verifyToken, isAdmin, userController.unlock);
router.put('/lock/:id',verifyToken, isAdmin, userController.lock);
router.delete('/:id',verifyToken, isAdmin,  userController.delete);
module.exports = router;