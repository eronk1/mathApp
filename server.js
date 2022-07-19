'use strict';
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mongojs = require('./saveData/mongo.js');
mongoose.connect("mongodb://localhost:27017",()=>{console.log('connected')}, e=>console.error(e))

const urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(express.json());

app.set('view engine','ejs');
app.set('views','views')


app.get('/',(req,res) =>{
    res.redirect('/home')
});
app.get('/home',(req,res)=>{
    res.render('start')
})
app.get('/signUp',(req,res) =>{
    res.render('signUp');
})
app.get('/hi',(req,res) =>{
    res.render('start.ejs')
})

app.post('/signUp',urlencodedParser, async (req,res) =>{
    try{
        const username = req.body.Username;
        const password = req.body.Password;
        const confirmPassword = req.body.confirmPassword;
        //const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,10);

        const user = {Username: username,Password:hashedPassword};
        const userSave = await mongojs.create({Username: username,Password:hashedPassword});
        console.log(username,password,confirmPassword);
        console.log(user);
        await user.save();
    
        //checks the required fields
        if(username.length >= 6 && username.length <= 16 && password.length >= 6 && password.length <= 20 && confirmPassword.length >= 6 && confirmPassword.length <= 20 && password===confirmPassword){
            //submits if the form meets requirements
            console.log('successfully submitted');
            res.redirect('/hi')
        }
        else {
            console.log('error has occurred')
        }
    } catch{
        res.status(500).send();
    }


})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`);
});