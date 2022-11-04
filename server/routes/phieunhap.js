const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const phieunhapController = require('../controllers/phieunhap');

router.post('/',verifyToken, phieunhapController.create);
router.get('/', phieunhapController.find);
 router.get('/:id', phieunhapController.findId);
// router.put('/:id',  nhacungcapController.update);
// router.delete('/:id',  nhacungcapController.delete);
module.exports = router;