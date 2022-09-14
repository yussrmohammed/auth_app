const express= require('express')
const mongoose =require('mongoose')
const dbConfig= require('./config/db.config')
const auth= require('./middleware/auth')
const errors = require('./middleware/errorsHandling')
const {unless} = require('express-unless')
const app= express()
const route = require('./routes/users.routes')


mongoose.Promise= global.Promise
mongoose.connect(dbConfig.url).then(()=>{
    console.log('connected')
},
(error)=>{
    console.log(error)
}

)
auth.authenticationToken.unless=unless
app.use(
auth.authenticationToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },

    ],
  })

)
app.use(express.json())
app.use('/users', route)
app.use(errors.errorsHandler)
app.listen(3000, ()=>{
    console.log("app is serving on port 3000")
})

