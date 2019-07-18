const modelBV = require('../Model/BaiViet');
const modelLV = require('../Model/LinhVuc');
const dateFormat = require('dateformat');
const mongoose = require('mongoose');
const modelBL=require('./binhLuan');
const modelDT=require('../Model/tinDaoTao');
module.exports = {
    loadPage: async (req, res) => {
        if (req.isAuthenticated()) {
            res.render('admin', { user: req.user, path: 'BaiViet' });
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
    addBV: (req, res) => {
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
        modelBV.method.addBV(data);
        res.redirect('/admin/bai-viet');
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
    updateBV: (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idBV);
        let data = null;
        if (req.file)
            data = { ...req.body, banner: req.file.filename};
        else
            data = { ...req.body};
        modelBV.method.updateBV(id, data);
        res.redirect('/admin/bai-viet');
    },
    deleteBV: (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idBV);
        modelBV.method.deleteBV(id);
      //  modelBL.method.deleteBL(id);
        res.redirect('/admin/bai-viet');
    }
}