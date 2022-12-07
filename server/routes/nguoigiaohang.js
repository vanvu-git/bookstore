const express = require('express');
const router = express.Router();
const {verifyToken ,isNhanVien} = require('../middleware/auth');
const nguoigiaohangController = require('../controllers/nguoigiaohang');

router.post('/',verifyToken, isNhanVien, nguoigiaohangController.create);
router.get('/:id',verifyToken,isNhanVien, nguoigiaohangController.findId);
router.get('/', nguoigiaohangController.find);
router.put('/lock/:id',verifyToken, isNhanVien,  nguoigiaohangController.lock);
router.put('/unlock/:id',verifyToken, isNhanVien,  nguoigiaohangController.unlock);
router.put('/changestatus/:id',verifyToken, isNhanVien,  nguoigiaohangController.changeStatus);
router.put('/:id',verifyToken, isNhanVien,  nguoigiaohangController.update);
router.delete('/:id',verifyToken, isNhanVien,  nguoigiaohangController.delete);
module.exports = router;