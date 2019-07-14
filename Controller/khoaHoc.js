const modelKH = require('../Model/KhoaHoc');
const modelLV = require('../Model/LinhVuc');
const modelQ = require('../Model/Queue');
const dateFormat = require('dateformat');
const modelTB = require('../Model/ThongBao');
const modelDK= require('../Model/DonDangKy');
const mongoose = require('mongoose');
module.exports = {
    loadPageQLKH: async (req, res) => {
        if (req.isAuthenticated()) {
            let lv = await modelLV.model.find();
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
                        $loopup:{
                            from:'donDangKy',
                            localField:'_id',
                            foreignField:'idKH',
                            as:'dk'
                        }
                    }
                ], (err, list) => {
                    if (err) throw err;
                    res.render('partner', { path: "khoaHoc", linhVuc: lv, list: list, user: req.user, path: 'khoaHoc' });
                });
        }
        else
            res.redirect('/login-partner');
    },
    loadPageIndex: async (req, res) => {
        if (req.session.count == null)
            req.session.count = 0;
        if (req.isAuthenticated()) {
            let listQ = await modelQ.model.aggregate([
                {
                    $lookup: {
                        from: 'khoaHoc',
                        localField: 'idKH',
                        foreignField: '_id',
                        as: 'kh'
                    }
                },
                {
                    $sort: { ngay: -1 }
                }
            ]);
            res.render('admin', { user: req.user, listQ, path: 'empty', count: req.session.count, mess: req.session.mess });
        }
        else
            res.redirect('/login');
    },
    getListKH:async (req,res) => {
        let id=req.params.idLV.toString();
        id=mongoose.Types.ObjectId(id);
        let list=await modelKH.model.aggregate([
            {
                $lookup:{
                    from:'congTacVien',
                    localField:'idDV',
                    foreignField:'id',
                    as:'dv'
                }
            },
            {
                $match:{idLV:id}
            }
        ]);
        let total=await modelKH.model.find({idLV:id}).countDocuments();
        total=total /5;
        res.status(200).send({list:list,total:total});
    },
    addKH: (req, res) => {
        console.log(req.body);
        /*
        data.ngayKhaiGiang=new Date(data.ngayKhaiGiang);
        dateFormat(data.ngayKhaiGiang,'dd/mm/yyyy');
        */
        let data = { ...req.body, banner: req.file.filename };
        modelKH.method.addKH(data);
        res.redirect('/partner/khoa-hoc');
    },
    loadUpdate: async (req, res) => {
        if (req.isAuthenticated()) {
            let listCate = await modelLV.model.find();
            let id = mongoose.Types.ObjectId(req.params.idKH);
            const data = await modelKH.model.aggregate(
                [
                    { $match: { _id: id } },
                    {
                        $lookup: {
                            from: 'linhVuc',
                            localField: 'idLV',
                            foreignField: '_id',
                            as: 'lv'
                        }
                    }
                ]);
            res.render('partner', { user: req.user, list: data, cate: listCate, path: 'updateKhoaHoc' });

        }
    },
    updateKH: (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idKH);
        let data = req.body;
        modelKH.method.updateKH(id, data);
        res.redirect('/admin/khoa-hoc');
    },
    deleteKH:async (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idKH);
        let kt =await modelDK.method.deleteDK(id);
        let kt1 = await modelKH.method.deleteKH(id);
        if (kt ==1 && kt1 == 1)
            res.status(200).send({ mess: 1 });
        else
            res.status(500).send({ mess: 0 });
    },
    yeuCau: async (req, res) => {
        let dateNow = new Date();
        dateNow = dateFormat(dateNow, "d/mm/yyyy, h:MM tt");
        let data = {
            idKH: req.params.idKH,
            ngay: dateNow,
            idDV: req.user[0]._id
        };
        let kt = await modelQ.method.addQ(data);
        if (kt == 1){
           let rs= modelKH.method.choYC(req.params.idKH);
            res.status(200).send({ mess: 1 });
        }
        else
            res.status(500).send({ mess: 0 });
    },
    thayDoiKhoaHoc: async (req, res) => {
        let idKH = mongoose.Types.ObjectId(req.body.idKH);
        let idDV = mongoose.Types.ObjectId(req.body.idDV);
        let idQ = mongoose.Types.ObjectId(req.body.idQ);
        let kt = await modelKH.method.changeStatus(idKH);
        if (kt == 1) {
            let dlTB = {
                idDV,
                noiDung: "Yêu cầu đăng khóa học được chấp nhận !"
            }
            //let result = await modelTB.method.addTB(dlTB);
            let resultQ = await modelQ.method.deleteQ(idQ);
            if (resultQ == 1)
                res.status(200).send({ mess: 1 });
            else
                res.status(500).send({ mess: 0 });
        }

    },
    huyYeuCau: async (req, res) => {
        let kt = await modelQ.method.deleteQ(req.params.idQ);
        if (kt == 1)
            res.status(200).send({ mess: 1 });
        else
            res.status(500).send({ mess: 0 });
    },
    changeStatusTP: async (req, res) => {
        let kt = await modelTB.method.changeStatusTP(req.params.idTB);
        if (kt == 1)
            res.status(200).send({ mess: 1 });
        else
            res.status(500).send({ mess: 0 });
    }
}