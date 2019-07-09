const modelKH = require('../Model/KhoaHoc');
const modelLV = require('../Model/LinhVuc');
const dateFormat = require('dateformat');
const mongoose=require('mongoose');
module.exports = {
    loadPage:async (req, res) => {
        if (req.isAuthenticated()) {
            let listCate = await modelLV.model.find();
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
                    res.render('admin', { user: req.user, list: list, cate: listCate, path: 'khoaHoc', count: req.session.count, mess: req.session.mess });
                });
        }
        else
            res.redirect('/logIn');
    },
    addKH:(req,res) => {
        /*
        data.ngayKhaiGiang=new Date(data.ngayKhaiGiang);
        dateFormat(data.ngayKhaiGiang,'dd/mm/yyyy');
        */
        let data = { ...req.body, banner: req.file.filename};
        modelKH.method.addKH(data);
        res.redirect('/admin/khoa-hoc');
    },
    loadUpdate:async (req,res) => {
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
            res.render('admin', {user: req.user, list: data, cate: listCate, path: 'UpdateKH', count: req.session.count, mess: req.session.mess });

        }
    },
    updateKH:(req,res) => {
        let id = mongoose.Types.ObjectId(req.params.idKH);
        let data=req.body;
        modelKH.method.updateKH(id,data);
        res.redirect('/admin/khoa-hoc');
    },
    deleteKH:(req,res) => {
        let id = mongoose.Types.ObjectId(req.params.idKH);
        modelKH.method.deleteKH(id);
        res.redirect('/admin/khoa-hoc');
    }
}