const mongoose = require('mongoose')
const {Schema}= mongoose
const uniqueValidator= require('mongoose-unique-validator')
const userSchema = new Schema({
    username:{
        type:String,
        requried :true
    },
    email:{
        type:String,
        requried :true,
        unique:true
    },
    password:{
        type:String,
        requried :true
    },
    date:{
        type:Date,
        default:Date.now(),
        requried :true
    }


})
userSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.password

    }
})
userSchema.plugin(uniqueValidator , {message:'Email already in use.'})
const user =mongoose.model('user', userSchema)
module.exports =user