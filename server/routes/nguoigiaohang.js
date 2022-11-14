const express = require('express');
const router = express.Router();
const {verifyToken ,isNhanVien} = require('../middleware/auth');
const nguoigiaohangController = require('../controllers/nguoigiaohang');

router.post('/',verifyToken, isNhanVien, nguoigiaohangController.create);
// router.get('/findByName', nguoigiaohangController.findByName);
// router.get('/:id', nguoigiaohangController.findId);
 router.get('/', nguoigiaohangController.find);
// router.put('/:id',verifyToken, isNhanVien,  nguoigiaohangController.update);
// router.delete('/:id',verifyToken, isNhanVien,  nguoigiaohangController.delete);
module.exports = router;