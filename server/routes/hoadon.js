const express = require("express");
const hoadonRouter = require('../controllers/hoadon');
const router = express.Router();
const {verifyToken , isNhanVien} = require('../middleware/auth');

//api
router.post('/', hoadonRouter.create); // api tạo hóa đơn  (chưa thay đổi sl sách) (chưa có má nhan viên)
router.get('/', hoadonRouter.getAll); // lấy toàn bộ hóa đơn
router.get('/:id', hoadonRouter.getById); // lấy 1 hóa đơn theo id
router.get('/status/:status', hoadonRouter.getByTrangThai); // lấy danh sách hóa đơn theo trạng thái của hóa đơn
router.get('/findbydate/:startdate/:enddate', hoadonRouter.getByNgay); // lấy danh sách hóa đơn theo ngày - ngày (tham số ngày dạng timestamp)
router.get('/findbycustomer/:id', hoadonRouter.getByKhach); // lấy danh sách hóa đơn theo khách
router.get('/findbystaff/:id', hoadonRouter.getByNhanVien); // lấy danh sách hóa đơn theo khách
router.put('/:id/status/:status/staff/:manhanvien', hoadonRouter.updateTrangThai); // cập nhật trạng thái hóa đơn (thay đổi sl sách khi từ xử lý sang đã xác nhân) (thêm mã nhân viên) - dành cho admin
router.put('/:id/cancel', hoadonRouter.huyDon); // hủy hóa đơn - đanh cho khách
router.delete('/:id', hoadonRouter.delete); // xóa  hóa đơn

module.exports = router;
