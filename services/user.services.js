const user =require('../models/user.model')
const bcrypt = require('bcryptjs')
const auth =require('../middleware/auth')

const { model } = require('mongoose')

async function login({username,password}, callback){
    const userData =await user.findOne({ username:username})
    if(userData != null ){
        if( bcrypt.compareSync(password ,userData.password)){
            const token =auth.generateToken(username)
            return callback(null , {...userData.toJSON(), token})
        }
        else{
            return callback({
                message:"Invalid password"
            })
        }
    }
    else{
        return callback({
            message:"Invalid username"
        })
    }
}

async function register(data , callback){
    if(data.username === undefined){
        return callback({message:"Required"})
    }
    const userData = new user(data)
    userData.save()
    .then((res)=>{
        return callback(null , res)
    })
    .catch((err)=>{
        return callback(err)
    })

}
module.exports={
    login,
    register
}