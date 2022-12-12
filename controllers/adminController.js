const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const session = require('express-session');
const {promisify} = require('util')

// exports.register = async (req, res)=>{
//     try {
//         const user = req.body.user
//         const pass = req.body.pass
//         const perfil = req.body.perfil
//         let passHash = await bcryptjs.hash(pass, 8)

//         if (!user || !pass || !perfil) {
//             res.render('register',{
//                 alert:true,
//                 alertTitle: '!Advertencia',
//                 alertMessage: 'Todos los campos deben ser diligenciados',
//                 alertIcon: 'warning',
//                 showConfirmButton: true,
//                 timer: false,
//                 ruta: 'register'
//             }) 
//         }else{
//             conexion.query('INSERT INTO usuarios SET ?', { user:user, pass:passHash, perfil:perfil},async (error,reults)=>{
//                 if (error) {console.log(error)}
//                    res.render('register')
//                 res.render('register',{
//                     alert:true,
//                     alertTitle: '!Bien hecho',
//                     alertMessage: 'Se registraron los datos del usuario correctamente',
//                     alertIcon: 'success',
//                     showConfirmButton: false,
//                     timer: 800,
//                     ruta: 'register'
//                 }) 
//             })
//         }

        
//     } catch (error) {

//         console.log(error)
        
//     }
   
// }

// exports.altaPeli = async (req, res)=>{
//     try {
//         const namepeli = req.body.namepeli
//         const sipn = req.body.sipn
//         const anio = req.body.anio
        
//         if (!namepeli || !sipn || !anio) {
//             res.render('regPeli',{
//                 alert:true,
//                 alertTitle: '!Advertencia',
//                 alertMessage: 'Todos los campos deben ser diligenciados',
//                 alertIcon: 'warning',
//                 showConfirmButton: true,
//                 timer: false,
//                 ruta: 'regPeli'
//             }) 
//         }else{
//             conexion.query('INSERT INTO peliculas SET ?', { nombrePeliula: namepeli, Sipnosis:sipn, Anio:anio},async (error,reults)=>{
//                 if (error) {console.log(error)}
//                    res.render('regPeli')
//                 res.render('regPeli',{
//                     alert:true,
//                     alertTitle: '!Bien hecho',
//                     alertMessage: 'Se registraron los datos la pelicula',
//                     alertIcon: 'success',
//                     showConfirmButton: false,
//                     timer: 800,
//                     ruta: 'regPeli'
//                 }) 
//             })
//         }

        
//     } catch (error) {

//         console.log(error)
        
//     }
   
// }

exports.login = async (req, res)=>{
    try {
        
        const user = req.body.user
        const pass = req.body.pass 
        if (!user || !pass) {
            res.render('login',{
                alert:true,
                alertTitle: '!Advertencia',
                alertMessage: 'Todos los campos deben ser diligenciados',
                alertIcon: 'warning',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            }) 
        }else{             
            conexion.query('SELECT * FROM usuarios WHERE user =?', [user], async (error, results)=>{
                //console.log(results)
                if (results.length === 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                    res.render('login',{
                        alert:true,
                        alertTitle: '!Error',
                        alertMessage: 'Los datos ingresados no son correctos',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    }) 
                }else {
                        const id = results[0].id
                        const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        })
                        // console.log("TOKEN: "+token+" para el USUARIO : "+user)

                        const cookiesOptions = {
                            expires: new Date(Date.now()+process.env.JWT_C00KIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        res.cookie('jwt',token,cookiesOptions)
                        req.session.logeado = true,
                        req.session.perfil = results[0].perfil
                        res.render('login',{
                                alert:true,
                                alertTitle: '!Conexion exitosa',
                                alertMessage: 'LOGIN CORRECTO',
                                alertIcon: 'success',
                                showConfirmButton: false,
                                timer: 800,
                                ruta: ''
                            }) 
                }
            })
        }

    
        
    } catch (error) {
        console.log(error)
    }
}



