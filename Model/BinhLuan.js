const mongoose=require('mongoose');
var binhLuan=new mongoose.Schema({
    ten:String,
    email:String,
    noiDung:String,
    thoiGian:String,
    idBV:{
        type:"ObjectID",
        ref:"baiViet"
    }
},{collection:'binhLuan'});
var model=mongoose.model('binhLuan',binhLuan);
var method={
    getList:() => {
        return new Promise((resolve,reject) => {
            model.find({},(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    addBL:(data) => {
        return new Promise((resolve,reject) => {
            let lv=new model(data);
            lv.save((err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    deleteBV:(id) => {
        return new Promise((resolve,reject) => {
            model.findByIdAndRemove(id,(err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    }
}
module.exports={
    model:model,
    method:method
};