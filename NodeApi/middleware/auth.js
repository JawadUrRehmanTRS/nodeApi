
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    if(!req.headers.autherization){
        return res.status(401).send('unautheraized')
    }
    let token = req.headers.autherization.split(' ')[1]
    if(token == null)
    {
        return res.status(401).send('Unautherized')
    }
    let payload = jwt.verify(token,'secret')
    if(!payload){
        return res.status(401).send('Unautherized')
    }
        req.UserId = payload.User
        next()
}
