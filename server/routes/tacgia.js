
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const tacgiaController = require('../controllers/tacgia');

router.post('/', tacgiaController.create);
//router.get('/findName/:ten', tacgiaController.findName);
router.get('/', tacgiaController.find);
router.get('/:id', tacgiaController.findId);
router.put('/:id',  tacgiaController.update);
router.delete('/:id',  tacgiaController.delete);
module.exports = router;