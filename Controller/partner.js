
const modelPartner = require('../Model/Partner');
const modelTB = require('../Model/ThongBao');
const modelLV = require('../Model/LinhVuc');
const modelKH = require('../Model/KhoaHoc');
const modelQ = require('../Model/Queue');
const modelDK = require('../Model/DonDangKy');
const modelDT = require('../Model/tinDaoTao');
const mongoose = require('mongoose');
const dateFormat=require('dateformat');
module.exports = {
    loadIndex: async (req, res) => {
        if (req.isAuthenticated() && req.user[0].role == 3) {
            let idDV = mongoose.Types.ObjectId(req.user[0]._id)
            let listTB = await modelTB.model.find({ _id: idDV });
            let count = await modelTB.model.find({ _id: idDV, status: 0 }).countDocuments();
            res.render('congTacVien', { user: req.user, path: 'index', listTB, count,kt:0 });
        }
        else
            res.redirect('/login-partner');
    },
    loadPageQLKH: async (req, res) => {
        if (req.isAuthenticated() && req.user[0].role == 3) {
            let lv = await modelLV.model.find();
            let idDV = mongoose.Types.ObjectId(req.user[0]._id);
            modelKH.model.aggregate(
                [
                    {
                        $lookup: {
                            from: 'linhVuc',
                            localField: 'idLV',
                            foreignField: '_id',
                            as: 'lv'
                        }
                    },
                    {
                        $lookup: {
                            from: 'donDangKy',
                            localField: '_id',
                            foreignField: 'idKH',
                            as: 'dk'
                        }
                    },
                    {
                        $match:{idDV:idDV}
                    }
                ], (err, list) => {
                    if (err) throw err;
                    res.render('congTacVien', { path: "khoaHoc", linhVuc: lv, listKH: list, user: req.user ,kt:1});
                });
        }
        else
            res.redirect('/login-partner');
    },
    loadPageQLBV:async (req,res) => {
        let listBV=await modelDT.model.find({idDV:req.user[0]._id});
        res.render('congTacVien',{user:req.user,list:listBV,path:'BaiViet',kt:2});
    },
    loadPageQLDK: async (req, res) => {
        if (req.isAuthenticated()) {

            let idDV = mongoose.Types.ObjectId(req.user[0]._id);
            let listDK = await modelKH.model.aggregate([
                {
                    $lookup: {
                        from: 'linhVuc',
                        localField: 'idLV',
                        foreignField: '_id',
                        as: 'lv'
                    }
                },
                {
                    $lookup: {
                        from: 'donDangKy',
                        localField: '_id',
                        foreignField: 'idKH',
                        as: 'dk'
                    }
                },
                {
                    $match: { idDV: idDV }
                }
            ]);
            res.render('congTacVien', { user: req.user, path: 'dangKy', listDK,kt:3 });
        }
        else
            res.redirect('/login-partner');
    },
    getAccount: async (username, password, done) => {
        let tk = await modelPartner.model.find({ username: username });
        if (tk.length != 0) {
            tk = { ...tk, password: password };
            modelPartner.method.checkAccount(tk, done);
        }
        else
            return done(null, false, { message: 'Tai khoan khong ton tai.' });
    },
    checkPartner: async (name, done) => {
        let tk = await modelPartner.model.find({ username: name });
        if (tk)
            return done(null, tk);
        else
            return done(null, false, { message: 'Tai khoan khong ton tai.' });
    },
    addPartner: async (req, res) => {
        let { username } = req.body;
        let { password } = req.body;
        let { email } = req.body;
        let { tenDV } = req.body;
        let kt = await modelPartner.method.addPN(username, password, email, tenDV);
        if (kt == 1)
            res.redirect('/login-partner');
    },
    updateAccount: async (req, res) => {
        let kt = await method.updateAccount(req.params.idAcc, req.body.username, req.body.password, req.body.role);
        if (req.session.mess == null)
            req.session.mess = 2;
        if (kt) {
            req.session.mess = 1;
            res.status(200).json({ mess: 'success' })
        } else {
            req.session.mess = 0;
            res.status(500).json({ mess: 'fail' })
        }

    },
    addBV:(req,res) => {
        let date = new Date();
        let data = null;
        let postTime = dateFormat(date, "d/mm/yyyy, h:MM tt");
        data = { ...req.body, ngayTao: postTime };
        modelDT.method.addBV(data);
        res.redirect('/partner/bai-viet');

    }


}