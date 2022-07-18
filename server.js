'use strict';
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const e = require('express');
const urlencodedParser = bodyParser.urlencoded({extended: true});

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

app.post('/signUp',urlencodedParser,(req,res) =>{
    const username = req.body.Username;
    const password = req.body.Password;
    const confirmPassword = req.body.confirmPassword;
    console.log(username,password,confirmPassword);

    //checks the required fields
    if(username.length >= 6 && username.length <= 16 && password.length >= 6 && password.length <= 20 && confirmPassword.length >= 6 && confirmPassword.length <= 20 && password===confirmPassword){
        //submits if the form meets requirements
        console.log('successfully submitted');
        res.redirect('/hi')
    }
    else {
        console.log('error has occurred')
    }

})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`);
});