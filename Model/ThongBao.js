const mongoose=require('mongoose');
var thongbao=new mongoose.Schema({
    noiDung:{
        type:String,
        required:true
    },
    idDV:{
        type:"ObjectID",
        ref:"congTacVien"
    },
    status:{
        type:Number,
        default:0   // 1 -- seen
    }
},{collection:'thongBao'});
var model=mongoose.model('thongBao',thongbao);
var method={
    addTB:(data) => {
        return new Promise((resolve,reject) => {
            let lv=new model(data);
            lv.save((err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    changeStatusTP:(id) => {
        let temp=mongoose.Types.ObjectId(id);
        return new Promise((resolve,reject) => {
            model.findByIdAndRemove(temp,{status:1},(err) => {
                if(err) return reject(err);
                return resolve(1);
            })
        })
    }
}
module.exports={
    model:model,
    method:method
};