const express = require('express')
const history = require('../models/history')
const routes = express.Router()
const controller = require('../controllers/controller')
const Players = require('../models/player')


routes.get('/2x2',controller.render2x2)
routes.post('/2x2', controller.matchInfo)

routes.get('/rolls/:player1/:player2/:player3/:player4',controller.rollChampions)
 
routes.get('/playerRegister',(req,res)=>{
    res.render('playerRegister')
})
routes.post('/playerRegister',controller.registerPlayers)
routes.get('/duoWin/duo1W/:player1/:player2/:player3/:player4/:playerChampion1/:playerChampion2/:playerChampion3/:playerChampion4',controller.duo1Win)
routes.get('/duoWin/duo2W/:player1/:player2/:player3/:player4/:playerChampion1/:playerChampion2/:playerChampion3/:playerChampion4',controller.duo2Win)
routes.get('/history',controller.playerHistory)

module.exports = routes