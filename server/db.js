/* файл с настройками подключения к базе данных */

//Импортируем sequelize
const {Sequelize} = require('sequelize')

// экспортируем объект sequelize
module.exports = new Sequelize(

    //название базы данных
    process.env.DB_NAME,

    //Пользователь
    process.env.DB_USER,

    //пароль
    process.env.DB_PASSWORD,
    {

        //объект с портом и хостом и обозначения диалекта для бд postgreSQL
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT

    }
)