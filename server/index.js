//Для старта сервера в консоле прописать npm run dev
// noinspection JSCheckFunctionSignatures

//Подключаем конфиг из модуля dotenv что бы считвался файл .env
require('dotenv').config()

//Импотируем модуль express
const express = require('express')
const fileUpload = require('express-fileupload')
//импортируем объект из файла db.js
const sequelize = require('./db')
const path = require('path')

//импортируем модели бд
// const models = require('./models/models')

//Импортируем middleware
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

//импортируем куки парсер
const cookieParser = require('cookie-parser')

//импортируем cors что бы можно было делать запосы в бд из браузера
const cors = require('cors')

//импортируем основной роутер который связывает все остальные роуты
const router = require('./routes/index')

//Берем порт из переменных окружения или 5000
const PORT = process.env.PORT

//Создаем объект express
const app = express()

app.use(cookieParser())
//передаем в app функцию express.json что бы приложение могло парсить json формат
app.use(express.json())
//передаем в app функцию cors, что бы можно было взаимодействовать с сервером из браузера
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOption))
//
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(fileUpload({}))

//передаем в app наши роуты "/api" - url по которому роутер должен обрабатываться
app.use('/api', router)

//middleware который работает с ошибками обязательно должен идти и регестрироваться в самом конце
app.use(errorHandler)

//Функция для подключения к бд, асинхронная
const start = async () => {

    // try, catch что бы отлавливать потенциальные ошибки
    try {

        // //устанавливаем подключение к бд
        await sequelize.authenticate()
        //
        // //Сверяем состояние бд со схемой данных
        await sequelize.sync()

        //Указываем какой порт должен прослушивать наш сервер, второй параметр callback который сработает при успешном запуске сервера
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

//Стартуем сервер
start()