const Message = require("../models/model").Message;
exports.all_messages = (req,res,next)=>{
    Message.find((err,docs)=>{
        res.json(docs);
    })
}

exports.get_message = (req,res)=>{
    Message.findById({_id:req.params.id},(err,docs)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(docs);
        }
    })
}


exports.add_msg = (req,res,next)=>{
    let msg= new Message({
        content:req.body.content,
        UserId:req.body.UserId
    })
    msg.save((err)=>{
        if(err)
            res.json(err)
        else
            res.json({msg:"message added sucessfully"})
    });

}

exports.delete_message = (req,res)=>{
    Message.findByIdAndDelete({_id:req.params.id},(err)=>{
        if(err)
        res.json(err);
        else
        res.json({msg:"delete Sucessfully"})
    })
}

exports.update_message = (req,res)=>{
    let update ={
        content:req.body.content,
    } 
    Message.findByIdAndUpdate({_id:req.params.id},update,(err)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({msg:'update successfully'});
        }
    })
}