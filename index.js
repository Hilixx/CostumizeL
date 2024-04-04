const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')
const jwt = require('jsonwebtoken')
const SECRET = "costumizeL2802"


app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))


app.use(express.static("public"));



//Routes
app.get('/',(req,res)=>{
    res.render('home')
})
const historyRoutes = require('./routes/historyRoutes')


app.use('/match', historyRoutes)





//models


const History = require('./models/history')
const Player = require('./models/player')





//Conection
conn.sync({
    
}).then(
    app.listen(3000,()=>{
        console.log('banco conectado')
        console.log('rodando na porta 3000')
        
    })
    
   
).catch((err)=>{
    console.log(err)
})

