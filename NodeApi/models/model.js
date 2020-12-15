const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Userschema'
    }
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

module.exports = {
    User: mongoose.model('User',userSchema),
    Message: mongoose.model('Message',messageSchema)
};
