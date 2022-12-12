const express = require('express')
const router = express.Router()
const session = require('express-session');
const connection = require('../database/db')
//const {promisify} = require('util')



const adminController = require('../controllers/adminController')

// router.get('/favicon.ico', function(req, res) { 
//     res.status(204);
//     res.end();    
// });

router.get('/', (req, res)=>{
    if (req.session.logeado) {
        res.render('',{
            login:true,
            alert:false,
            perfil:req.session.perfil
        })
        
    }else{
        res.render('login',{
            login:false,
            alert:false,
            perfil:'Debe iniciar session'
        })
    }
 })

 router.get('/login', (req, res)=>{
    res.render('login', {alert: false})
 })

 router.get('/register', (req, res)=>{
    if (req.session.logeado) {
        res.render('register',{
            login:true,
            alert:false,
            perfil:req.session.perfil
        })
        
    }else{
        res.render('login',{
            login:false,
            alert:false,
            perfil:'Debe iniciar session'
        })
    }
 })

 router.get('/adminuser', (req, res)=>{
    if (req.session.logeado) {
        res.render('adminuser',{
            login:true,
            alert:false,
            perfil:req.session.perfil
        })
        
    }else{
        res.render('login',{
            login:false,
            alert:false,
            perfil:'Debe iniciar session'
        })
    }
 })

 router.get('/adminPeli', (req, res)=>{
    if (req.session.logeado) {
        res.render('adminPeli',{
            login:true,
            alert:false,
            perfil:req.session.perfil
        })
        
    }else{
        res.render('login',{
            login:false,
            alert:false,
            perfil:'Debe iniciar session'
        })
    }
 })

 router.get('/insertPelicula', (req, res)=>{
    if (req.session.logeado) {
        res.render('insertPelicula',{
            login:true,
            alert:false,
            perfil:req.session.perfil
        })
        
    }else{
        res.render('login',{
            login:false,
            alert:false,
            perfil:'Debe iniciar session'
        })
    }
 })

 router.get('/listaPelis', (req, res)=>{
    if (req.session.logeado) {
        res.render('listaPelis',{
            login:true,
            alert:false,
            perfil:req.session.perfil
        })
        
    }else{
        res.render('login',{
            login:false,
            alert:false,
            perfil:'Debe iniciar session'
        })
    }
 })

 router.get('/listaUser', (req, res)=>{
    if (req.session.logeado) {
        res.render('listaUser',{
            login:true,
            alert:false,
            perfil:req.session.perfil
        })
        
    }else{
        res.render('login',{
            login:false,
            alert:false,
            perfil:'Debe iniciar session'
        })
    }
 })

 



router.get('/pelisAll', (req, res) => {
    connection.query('SELECT * FROM peliculas' , (error,filas)=>{
        if (error) {
            console.log(error);
        }else{
            
            res.json(filas);
            
        }
    })
   
})

router.get('/logout', (req, res) =>{
    req.session.destroy(()=>{
       res.redirect('login')
    })
 })

 //router.post('/register', adminController.register)

 router.post('/login', adminController.login) 

//  router.post('/regPeli', adminController.altaPeli)  

 //router.post('/usersAll', adminController.usersAll) 

 module.exports = router