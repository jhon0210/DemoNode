
const express = require('express')
const router = express.Router()
const session = require('express-session')
const connection = require('../database/db')
const bcryptjs = require('bcryptjs')

router.post('/insertUser', async (req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass
        const perfil = req.body.perfil
        let passHash = await bcryptjs.hash(pass, 8)
        connection.query('INSERT INTO usuarios SET ?', { user:user, pass:passHash, perfil:perfil},async (error,reults)=>{
            if (error) {console.log(error)}
                res.render('register',{
                alert:true,
            }) 
        })

        
    } catch (error) {

        console.log(error)
        
    }
})


router.post('/insertMovie', async (req, res)=>{
    try {
        const namepeli = req.body.namepeli
        const sipn = req.body.sipn
        const anio = req.body.anio
        connection.query('INSERT INTO peliculas SET ?', { nombrePeliula:namepeli, Sipnosis:sipn, Anio:anio},async (error,reults)=>{
            if (error) {console.log(error)}
                res.render('insertPelicula',{
                alert:true,
            }) 
        })

        
    } catch (error) {

        console.log(error)
        
    }
})

router.get('/queryUsers', (req, res) => {
    connection.query('SELECT * FROM usuarios' , (error,filas)=>{
        if (error) {
            console.log(error);
        }else{
            
            res.json(filas);
            
        }
    })
})

module.exports = router