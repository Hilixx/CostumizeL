const Sequelize = require('sequelize')
const mysql = require('mysql2')

const sequelize = new Sequelize('costumizeL','root','brenda2802',{
 host: 'localhost',
 dialect: 'mysql'
})


try{
    sequelize.authenticate()
    console.log('conectado')
}catch(err){

    console.log(err)
}

module.exports = sequelize