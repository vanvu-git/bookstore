const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/auth');
const sachController = require('../controllers/sach');

router.post('/', sachController.create);
router.get('/findByName', sachController.findByName);
router.get('/findByIdtheloai', sachController.findByIdtheloai);
router.get('/', sachController.find);
router.put('/:id',sachController.update);
router.delete('/:id',sachController.delete);
module.exports = router;