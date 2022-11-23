const express = require("express");
const hoadonRouter = require('../controllers/hoadon');
const router = express.Router();
const {verifyToken , isNhanVien, isKhachhang, isAdmin} = require('../middleware/auth');

//api
router.post('/',verifyToken, isKhachhang, hoadonRouter.create); // api tạo hóa đơn  (chưa thay đổi sl sách) (chưa có má nhan viên)
router.get('/',verifyToken, isNhanVien, hoadonRouter.getAll); // lấy toàn bộ hóa đơn
router.get('/:id',verifyToken, hoadonRouter.getById); // lấy 1 hóa đơn theo id
router.get('/status/:status',verifyToken, hoadonRouter.getByTrangThai); // lấy danh sách hóa đơn theo trạng thái của hóa đơn
router.get('/findbydate/:startdate/:enddate',verifyToken, hoadonRouter.getByNgay); // lấy danh sách hóa đơn theo ngày - ngày (tham số ngày dạng timestamp)
router.get('/findbycustomer/:id',verifyToken, hoadonRouter.getByKhach); // lấy danh sách hóa đơn theo khách
router.get('/findbystaff/:id',verifyToken, hoadonRouter.getByNhanVien); // lấy danh sách hóa đơn theo khách
router.get('/amountbymonth/:month',verifyToken, isAdmin, hoadonRouter.getAmountByMonth);
router.get('/latest/createdate',verifyToken, isNhanVien, hoadonRouter.getLatest5Invoice);
router.put('/:id/status/:status/staff/:manhanvien', hoadonRouter.updateTrangThai); // cập nhật trạng thái hóa đơn (thay đổi sl sách khi từ xử lý sang đã xác nhân) (thêm mã nhân viên) - dành cho admin
router.put('/:id/cancel',verifyToken, isKhachhang, hoadonRouter.huyDon); // hủy hóa đơn - đanh cho khách
router.delete('/:id',verifyToken, isNhanVien, hoadonRouter.delete); // xóa  hóa đơn

module.exports = router;
