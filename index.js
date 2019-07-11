const express=require('express');
const http=require('http');
const app=express();
const port=process.env.PORT || 5000;
const mongoose=require('mongoose');
const routeAD=require('./routes/routeAd');
const routePartner=require('./routes/routePartner');
const routeHome=require('./routes/routeHome');
// connect mongodb
mongoose.connect('mongodb://localhost/tuyensinh',{useNewUrlParser: true,useFindAndModify: false})
.then(
    () => {console.log('connected mongodb')},
    err =>{throw err;}
);
mongoose.set('useCreateIndex', true);
//#####################################
app.set('view engine', 'ejs');

app.use('/public',express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','(*)');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
  })

  // route
  app.use(routeAD);
  app.use(routePartner);
  app.use(routeHome);
const server=http.createServer(app);
server.listen(port,() => {
    console.log(`Server is running ${port}`);
})