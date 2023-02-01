const jwt=require('./utils/jwt')
const checkUser=(req,res,next)=>{
    let authHeader=req.headers.authorization
    if(!authHeader||!authHeader.startsWith("Bearer ")){
        res.status(400).send({
            status:false,
            message:"Invalid Auth Header"
        })
        return
    }
    let token=authHeader.substring(7, authHeader.length)
    jwt.checkToken(token).then(data=>{
        res.locals.userId=data.userId
        next()
    })
    .catch(err=>{
        res.status(400).send({
            status:false,
            message:"Token Expired"
        })
    })
}

module.exports={
    checkUser
}