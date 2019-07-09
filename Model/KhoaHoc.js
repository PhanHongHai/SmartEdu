const mongoose=require('mongoose');
var khoahoc=new mongoose.Schema({
    tenKH:{
        type:String,
        required:true,
        unique:true
    },
    gioiThieu:String,
    noiDung:String,
    idLV:{
        type:"ObjectID",
        ref:"linhVuc"
    },
    banner:String,
    trangThai:{
        type:Number,
        default:0
    },
    hocPhi:{
        type:Number,
        required:true
    },
    ngayKhaiGiang:{
        type:String,
        required:true
    }
},{collection:'khoaHoc'});
var model=mongoose.model('khoaHoc',khoahoc);
var method={
    getList:() => {
        return new Promise((resolve,reject) => {
            model.find({},(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    getKH:() => {
        return new Promise((resolve,reject) => {
            model.findById(id,(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    addKH:(data) => {
        return new Promise((resolve,reject) => {
            let us=new model(data);
            us.save((err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    updateKH:(id,data) => {
        return new Promise((resolve,reject) => {
            model.findByIdAndUpdate(id,data,(err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    deleteKH:(id) => {
        return new Promise((resolve,reject) => {
            model.findByIdAndDelete(id,(err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    }
};
module.exports={
    model:model,
    method:method
}