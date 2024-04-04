const {DataTypes} = require('sequelize')
const db = require('../db/conn')



const Player = db.define('Player',{
    nick:{
        type:DataTypes.STRING,
        require:true
        
    },
    vitorias:{
        type:DataTypes.INTEGER,
        
    },
    derrotas:{
        type:DataTypes.INTEGER,
        
    },
    winrate:{
        type:DataTypes.STRING,
        
    },
})


module.exports = Player