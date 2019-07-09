const mongoose=require('mongoose');
var partner=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:3,
        required:true
    },
    status:{
        type:Number,
        default:1,
        required:true
    },
    tenDV:{
        type:String,
        unique:true,
        required:true
    },
    sdt:{
        type:Number,
        min:9,
        max:11
    },
    email:{
        type:String,
        required:true
    },
    diaChi:String,
    gioiThieu:String,
    anh:String
},{collection:"congTacVien"});
var model=mongoose.model('congTacVien',partner);
var method={
    getList:() => {
        return new Promise((resolve,reject) => {
            model.find({},(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    getPN:() => {
        return new Promise((resolve,reject) => {
            model.findById(id,(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    addPN:(data) => {
        return new Promise((resolve,reject) => {
            let us=new model(data);
            us.save((err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    updatePN:(id,data) => {
        return new Promise((resolve,reject) => {
            model.findByIdAndUpdate(id,data,(err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    deletePN:(id) => {
        return new Promise((resolve,reject) => {
            model.findByIdAndDelete(id,(err) => {
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