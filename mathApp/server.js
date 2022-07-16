'use strict';
const express = require('express');
const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`);
});