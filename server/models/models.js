//Файл для описания моделей данных

//импортируем sequelize из файла db.js
const sequelize = require('../db')

//из пакета sequelize импортируем класс DataTypes с помощью него описываем типы полей, str, int массив и т.д.
const {DataTypes} = require('sequelize')

//Модель пользователя
const user = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: {type: DataTypes.STRING, unique: true, },
    username: {type: DataTypes.STRING, allowNull: false, },
    password: {type: DataTypes.STRING, allowNull: false },
    role: {type: DataTypes.STRING, allowNull: false}
})

//Модель токена
const token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: {type: DataTypes.STRING, allowNull: false},
})

//Модель офиса
const office = sequelize.define('office', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, unique: true, allowNull: false },
})

//Модель мест в офисе
const place = sequelize.define('place', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: true  },
})

//Модель сообщений
const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    remark: {type: DataTypes.STRING, allowNull: false}
})

//Модель всех различных предметов
const item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false },
    serial: {type: DataTypes.STRING, allowNull: true },
    inventory: {type: DataTypes.STRING, primaryKey: true, allowNull: false },
    manage: {type: DataTypes.STRING, allowNull: true },
    cpu: {type: DataTypes.STRING, allowNull: true },
    ram: {type: DataTypes.STRING, allowNull: true },
    placeStatus: {type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
})

//Модель типов
const type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false },
})

//Модель подтипов
const subtype = sequelize.define('subtype', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false },
    img: {type: DataTypes.STRING, allowNull: false},
})


//Модель истории
const history = sequelize.define('history', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    action: {type: DataTypes.STRING, allowNull: false },
    manage: {type: DataTypes.STRING, allowNull: true },
    place: {type: DataTypes.STRING, allowNull: true},
    img: {type: DataTypes.STRING, allowNull: true},
    nameItem: {type: DataTypes.STRING, allowNull: false},
    inventory: {type: DataTypes.STRING, allowNull: false},
    user: {type: DataTypes.STRING, allowNull: false},
})

//Модель доступа к офисам
const access = sequelize.define('access', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
/*Описываем связи между таблицами*/


//связь между пользователем и сообщениями один ко многим
user.hasMany(Message)

//сообщаем что message принадлежит пользователю
Message.belongsTo(user)

//связь между офисом и местом в офисе один ко многим
office.hasMany(place)

//место пренадлежит конкретному офису
place.belongsTo(office)


//Связи между местами в офисе и оборудованием
place.hasMany(item)
item.belongsTo(place)

//Связь между предметами и офисом
office.hasMany(item)
item.belongsTo(office)

//Связи между типами и подтипами
type.hasMany(subtype)
subtype.belongsTo(type)

//Связи между подтипами и оборудованием
subtype.hasMany(item)
item.belongsTo(subtype)

//Связь между историей и оборудованием
item.hasMany(history)
history.belongsTo(item)

//Связь между историей и офисами
office.hasMany(history)
history.belongsTo(office)

//Связь между заметкой и предметами парка
item.hasMany(Message)
Message.belongsTo(item)

//Связь между токенами и юзерами
user.hasOne(token)
token.belongsTo(user)

//Связь между юзерами и доступом
user.hasOne(access)
access.belongsTo(user)

//связь между доступ и офисами
office.hasMany(access)
access.belongsTo(office)

//Экспортируем модели что бы можно было их использовать в других файлах
module.exports = {
    user, Message, office, place, item, history, type, subtype, token, access
}
