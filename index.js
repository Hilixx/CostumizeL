const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')


app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))


app.use(express.static('public'))


//Routes
app.get('/',(req,res)=>{
    res.render('home')
})
const historyRoutes = require('./routes/historyRoutes')
const accountRoutes = require('./routes/accountRoutes')

app.use('/history', historyRoutes)
app.use('/account', accountRoutes)




//models

const Account = require('./models/account')
const History = require('./models/history')





//Conection
conn.sync({
    //force:true
}).then(
    app.listen(3000,()=>{
        console.log('banco conectado')
        console.log('rodando na porta 3000')
        
    })
    
   
).catch((err)=>{
    console.log(err)
})