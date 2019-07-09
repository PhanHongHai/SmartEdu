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
    email:String,
    sdt:Number,
    ngayDK:Date
},{collection:'donDangKy'});
var model=mongoose.model('donDangKy',dondk);
var method={
    getList:(id) => {
        
    }
};
module.exports={
    model:model,
    method:method
}