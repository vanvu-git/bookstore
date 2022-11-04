const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const phieunhapController = require('../controllers/phieunhap');

router.post('/', phieunhapController.create);
// router.get('/', nhacungcapController.find);
// router.get('/:id', nhacungcapController.findId);
// router.put('/:id',  nhacungcapController.update);
// router.delete('/:id',  nhacungcapController.delete);
module.exports = router;