const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const app = express()


app.set('view engine', 'ejs')


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'))



app.use(express.urlencoded({ extended:true}))
app.use(express.json())

dotenv.config({path: './env/.env'})

app.use(cookieParser())

app.use('/', require('./routes/router'))
app.use('/', require('./api/apicrud'))

app.listen(4000, ()=>{
    console.log('SERVER UP running in htpp://localhost:4000')
})



