const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/auth');
const nhaxuatbanController = require('../controllers/nhaxuatban');

router.post('/', nhaxuatbanController.create);
router.get('/', nhaxuatbanController.find);
router.get('/:id', nhaxuatbanController.findId);
router.put('/:id',  nhaxuatbanController.update);
router.delete('/:id',  nhaxuatbanController.delete);
module.exports = router;