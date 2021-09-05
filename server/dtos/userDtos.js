//Создаем и экспортируем объект юзера для того что бы с помощью него сгенерировать токен без пароля
module.exports = class userDto {
    id;
    login;
    username;
    role;
    constructor(model) {
        this.id = model.id
        this.login = model.login
        this.username = model.username
        this.role = model.role
    }
}