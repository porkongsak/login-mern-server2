//MERN Stack 
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config();

// connect DB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('mongodb connect'))
.catch(err=>console(err));

app.use(cors())
app.use(express.json())  //midlewere

app.post('/api/register', async (req, res) =>{
    console.log(req.body)

    try{
        // let user = await User.findOne({ email });
        // if (user) {
        //     return res.status(400).json({ error:"User already exists" });
        // }

            await User.create({
            name:req.body.name,
            email:req.body.email,
            password: req.body.password,
        })
    
    } catch (err) {
        console.log(err)
        res.json({ status:'error', error:'Duplicte email'})
    }
    res.json({ status: 'ok'})
})

//http://localhost:1337/api/login

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email:req.body.email,
        password:req.body.password,
     })

     if (user) {

        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            }, 
            process.env.KEY_JWT)

         return res.json({ status: 'ok', user: token  })
     } else {
         return res.json({ status: ' error', user: false })
     }
   
})

app.listen(1337, () =>{
    console.log('Server started on 1337')
})