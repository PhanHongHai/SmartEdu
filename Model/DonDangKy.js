const mongoose=require('mongoose');
var dondk=new mongoose.Schema({
    idKH:{
        type:"ObjectID",
        ref:"khoaHoc"
    },
    hoTen:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    sdt:Number,
    ngayDK:String
},{collection:'donDangKy'});
var model=mongoose.model('donDangKy',dondk);
var method={
    getList:(id) => {
        
    },
    addDK:(data) => {
        return new Promise((resolve,reject) => {
            let dk=new model(data);
            dk.save((err) => {
                if(err) return reject(err);
                return resolve(1);
            });
        })
    }
};
module.exports={
    model:model,
    method:method
}