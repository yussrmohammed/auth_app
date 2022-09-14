const jwt =require('jsonwebtoken')
function authenticationToken(req, res , next){
    const authHeader=req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 
    if(token ==null) return res.sendStatus(401)
    jwt.verify(token , "scert_key", (err,user)=>{
        console.log(err)
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}
function generateToken(username){
    return jwt.sign({data:username}, 'scert_key' , {
        expiresIn:"1h"
    })
}

module.exports={
    authenticationToken,
    generateToken
}