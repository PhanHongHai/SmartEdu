var express = require('express');
var router = express.Router();

const passPort = require('passport');
const passPortLocal = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');

var path = require("path");
var fs = require("fs");
var multer = require('multer');
const upload_img = require('../Controller/img_upload');
// CONTROLLER
const ctrlPN=require('../Controller/partner');
const ctrlKH=require('../Controller/khoaHoc');
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

router.route('/login-partner')
    .get((req, res) => {
        res.render('logInPartner');
    })
    .post(passPort.authenticate('partner', { failureRedirect: '/login-partner', successRedirect: '/partner' }))
passPort.use('partner', new passPortLocal(ctrlPN.getAccount));
passPort.serializeUser((tk, done) => {
    done(null, tk);
});
passPort.deserializeUser(ctrlPN.checkPartner);
router.route('/signup-partner')
    .get((req, res) => {
        res.render('signUpPartner');
    })
    .post(ctrlPN.addPartner)

router.get('/partner',ctrlPN.loadIndex)
router.get('/logout-partner',(req,res) => {
    req.logout();
    res.redirect('/login-partner');
})
// ql khoa hoc
router.route('/partner/khoa-hoc')
.get(ctrlPN.loadPageQLKH)
.post(upload.single('banner'), ctrlKH.addKH)
router.get('/mo-khoa-hoc/:idKH',ctrlKH.yeuCau);
router.post('/partner/upload', (req, res) => {
    upload_img(req, function (err, data) {
        console.log(data);
        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        res.send(data);
    });
});
router.post('/partner/uploadImg', (req, res) => {
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
// ql dang ky
router.route('/partner/don-dang-ky')
.get(ctrlPN.loadPageQLDK)
module.exports = router;
