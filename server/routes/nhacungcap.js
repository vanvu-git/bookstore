const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const nhacungcapController = require('../controllers/nhacungcap');

router.post('/', nhacungcapController.create);
router.get('/', nhacungcapController.find);
router.get('/:id', nhacungcapController.findId);
router.put('/:id',  nhacungcapController.update);
router.delete('/:id',  nhacungcapController.delete);
module.exports = router;