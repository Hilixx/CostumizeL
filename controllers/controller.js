const { where } = require('sequelize');
const History = require('../models/history')
const Player = require('../models/player')
const { JSDOM } = require('jsdom');
const { raw } = require('mysql2');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const document = dom.window.document;



module.exports =  class controller{

    static async matchInfo(req,res){
        const players ={
         player1 : req.body.player1,
         player2 : req.body.player2,
         player3 : req.body.player3,
         player4 : req.body.player4,
        }  
        
        
        
           const duos = [players.player1, players.player2, players.player3, players.player4]
    
            let indice1 = Math.floor(Math.random() * duos.length);
            let player1 = duos[indice1];
            
            
            duos.splice(indice1, 1);
            console.log(duos)
            
            
            let indice2 = Math.floor(Math.random() * (duos.length));
            let player2 = duos[indice2];

            duos.splice(indice2, 1);
            console.log(duos)

            let indice3 = Math.floor(Math.random() * (duos.length));
            let player3 = duos[indice3];

            duos.splice(indice3, 1);
            
            let indice4 = Math.floor(Math.random() * (duos.length));
            let player4 = duos[indice4];
            
             
            const duo1 = [player1, player2]
            const duo2 = [player3, player4]

            const player1Verify = await Player.findOne({where:{nick:player1}})
            const player2Verify = await Player.findOne({where:{nick:player2}})
            const player3Verify = await Player.findOne({where:{nick:player3}})
            const player4Verify = await Player.findOne({where:{nick:player4}})
            console.log(player1Verify)

            if(player1Verify && player2Verify && player3Verify && player4Verify){
                
                res.render('2x2',{duo1,duo2,randomConfirm:true, player1,player2,player3,player4})
            }
            else{
                console.log('Um dos jogadores é invalido')
                res.redirect('/match/2x2')
            }
            
           
           

       
        
        
     
        }
    static async rollChampions(req,res){
        let champions = "Aatrox Ahri Akali Akshan Alistar Amumu Anivia Annie Aphelios Ashe AurelionSol Azir Bardo Bel'Veth Blitzcrank Brand Braum Caitlyn Camille Cassiopeia Cho'Gath Corki  Darius Diana Draven Dr.Mundo Ekko Elise Evelynn Ezreal Fiddlesticks Fiora Fizz Galio Gangplank Garen Gnar Gragas Graves Gwen Hecarim Heimerdinger Illaoi Irelia Ivern Janna JarvanIV Jax Jayce Jhin Jinx K'Sante Kai'Sa Kalista Karma Karthus Kassadin Katarina Kayle Kayn Kennen Kha'Zix Kindred Kled Kog'Maw LeBlanc LeeSin Leona Lillia Lissandra Lucian Lulu Lux Malphite Malzahar Maokai MasterYi Milio MissFortune Mordekaiser Morgana Naafiri Nami Nasus Nautilus Neeko Nidalee Nilah Nocturne Nunu&Willump Olaf Orianna Ornn Pantheon Poppy Pyke Qiyana Quinn Rakan Rammus Rek'Sai Rell Renata Renekton Rengar Riven Rumble Ryze Samira Sejuani Senna Seraphine Sett Shaco Shen Shyvana Singed Sion Sivir Skaner Sona Soraka Swain Sylas  Syndra TahmKench Taliyah Talon Taric Teemo Thresh Tristana Trundle Tryndamere TwistedFate Twitch Udyr Urgot Varus Vayne Veigar Vel'Koz Vex Vi Viego Viktor Vladimir Volibear Warwick Wukong Xayah Xerath XinZhao Yasuo Yone Yorick Yuumi Zac Zed Zeri Ziggs Zilean Zoe Zyra Hwei Briar Naafiri Milio Smolder"
        const championsArr = champions.split(' ')
       
       let indice1 = Math.floor(Math.random() * championsArr.length)
       let playerChampion1 = championsArr[indice1]
       
       let indice2 = Math.floor(Math.random() * championsArr.length)
       let playerChampion2 = championsArr[indice2]

       let indice3 = Math.floor(Math.random() * championsArr.length)
       let playerChampion3 = championsArr[indice3]

       let indice4 = Math.floor(Math.random() * championsArr.length)
       let playerChampion4 = championsArr[indice4]
        const playerChampions = {
            playerChampion1,
            playerChampion2,
            playerChampion3,
            playerChampion4
        }

       
        const player1 =  req.params.player1
        const player2 =  req.params.player2
        const player3 =  req.params.player3
        const player4 =  req.params.player4       
       
        const duo1 = (`${player1} ${player2}`)
        const duo2 = (`${player3} ${player4}`)
        const championsDuo1 = (`${playerChampion1} ${playerChampion2}`)
        const championsDuo2 = (`${playerChampion3} ${playerChampion4}`)
       
        History.create({duo1,duo2,championsDuo1,championsDuo2})
        
        
        

       res.render('roll', {player1,player2,player3,player4,playerChampions})
    }

    static registerPlayers(req,res){
        const nick = req.body.nickname
        Player.create({nick})
        res.redirect('/match/playerRegister')
        

    }
    
    static async render2x2(req,res){
       const players = await Player.findAll({raw:true})
       console.log(players)
       const nick = 'nick'
        let playersNick = [];
        
        for (let i = 0; i < players.length; i++) {
            
            playersNick.push(players[i][nick]);
        }
        console.log(playersNick) 
      
       

        
       
       res.render('2x2',{playersNick})
    }

    static async duo1Win(req,res){
       
        const player1 = req.params.player1
        const player2 = req.params.player2
        const player3 = req.params.player3
        const player4 = req.params.player4

        const player1Up = await Player.findOne({where:{nick:player1}})
        const player2Up = await Player.findOne({where:{nick:player2}})
        const player3Up = await Player.findOne({where:{nick:player3}})
        const player4Up = await Player.findOne({where:{nick:player4}})
        

        player1Up.update({vitorias:player1Up.vitorias + 1})
        player2Up.update({vitorias:player2Up.vitorias + 1})
        player3Up.update({derrotas:player3Up.derrotas + 1})
        player4Up.update({derrotas:player4Up.derrotas + 1})
        const partidasTotais1 = player1Up.vitorias + player1Up.derrotas 
        const winrate1 = Math.floor((player1Up.vitorias/partidasTotais1) * 100)
        console.log(winrate1)
        const partidasTotais2 = player2Up.vitorias + player2Up.derrotas 
        const winrate2 = Math.floor((player2Up.vitorias/partidasTotais2) * 100) 
        const partidasTotais3 = player3Up.vitorias + player3Up.derrotas 
        const winrate3 = Math.floor((player3Up.vitorias/partidasTotais3) * 100) 
        const partidasTotais4 = player4Up.vitorias + player4Up.derrotas 
        const winrate4 = Math.floor((player4Up.vitorias/partidasTotais4) * 100) 

        player1Up.update({winrate:winrate1})
        player2Up.update({winrate:winrate2})
        player3Up.update({winrate:winrate3})
        player4Up.update({winrate:winrate4})
       res.redirect('/')
    }
    static async duo2Win(req,res){
        
        const player1 = req.params.player1
        const player2 = req.params.player2
        const player3 = req.params.player3
        const player4 = req.params.player4

        const player1Up = await Player.findOne({where:{nick:player1}})
        const player2Up = await Player.findOne({where:{nick:player2}})
        const player3Up = await Player.findOne({where:{nick:player3}})
        const player4Up = await Player.findOne({where:{nick:player4}})
        console.log(player1,player2)
        
        
        player1Up.update({derrotas:player1Up.derrotas + 1 })
        player2Up.update({derrotas:player2Up.derrotas + 1 })
        player3Up.update({vitorias:player3Up.vitorias + 1 })
        player4Up.update({vitorias:player4Up.vitorias + 1 })
        const partidasTotais1 = player1Up.vitorias + player1Up.derrotas 
        const winrate1 = Math.floor((player1Up.vitorias/partidasTotais1) * 100) 
        console.log(winrate1)
        const partidasTotais2 = player2Up.vitorias + player2Up.derrotas 
        const winrate2 = Math.floor((player2Up.vitorias/partidasTotais2) * 100) 
        const partidasTotais3 = player3Up.vitorias + player3Up.derrotas 
        const winrate3 = Math.floor((player3Up.vitorias/partidasTotais3) * 100) 
        const partidasTotais4 = player4Up.vitorias + player4Up.derrotas 
        const winrate4 = Math.floor((player4Up.vitorias/partidasTotais4) * 100) 
        console.log(winrate1,winrate2,winrate3,winrate4)
        

        player1Up.update({winrate:winrate1})
        player2Up.update({winrate:winrate2})
        player3Up.update({winrate:winrate3})
        player4Up.update({winrate:winrate4})
        
        res.redirect('/')
       
    }
    static async playerHistory(req,res){
        const players = await Player.findAll({raw:true})
        
        console.log(players)
        
        res.render('playerHistory',{players})

    }
    

        
    
}

