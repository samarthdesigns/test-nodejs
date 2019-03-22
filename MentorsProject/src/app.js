//Node Modules
const path = require('path')

//npm Modules
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const bodyParser = require('body-parser')

//My local files
const login = require('./login.js')
const mentors = require('./mentors.js')

//Express application set up
const app = express();

//Body Parser Set Up
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const publicDirectory = path.join(__dirname,'../public')
app.use(express.static(publicDirectory))

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('',(req, res) => {
    res.render('index')
})

app.get('/login',(req, res) => {
    res.render('login')
})

app.post('/login',(req, res)=>{
    if(req.body){
        login.login(req.body.userName,req.body.password, (error, response) => {
            if(error){
                res.render('login',{
                    message: error
                })
            }
            else{
                mentors.mentorsChoose(req.body.userName,(error, response) => {
                    if(error){
                        res.render('chooseMentor',{
                            message:error
                        })
                    }
                    else{
                        res.render('chooseMentor',{
                            message: response
                        })
                    }
                })
            }
        })
    }
})

app.get('/register',(req, res) => {
    res.render('register')
})

app.post('/register',(req, res)=>{
    if(req.body){
        login.register(req.body.userName,req.body.password,req.body.confirmPassword,req.body.fullName, (error, response) => {
            if(error){
                res.render('register',{
                    message: error
                })
            }
            else{
                res.render('login')
            }
        })
    }
})

app.get('/chooseMentor',(req, res) => {
    res.render('chooseMentor')
})

app.listen(3000, () => {
    console.log(chalk.yellow.inverse('The application is live at localhost:3000'))
})