const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
var mongoose = require("mongoose")
const bodyparser = require("body-parser")

mongoose.connect('mongodb://localhost/contact_dance_web', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
         
const port = 80;

// define mongoose Schema
var contactSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    addres: String,
    des: String,
});
// Confirming schema convert in model name - kitten
var contact = mongoose.model('Contact', contactSchema);


//Express specific stuff
app.use('/static',express.static('static')) //for serving static files 
app.use(express.urlencoded()) 


//Pug specific stuff
app.set('view engine','pug')
app.set('views',path.join(__dirname, 'views'))


//Endpoint
app.get('/',(req, res)=>{
    // const params = { }
    res.status(200).render('home.pug')
});

app.get('/contact',(req, res)=>{
    const params = {}
    res.status(200).render('contact.pug',params)
});
app.post('/contact',(req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved")
    }).catch(()=>{
        res.status(400).send("Item was not save to the database")
    })
    // res.status(200).render('contact.pug')
});

// Start the server
app.listen(port, ()=>{
    console.log(`the application started successfully on port ${port}`)
});