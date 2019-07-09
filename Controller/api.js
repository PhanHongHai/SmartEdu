const modelUser = require('../Model/User');
const modelLV = require('../Model/LinhVuc');
const modelPartner = require('../Model/Partner');
const modelKH = require('../Model/KhoaHoc');
const modelDK = require('../Model/DonDangKy');
const modelBV =require('../Model/BaiViet');
const mongoose = require('mongoose');

module.exports = {
    //user
    getListUser: async (req, res) => {
        let data = await modelUser.method.getList();
        res.status(200).send(data);
    },
    addUser: async (req, res) => {
        let { username } = req.body;
        let { password } = req.body;
        let { role } = req.body;
        let result = await modelUser.method.addUser(username, password, role);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    getUser: async (req, res) => {
        let data = await modelUser.method.getUser(req.params.idUS);
        res.status(200).send(data);
    },
    updateUser: async (req, res) => {
        let result = await modelUser.method.updateUser(req.params.idUS, req.body);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(200).json({ result: result });
    },
    deleteUser: async (req, res) => {
        let result = await modelUser.method.deleteUser(req.params.idUS);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(200).json({ result: result });

    },
    login: async (req, res) => {
        let tk = await modelUser.model.find({ username: req.body.username });
        let result = await modelUser.method.logIn(tk);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(200).json({ result: result });
    },
    //##################################
    // partner
    getListPartner: async (req, res) => {
        let data = await modelPartner.method.getList();
        res.status(200).send(data);
    },
    getPartner: async (req, res) => {
        let data = await modelPartner.method.getPN();
        res.status(200).send(data);
    },
    addPartner: async (req, res) => {
        let result = await modelPartner.method.addPN(req.body);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    updatePartner: async (req, res) => {
        let result = await modelPartner.method.updatePN(req.params.idLV, req.body);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    deletePartner: async (req, res) => {
        let result = await modelPartner.method.deletePN(req.params.idLV);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    //################################
    // linh vuc
    getListLV: async (req, res) => {
        let data = await modelLV.method.getList();
        res.status(200).send(data);
    },
    getLV: async (req, res) => {
        let data = await modelLV.method.getLV(req.params.idLV);
        res.status(200).send(data);
    },
    addLV: async (req, res) => {
        let result = await modelLV.method.addLV(req.body);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    updateLV: async (req, res) => {
        let result = await modelLV.method.updateLV(req.params.idLV, req.body);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    deleteLV: async (req, res) => {
        let result = await modelLV.method.deleteLV(req.params.idLV);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    //##################################
    // khoaHoc
    getListKH: async (req, res) => {
        let data = await modelKH.model.aggregate([
            {
                $lookup: {
                    from: 'linhVuc',
                    localField: 'idLV',
                    foreignField: '_id',
                    as: 'lv'
                }
            }
        ]);
        res.status(200).send(data);
    },
    getKH: async (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idKH);
        let data = await modelKH.model.aggregate([
            {
                $lookup: {
                    from: 'linhVuc',
                    localField: 'idLV',
                    foreignField: '_id',
                    as: 'lv'
                }
            },
            {
                $match: { _id: { $eq: id } }
            }
        ]);
        let orderKH = await modelKH.model.aggregate([
            {
                $lookup: {
                    from: 'linhVuc',
                    localField: 'idLV',
                    foreignField: '_id',
                    as: 'lv'
                }
            },
            {
                $match: { _id: { $ne: id } }
            },
            {
                $limit: 4
            },
            {
                $sort: { ngayKhaiGiang: -1 }
            }
        ])
        res.status(200).json({ kh: data, other: orderKH });
    },
    addKH: async (req, res) => {
        let result = await modelKH.method.addKH(req.body);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    updateKH: async (req, res) => {
        let result = await modelKH.method.updateKH(req.params.idLV, req.body);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    deleteKH: async (req, res) => {
        let result = await modelKH.method.deleteKH(req.params.idLV);
        if (result != 1)
            res.status(500).json({ result: 0 });
        else
            res.status(201).json({ result: result });
    },
    //#################################
    // don dang ky
    getListDK: (req, res) => {

    },
    getDK: (req, res) => {

    },
    addDK: (req, res) => {

    },
    /// bai viet
    getListBV:async (req, res) => {
        let data = await modelBV.model.aggregate([
            {
                $lookup: {
                    from: 'linhVuc',
                    localField: 'idLV',
                    foreignField: '_id',
                    as: 'lv'
                }
            }
        ]);
        res.status(200).send(data);
    },
    getBV:async (req,res) => {
        let id=mongoose.Types.ObjectId(req.params.idBV);
        let data = await modelBV.model.aggregate([
            {
                $lookup: {
                    from: 'linhVuc',
                    localField: 'idLV',
                    foreignField: '_id',
                    as: 'lv'
                }
            },
            {
                $match:{_id:id}
            }
        ]);
        let other=await modelBV.model.aggregate([
            {
                $loopup:{
                    from: 'linhVuc',
                    localField: 'idLV',
                    foreignField: '_id',
                    as: 'lv'
                }
            },
            {
                $match:{_id:{$ne:id}}
            },
            {
                $sort:{ngayTao:-1}
            }
        ]);
        res.status(200).json({bv:data,other:other});
    }
}