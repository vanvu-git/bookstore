const express = require('express');
const router = express.Router();
const {verifyToken, isNhanVien} = require('../middleware/auth');
const nhacungcapController = require('../controllers/nhacungcap');

router.post('/',verifyToken, isNhanVien, nhacungcapController.create);
router.get('/', verifyToken, isNhanVien, nhacungcapController.find);
router.get('/:id', verifyToken, isNhanVien, nhacungcapController.findId);
router.put('/:id', verifyToken, isNhanVien,  nhacungcapController.update);
router.delete('/:id', verifyToken, isNhanVien,  nhacungcapController.delete);
module.exports = router;