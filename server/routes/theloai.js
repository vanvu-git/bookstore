const express = require('express');
const router = express.Router();
const {verifyToken, isNhanVien} = require('../middleware/auth');
const theloaiController = require('../controllers/theloai');

router.post('/',verifyToken, isNhanVien, theloaiController.create);
router.get('/', theloaiController.find);
router.get('/:id', theloaiController.findId);
router.put('/:id',verifyToken, isNhanVien,  theloaiController.update);
router.delete('/:id',verifyToken, isNhanVien,  theloaiController.delete);
module.exports = router;