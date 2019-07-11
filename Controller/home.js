const modelKH = require('../Model/KhoaHoc');
const modelLV = require('../Model/LinhVuc');
const modelBV = require('../Model/BaiViet');
const modelQ = require('../Model/Queue');
const dateFormat = require('dateformat');
const modelTB = require('../Model/ThongBao');
const modelDK = require('../Model/DonDangKy');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const config=require('../constants/config');

const option = {
    service: 'gmail',
    auth: {
        user: 'phanhonghai97@gmail.com', // email hoặc username
        pass: 'phanhonghai123' // password
    }
};
var transporter = nodemailer.createTransport(option);

module.exports = {
    loadIndex: async (req, res) => {
        let listLV=await modelLV.model.find({});
        let listBV = await modelBV.model.aggregate([
            {
                $lookup: {
                    from: 'linhVuc',
                    localField: 'idLV',
                    foreignField: '_id',
                    as: 'lv'
                }
            },
            {
                $sort:{ngayTao:-1}
            },
            {
                $limit:3
            }
        ]);
        let listKH=await modelKH.model.aggregate([
            {
                $lookup:{
                    from: 'congTacVien',
                    localField: 'idDV',
                    foreignField: '_id',
                    as: 'ctv'
                }
            },
            {
                $lookup:{
                    from: 'linhVuc',
                    localField: 'idLV',
                    foreignField: '_id',
                    as: 'lv'
                }
            },
            {
                $match:{trangThai:1}
            },
            {
                $sort:{ngayKhaiGiang:-1}
            },{
                $limit:20
            }
        ]);
        res.render('home',{listBV,listLV,listKH});
    },
    detailBV:async (req,res) => {
        let id=mongoose.Types.ObjectId(req.params.idBV);
        let listLV=await modelLV.model.find({});
        let detail=await modelBV.model.aggregate([
            {
                $lookup:{
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
        let tinLQ=await modelBV.model.aggregate([
            {
                $lookup:{
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
                $limit:4
            }
        ]);
        res.render('ChiTietBaiViet',{listLV,tinLQ,detail});
    },
    detailKH:async (req,res) => {
        let id=mongoose.Types.ObjectId(req.params.idKH);
        let listLV=await modelLV.model.find({});
        let detail=await modelKH.model.aggregate([
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
                    from: 'congTacVien',
                    localField: 'idDV',
                    foreignField: '_id',
                    as: 'dv'
                }
            },
            {
                $match:{_id:id}
            }
        ]);

        let khLQ=await modelBV.model.aggregate([
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
                    from: 'congTacVien',
                    localField: 'idDV',
                    foreignField: '_id',
                    as: 'dv'
                }
            },
            {
                $match:{_id:{$ne:id}}
            },
            {
                $limit:4
            }
        ]);
        res.render('ChiTietKhoaHoc',{listLV,khLQ,detail});
    },
    dangKy:async (req,res) => {
        let id=mongoose.Types.ObjectId(req.body.idKH);
        let dateNow =new Date();
        let data={...req.body,idKH:id,ngayDK:dateFormat(dateNow,"dd-mm-yyyy")};
        let kt=await modelDK.method.addDK(data);
        if(kt == 1){
            transporter.verify(function(error, success) {
                // Nếu có lỗi.
                if (error) {
                    console.log(error);
                } else { //Nếu thành công.
                    console.log('Kết nối mail thành công!');
                    var mail = {
                        from: 'phanhonghai97@gmail.com', 
                        to: req.body.email, 
                        subject: 'Thông báo đăng ký khóa học', // Tiêu đề mail
                        text: 'Chuc mung ban dang ky thanh cong', // Nội dung mail dạng text
                        html:`<h3></h3>`
                    };
                    //Tiến hành gửi email
                    transporter.sendMail(mail, function(error, info) {
                        if (error) { // nếu có lỗi
                            console.log(error);
                        } else { //nếu thành công
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
            });
            res.status(201).send({mess:1});
        }
        else
            res.status(500).send({mess:0});
    }
}