const modelBV = require('../Model/BaiViet');
const modelLV = require('../Model/LinhVuc');
const dateFormat = require('dateformat');
const mongoose = require('mongoose');
const modelBL = require('../Model/BinhLuan');
const modelDT = require('../Model/tinDaoTao');
module.exports = {
    loadPage: async (req, res) => {
        if (req.isAuthenticated()) {
            let lv = await modelLV.model.find({});
            let list = await modelBV.model.aggregate([
                {
                    $lookup: {
                        from: 'linhVuc',
                        localField: 'idLV',
                        foreignField: '_id',
                        as: 'lv'
                    }
                },
                {
                    $sort: { ngayTao: -1 }
                }
            ]);
            res.render('admin', { user: req.user, path: 'BaiViet', lv, list });
        }
        else
            res.redirect('/logIn');
    },
    getListBV: async (req, res) => {
        let id = req.params.idLV.toString();
        id = mongoose.Types.ObjectId(req.params.idLV)
        let list = await modelBV.model.find({ idLV: id });
        let total = await modelBV.model.find({ idLV: id }).countDocuments();
        total = total / 5;
        res.status(200).json({ total: total, list: list });
    },
    addTT: async (req, res) => {
        /*
        data.ngayBVaiGiang=new Date(data.ngayBVaiGiang);
        dateFormat(data.ngayBVaiGiang,'dd/mm/yyyy');
        */
        let date = new Date();
        let data = null;
        let postTime = dateFormat(date, "d/mm/yyyy, h:MM tt");
        if (req.file)
            data = { ...req.body, banner: req.file.filename, ngayTao: postTime };
        else
            data = { ...req.body, ngayTao: postTime };
        let kt = await modelBV.method.addBV(data);
        if (kt !== 1)
            res.status(500).send({ mess: 0 });
        else
            res.status(201).send({ mess: 1 });
    },
    loadUpdate: async (req, res) => {
        if (req.isAuthenticated()) {
            let listCate = await modelLV.model.find();
            let id = mongoose.Types.ObjectId(req.params.idBV);
            const data = await modelBV.model.aggregate(
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
            res.render('admin', { user: req.user, list: data, cate: listCate, path: 'updateBV', count: req.session.count, mess: req.session.mess });

        }
    },
    updateBV:async (req, res) => {
       // let id = mongoose.Types.ObjectId(req.params.idTT);
        console.log(req.body);
        let data = null;
        if (req.file)
            data = { ...req.body, banner: req.file.filename };
        else
            data = { ...req.body };
        console.log(data);
        let kt=await modelBV.method.updateBV(req.params.idTT, data);
        console.log(kt);
        if(kt !== 1)
            res.status(500).send({mess:0});
        else
            res.status(200).send({mess:1});
    },
    updateBV1:async (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idTT);
        let data = null;
        if (req.file)
            data = { ...req.body, banner: req.file.filename };
        else
            data = { ...req.body };
        console.log(data);
        let kt=await modelBV.method.updateBV(id, data);
           res.redirect('/admin/tin-tuc')
    },
    deleteBV: async (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idTT);
        let rs = await modelBL.method.deleteBL(id);
        if (rs !== 0) {
            let kt = await modelBV.method.deleteBV(id);
            if (kt !== 1)
                res.status(500).send({ mess: 0 });
            else
                res.status(200).send({ mess: 1 });
        }
        else
            res.status(500).send({ mess: 0 });
    }
}