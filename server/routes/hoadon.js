const express = require("express");
const hoadonRouter = require('../controllers/hoadon');
const router = express.Router();
const verifyToken = require('../middleware/auth');

//api
router.post('/', hoadonRouter.create); // api tạo hóa đơn 
router.get('/', hoadonRouter.getAll); // lấy toàn bộ hóa đơn
router.get('/:id', hoadonRouter.getById); // lấy 1 hóa đơn theo id
router.get('/status/:status', hoadonRouter.getByTrangThai); // lấy danh sách hóa đơn theo trạng thái của hóa đơn
router.get('/findbydate/:startdate/:enddate', hoadonRouter.getByNgay); // lấy danh sách hóa đơn theo ngày - ngày
router.put('/:id/status/:status', hoadonRouter.updateTrangThai); // cập nhật trạng thái hóa đơn - dành cho admin
router.put('/:id/cancel', hoadonRouter.huyDon); // hủy hóa đơn - đanh cho khách
router.delete('/:id', hoadonRouter.delete); // xóa  hóa đơn

module.exports = router;
