require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/route')
app.use(bodyParser.json());
//connect MongoDb with mongoose
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',function(){
    console.log("mongoDb connected")
});
mongoose.connection.on('error',function(err){
    if(err)
    console.log("error Connection",err)
});

//routes
app.use('/',routes)

//create server
app.listen(process.env.PORT,()=>{
    console.log("server started at port 3000")
})
