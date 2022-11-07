
const express = require('express');
const router = express.Router();
const {verifyToken ,isNhanVien} = require('../middleware/auth');
const tacgiaController = require('../controllers/tacgia');

router.post('/',verifyToken, tacgiaController.create);
router.get('/findByName', tacgiaController.findByName);
router.get('/', tacgiaController.find);
router.get('/:id', tacgiaController.findId);
router.put('/:id',  tacgiaController.update);
router.delete('/:id',  tacgiaController.delete);
module.exports = router;