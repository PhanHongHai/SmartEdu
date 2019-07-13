var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');


// CONTROLLER
const ctrlHome=require('../Controller/home.js');
const ctrlBV=require('../Controller/baiViet');
const ctrlKH=require('../Controller/khoaHoc');


router.use(session({
    secret: 'something',
    cookie: { maxAge: 1000 * 60 * 3600 },
    proxy: true,
    resave: false,
    saveUninitialized: true
}));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
router.use(bodyParser.json({ limit: '50mb' }));


router.get('/',ctrlHome.loadIndex)
router.get('/tin-tuc/chi-tiet/:idBV',ctrlHome.detailBV);
router.get('/khoa-hoc/chi-tiet/:idKH',ctrlHome.detailKH);
router.get('/khoa-hoc/linh-vuc/getList/:idLV',ctrlKH.getListKH);
router.get('/khoa-hoc/linh-vuc/:idLV',ctrlHome.loadKhoaHocByLV);
router.get('/bai-viet/linh-vuc/:idLV',ctrlHome.loadBaiVietByLV);
router.get('/bai-viet/linh-vuc/getList/:idLV',ctrlBV.getListBV);
router.post('/bai-viet/binh-luan',ctrlHome.binhLuan);
router.post('/don-dang-ky',ctrlHome.dangKy);
module.exports = router;
