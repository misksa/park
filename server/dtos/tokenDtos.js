//Создаем  объект токена
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