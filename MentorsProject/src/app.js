//Node Modules
const path = require('path')

//npm Modules
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const bp = require("body-parser")
//My local files
const login = require('./login.js')

//Express application set up
const app = express();


// For handling POST requests
app.use(bp.json())
app.use(bp.urlencoded({extended:false}))


//const viewsDirectory = path.join(__dirname,'../public')
//app.use(express.static(viewsDirectory))

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('',(req, res) => {
    res.render('index')
})

app.get('/login',(req, res) => {
    if(req.query){
        login.login(req.query.userName,req.query.password, (error, response) => {
            if(error){
                res.render('login',{
                    message: error
                })
            }
            else{
                res.render('chooseMentor',{
                    name:req.query.userName
                })
            }
        })
    }
    else{
        res.render('login')
    }
})

app.post('/login',(req, res)=>{
    res.send(req.body)
})

// app.get('/register',(req, res) => {
//     if(req.query){
//         login.register(req.query.userName,req.query.password,req.query.confirmPassword,req.query.fullName, (error, response) => {
//             if(error){
//                 res.render('register',{
//                     message: error
//                 })
//             }
//             else{
//                 res.render('register',{
//                     name:response
//                 })
//             }
//         })
//     }
//     else{

//     }
// })

app.get('/chooseMentor',(req, res) => {
    res.render('chooseMentor')
})

app.listen(3000, () => {
    console.log(chalk.yellow.inverse('The application is live at localhost:3000'))
})