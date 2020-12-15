const User = require("../models/model").User;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.all_users = (req,res,next)=>{
    User.find((err,docs)=>{
        res.json(docs);
    })
}

exports.get_user = (req,res)=>{
    User.findById({_id:req.params.id},(err,docs)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(docs);
        }
    })
}

exports.login = (req,res)=>{
    User.findOne({email:req.body.email},function(err,docs){
        if(err){
            res.send(err);
        }
        else
        if(!docs){
            let msg = 'Invalid Email'
            res.status(401).send({msg:msg})
        }
        else{
            bcrypt.compare(req.body.password,docs.password,(err,result)=>{
                if(err){
                    res.json(err)
                }
                else
                if(!result){
                    let msg = 'Invalid Password'
                    res.status(401).send({msg:msg})
                }
                else
                {
                    let user = docs._id
                    let tken = jwt.sign({user:docs._id},'secret',{expiresIn:7200});
                    res.status(201).send({tken:tken,user:user});
                }
            })
    }
            
        
    })
    
   
}
        




exports.add_user =(req,res,next)=>{
    
     bcrypt.hash(req.body.password,10,(err,pass)=>{
        if(err){
            res.json(err)
        }
    
            let user= new User({
                name:req.body.name,
               password:pass,
               email:req.body.email
            });
            user.save((err)=>{
                if(err)
                    res.json(err)
                else
                    res.json({msg:"user added sucessfully"})
            });
        })
    }
    
    
        
    
    
    
   


exports.delete_user = (req,res)=>{
    User.findByIdAndDelete({_id:req.params.id},(err)=>{
        if(err)
        res.json(err);
        else
        res.json({msg:"delete Sucessfully"})
    })
}

exports.update_user = (req,res)=>{
    let update ={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    } 
    User.findByIdAndUpdate({_id:req.params.id},update,(err)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({msg:'update successfully'});
        }
    })
}