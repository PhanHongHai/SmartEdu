var express = require('express');
var router = express.Router();

const passPort = require('passport');
const passPortLocal = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');

var path = require("path");
var fs = require("fs");
var multer = require('multer')
// CONTROLLER
const ctrlUser = require('../Controller/user');
const ctrlKH = require('../Controller/khoaHoc');
const ctrlBV = require('../Controller/baiViet');
const upload_img = require('../Controller/img_upload');
const ctrlLV = require('../Controller/linhVuc');
const store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/))
        cb(new Error('Bạn chỉ được upload file ảnh'));
    else
        cb(null, true);
}

let upload = multer({ storage: store, fileFilter: fileFilter });

router.use(session({
    secret: 'something',
    cookie: { maxAge: 1000 * 60 * 3600 },
    proxy: true,
    resave: false,
    saveUninitialized: true
}));


router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
router.use(bodyParser.json({ limit: '50mb' }));
router.use(passPort.initialize());
router.use(passPort.session());
// admin login
router.route('/login')
    .get((req, res) => {
        res.render('logIn', { title: 'Đăng nhập' });
    })
    // verify account
    .post(passPort.authenticate('local', { failureRedirect: '/login', successRedirect: '/admin' }))
passPort.use('local', new passPortLocal(ctrlUser.getAccount));
passPort.serializeUser((tk, done) => {
    done(null, tk.username);
});
passPort.deserializeUser(ctrlUser.checkAccount);
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})
// load admin
router.route('/admin')
    .get(ctrlKH.loadPageIndex);
router.post('/admin/khoa-hoc/upload', (req, res) => {
    upload_img(req, function (err, data) {
        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        res.send(data);
    });
})

router.route('/admin/khoa-hoc')
    .post(upload.single('banner'), ctrlKH.addKH)
router.route('/admin/khoa-hoc/loadUpdate/:idKH')
    .post(upload.single('banner'), ctrlKH.updateKH)
router.get('/admin/khoa-hoc/delete/:idKH', ctrlKH.deleteKH);
router.post('/change-course', ctrlKH.thayDoiKhoaHoc)
router.get('/cancel-course/:idQ', ctrlKH.huyYeuCau)
// tin tuc
router.route('/admin/tin-tuc')
    .get(ctrlBV.loadPage)
    .post(upload.single('banner'), ctrlBV.addTT)
router.route('/admin/tin-tuc/:idTT')
    .post(upload.single('banner'), ctrlBV.updateBV1)
    .put(upload.single('banner'), ctrlBV.updateBV)
    .delete(ctrlBV.deleteBV)



router.route('/admin/bai-viet/loadUpdate/:idBV')
            .get(ctrlBV.loadUpdate)
            .post(upload.single('banner'), ctrlBV.updateBV)
router.get('/admin/bai-viet/delete/:idBV', ctrlBV.deleteBV);

router.post('/admin/upload', (req, res) => {
    upload_img(req, function (err, data) {
        console.log(data);
        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        res.send(data);
    });
});
router.post('/editer/uploadImg', (req, res) => {
    upload_img(req, function (err, data) {
        if (err) {
            return res.status(404).end(err);
        }
        res.send(data);
    });
});
var filesDir = path.join(path.dirname(require.main.filename), "/public/");

if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
};
/// thong bao
router.post('/thong-bao')
/// linh vuc
router.route('/admin/linh-vuc')
    .get(ctrlLV.loadPage)
    .post(ctrlLV.addLV)
router.post('/admin/linh-vuc/update/:idLV', ctrlLV.updateLV);
router.get('/admin/linh-vuc/delete/:idLV', ctrlLV.deleteLV);
module.exports = router;