//Создаем и экспортируем объект юзера для того что бы с помощью него сгенерировать токен без пароля
module.exports = class tokenDto {
    id;
    refreshToken;
    userId;
    constructor(model) {
        this.id = model.id
        this.refreshToken = model.refreshToken
        this.userId = model.userId
    }
}