'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('history',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      duo1:{
        type:Sequelize.STRING,
        
    },
    duo2:{
        type:Sequelize.STRING,
        
    },

    championsDuo1:{
        type:Sequelize.STRING,
        
    },
    championsDuo2:{
        type:Sequelize.STRING,
        
    },
    duoVencedor:{
        type:Sequelize.STRING,
        
    },
    duoPerdedor:{
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
    await queryInterface.dropTable('history')
  }
};
