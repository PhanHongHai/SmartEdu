const mongoose=require('mongoose');
var linhvuc=new mongoose.Schema({
    ten:{
        type:String,
        unique:true,
        required:true
    }
},{collection:'linhVuc'});
var model=mongoose.model('linhVuc',linhvuc);
var method={
    getList:() => {
        return new Promise((resolve,reject) => {
            model.find({},(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    getLV:(id) => {
        return new Promise((resolve,reject) => {
            model.findById(id,(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    addLV:(data) => {
        return new Promise((resolve,reject) => {
            let lv=new model(data);
            lv.save((err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    updateLV:(id,data) => {
        return new Promise((resolve,reject) => {
            model.findByIdAndUpdate(id,data,(err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    deleteLV:(id) => {
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