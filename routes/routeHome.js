var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');


// CONTROLLER
const ctrlHome=require('../Controller/home.js');


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
router.post('/don-dang-ky',ctrlHome.dangKy);
module.exports = router;
