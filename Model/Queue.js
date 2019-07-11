const mongoose=require('mongoose');
var hangCho=new mongoose.Schema({
    idKH:{
        type:"ObjectID",
        ref:"khoaHoc",
        unique:true
    },
    idDV:{
        type:"ObjectID",
        ref:"congTacVien"
    },
    ngay:String
},{collection:'hangCho'});
var model=mongoose.model('hangCho',hangCho);
var method={
    addQ:(data) => {
        return new Promise((resolve,reject) => {
            let st=new model(data);
            st.save((err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        });
    },
    getList:() => {
        return new Promise((resolve,reject) => {
            model.find({},(err,res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        });
    },
    deleteQ:(id) => {
        let temp=mongoose.Types.ObjectId(id);
        return new Promise((resolve,reject) => {
            model.findOneAndRemove({_id:temp},(err,res) => {
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