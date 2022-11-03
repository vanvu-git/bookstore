const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const thongtintaikhoanController = require('../controllers/thongtintaikhoan');

router.post('/', thongtintaikhoanController.create);
// router.get('/', thongtintaikhoanController.find);
// router.get('/:id', thongtintaikhoanController.findId);
router.put('/:id',  thongtintaikhoanController.update);
router.delete('/:id',  thongtintaikhoanController.delete);
module.exports = router;