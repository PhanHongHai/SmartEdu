
const modelPartner = require('../Model/Partner');
const modelTB=require('../Model/ThongBao');
const modelLV = require('../Model/LinhVuc');
const modelKH = require('../Model/KhoaHoc');
const modelQ = require('../Model/Queue');
const modelDK = require('../Model/DonDangKy');
const mongoose=require('mongoose');
module.exports = {
    loadIndex:async (req,res) => {
        if (req.isAuthenticated()) {
            let idDV=mongoose.Types.ObjectId(req.user[0]._id)
            let listTB=await modelTB.model.find({_id:idDV});
            let count=await modelTB.model.find({_id:idDV,status:0}).countDocuments();
            res.render('partner',{user:req.user,path:'home',listTB,count});
        }
        else
            res.redirect('/login-partner');
    },
    loadPageQLKH:async (req,res) => {
        if (req.isAuthenticated()) {
            let lv = await modelLV.model.find();
            let idDV=mongoose.Types.ObjectId(req.user[0]._id);
            console.log(req.user);
            let listTB=await modelTB.model.find({_id:idDV,status:0});
            let count=await modelTB.model.find({_id:idDV,status:0}).countDocuments();
            modelKH.model.aggregate(
                [
                    {
                        $lookup: {
                            from: 'linhVuc',
                            localField: 'idLV',
                            foreignField: '_id',
                            as: 'lv'
                        }
                    }
                ], (err, list) => {
                    if (err) throw err;
                    res.render('partner',{path:"khoaHoc",listTB,count:count,linhVuc:lv,list:list,user:req.user,path:'khoaHoc'});
                });
        }
        else
            res.redirect('/login-partner');
    },
    loadPageQLDK:async (req,res) => {
        if (req.isAuthenticated()) {

            let idDV=mongoose.Types.ObjectId(req.user[0]._id);
            let listDK =await modelKH.model.aggregate([
                {
                    $lookup:{
                        from: 'linhVuc',
                        localField: 'idLV',
                        foreignField: '_id',
                        as: 'lv'
                    }
                },
                {
                    $lookup:{
                        from: 'donDangKy',
                        localField: '_id',
                        foreignField: 'idKH',
                        as: 'dk'
                    }
                },
                {
                    $match:{idDV:idDV}
                }
            ]);
            let count=await modelTB.model.find({_id:idDV,status:0}).countDocuments();
            res.render('partner',{user:req.user,path:'dangKy',count,listDK});
        }
        else
            res.redirect('/login-partner');
    },
    getAccount: async (username, password, done) => {
        let tk = await modelPartner.model.find({username:username});
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
        let {username} = req.body;
        let {password} = req.body;
        let {email} = req.body;
        let kt=await modelPartner.method.addPN(username, password, email);
        if(kt ==1)
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

    }
  

}