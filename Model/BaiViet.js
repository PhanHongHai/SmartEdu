const mongoose=require('mongoose');
var baiviet=new mongoose.Schema({
    tieuDe:{
        type:String,
        required:true
    },
    noiDung:String,
    idLV:{
        type:"ObjectID",
        ref:"linhVuc"
    },
    banner:String,
    ngayTao:String
},{collection:'baiViet'});
var model=mongoose.model('baiViet',baiviet);
var method={
    getList:() => {
        return new Promise((resolve,reject) => {
            model.find({},(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    getBV:() => {
        return new Promise((resolve,reject) => {
            model.findById(id,(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    addBV:(data) => {
        return new Promise((resolve,reject) => {
            let us=new model(data);
            us.save((err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    updateBV:(id,data) => {
        return new Promise((resolve,reject) => {
            model.findByIdAndUpdate(id,data,(err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    deleteBV:(id) => {
        return new Promise((resolve,reject) => {
            model.findOneAndDelete(id,(err) => {
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