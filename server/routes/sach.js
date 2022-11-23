const express = require('express');
const router = express.Router();
const {verifyToken, isNhanVien} = require('../middleware/auth');
const sachController = require('../controllers/sach');

router.post('/',verifyToken, isNhanVien, sachController.create);
router.get('/findByName', sachController.findByName);
router.get('/findByIdtheloai', sachController.findByIdtheloai);
router.get('/:id', sachController.findById);
router.get('/', sachController.find);
router.get('/findlastest/4', sachController.find4lastest);
router.put('/:id',verifyToken, isNhanVien,sachController.update);
router.delete('/:id',verifyToken, isNhanVien,sachController.delete);
module.exports = router;