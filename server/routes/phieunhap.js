const express = require('express');
const router = express.Router();
const {verifyToken, isNhanVien} = require('../middleware/auth');
const phieunhapController = require('../controllers/phieunhap');

router.post('/',verifyToken,isNhanVien, phieunhapController.create);
router.get('/findByIdNhanVien/:id', phieunhapController.findByIdNhanVien);
router.get('/:id', phieunhapController.findId);
router.get('/', phieunhapController.find);
router.put('/xuli/:id',verifyToken,isNhanVien,  phieunhapController.xuli);
router.put('/:id',isNhanVien,  phieunhapController.update);
router.delete('/:id',verifyToken,isNhanVien , phieunhapController.delete);
module.exports = router;