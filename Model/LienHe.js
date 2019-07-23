const mongoose=require('mongoose');
var lienHe=new mongoose.Schema({
    hoTen:{
        type:String,
        required:true
    },
    email:{
        required:true,
        type:String
    },
    phone:Number,
    title:String,
    content:String
},{collection:'lienHe'});
module.exports=mongoose.model('lienHe',lienHe);