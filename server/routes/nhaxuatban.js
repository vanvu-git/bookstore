const express = require('express');
const router = express.Router();
const {verifyToken, isNhanVien} = require('../middleware/auth');
const nhaxuatbanController = require('../controllers/nhaxuatban');

router.post('/',verifyToken, isNhanVien, nhaxuatbanController.create);
router.get('/', nhaxuatbanController.find);
router.get('/:id', nhaxuatbanController.findId);
router.put('/:id',verifyToken, isNhanVien,  nhaxuatbanController.update);
router.delete('/:id',verifyToken, isNhanVien,  nhaxuatbanController.delete);
module.exports = router;