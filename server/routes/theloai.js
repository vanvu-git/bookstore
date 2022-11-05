const express = require('express');
const router = express.Router();
const {verifyToken, isNhanVien} = require('../middleware/auth');
const theloaiController = require('../controllers/theloai');

router.post('/', theloaiController.create);
router.get('/',verifyToken, isNhanVien, theloaiController.find);
router.get('/:id', theloaiController.findId);
router.put('/:id',  theloaiController.update);
router.delete('/:id',  theloaiController.delete);
module.exports = router;