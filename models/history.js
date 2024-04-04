const {DataTypes} = require('sequelize')
const db = require('../db/conn')



const History = db.define('History',{
    duo1:{
        type:DataTypes.STRING,
        
    },
    duo2:{
        type:DataTypes.STRING,
        
    },

    championsDuo1:{
        type:DataTypes.STRING,
        
    },
    championsDuo2:{
        type:DataTypes.STRING,
        
    },
    duoVencedor:{
        type:DataTypes.STRING,
        
    },
    duoPerdedor:{
        type:DataTypes.STRING,
        
    },
    

})


module.exports = History