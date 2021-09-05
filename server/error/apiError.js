/* Создем универсальные ошибки для сервера*/

//Создаем класс с функиями, extends Error означает что apiError будет дочерним классом для Error
class ApiError extends Error{
    errors;
    status;
    //Создаем конструктор, (это метод, служащий для создания и инициализации объектов, созданных с использованием class)
    constructor(status, message, errors) {

        //Вызываем родительский конструктор Error с помощью функции super
        super();

        //присваеваем родительскому конструктору то что получаем парметрами
        this.status = status
        this.message = message
        this.errors = errors
    }

    /*Создаем статические функции, эти функции можно вызывать без создания объекта*/

    //Функция badRequest не верный запрос
    static badRequest(message) {
        return new ApiError(404, message)
    }
    //Функция не авторизован
    static unauthorized(message) {
        return new ApiError(401, message)
    }

    //функиця internal внутренняя ошибка сервера
    static internal(message) {
        return new ApiError(500, message)
    }

    //Функция forbidden нету доступа
    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError