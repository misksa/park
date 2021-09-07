//Импортируем модуль jsonwebtoken
const jwt = require('jsonwebtoken')

//Создаем и сразу же экспортируем функцию
module.exports = function (role) {

//Возвращаем функцию из функции
    return function (req, res, next) {

        //Проверяем если метод запроса равен OPTIONS то пропускаем, нас интересуют только put, get, post, delete запросы
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            //достаем токен из заголовка авторизации, разбиваем строку на 2 части по пробелу и берем вторую часть, конкретно токен
            const token = req.headers.authorization.split(' ')[1]

            //Проверяем есть ли токен
            if (!token) {
                //если его нету выводим ошибку
                return res.status(401).json({message: 'Пользователь не авторизован!'})
            }

            //Проверяем токен на валидность, первым параметром пишем токен вторым секретный ключ
            // const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const decoded = jwt.decode(token)

            //Сравниваем декодированную с ролью в запросе
            if (decoded.role !== role) {
                //Если не равно выводим ошибку
                return res.status(403).json({message: 'Нет доступа!'})
            }

            //К запросу user добавим данные которые вытащили из токена
            req.user = decoded

            //Вызываем следующий в цепочке middleware
            next()

        } catch (e) {

            //Если возникает ошибка выводи сообщение пользователь не авторизован
            res.status(401).json({message: 'Пользователь не авторизован!'})

        }

    }
}