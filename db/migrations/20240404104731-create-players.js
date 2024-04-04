'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('players',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nick:{
        type:Sequelize.STRING,
        require:true
        
      },
      vitorias:{
        type:Sequelize.INTEGER,
        
      },
      derrotas:{
        type:Sequelize.INTEGER,
        
      },
      winrate:{
        type:Sequelize.STRING,
        
      },
      createdAt:{
        type: Sequelize.STRING
      },
      updatedAt:{
        type: Sequelize.STRING
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('players')
  }
};
