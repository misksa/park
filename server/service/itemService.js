// const {item} = require('../models/models')
// class itemService {
//     async getAll(officeId, placeId, subtypeId) {
//
//         //Берем значение переменных из запроса
//         //Создаем переменную Item куда будем записывать значение в завимости от условия
//         let Item;
//         //Проверяем условие если officeId  и placeId не существуют т.е. равно NULL
//         if(!officeId && !placeId && !subtypeId) {
//                 //То выводим все ноуты
//                 Item = await item.findAll()
//         }
//
//         //Проверяем условие если и placeId не существуют т.е. равно NULL, а officeId имеет какое-либо значение
//         if(officeId && !placeId && !subtypeId) {
//
//             //То выводим записи ноуты со всеми совпадающими значениями officeId
//             Item = await item.findAll({where: {officeId}})
//
//         }
//         //Проверяем условие если и officeId не существуют т.е. равно NULL, а placeId имеет какое-либо значение
//         if(!officeId && placeId && !subtypeId) {
//
//             //То выводим записи ноуты со всеми совпадающими значениями placeId
//             Item = await item.findAll({where:{placeId}})
//
//         }
//
//         //Проверяем условие если и officeId и placeId имеет какое-либо значение
//         if(!officeId && !placeId && subtypeId) {
//
//             //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//             Item = await item.findAll({where:{subtypeId}})
//
//         }
//         if(!officeId && placeId && subtypeId) {
//
//             //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//             Item = await item.findAll({where:{placeId, subtypeId}})
//
//         }
//         if(officeId && !placeId && subtypeId) {
//
//             //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//             Item = await item.findAll({where:{officeId, subtypeId}})
//
//         }
//         if(officeId && placeId && !subtypeId) {
//
//             //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//             Item = await item.findAll({where:{officeId, placeId}})
//
//         }
//
//         if(officeId && placeId && subtypeId) {
//             //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//             Item = await item.findAll({where:{officeId, placeId, subtypeId}})
//         }
//
//         //Возвращаем ответ в json формате
//         return Item
//     }
//     async getOne (officeId, placeId,subtypeId, UserDto) {
//
//         //Берем значение переменных из запроса
//
//         //Создаем переменную Item куда будем записывать значение в завимости от условия
//         let Item;
//             //Проверяем условие если officeId  и placeId не существуют т.е. равно NULL
//             if(!officeId && !placeId && !subtypeId) {
//                 //То выводим все ноуты
//                 Item = await item.findAll({where: {officeId: UserDto.role}})
//             }
//
//             //Проверяем условие если и placeId не существуют т.е. равно NULL, а officeId имеет какое-либо значение
//             if(officeId && !placeId && !subtypeId) {
//
//                 //То выводим записи ноуты со всеми совпадающими значениями officeId
//                 Item = await item.findAll({where: {officeId: UserDto.role}})
//
//             }
//             //Проверяем условие если и officeId не существуют т.е. равно NULL, а placeId имеет какое-либо значение
//             if(!officeId && placeId && !subtypeId) {
//
//                 //То выводим записи ноуты со всеми совпадающими значениями placeId
//                 Item = await item.findAll({where:{placeId:placeId, officeId: UserDto.role}})
//
//             }
//
//             //Проверяем условие если и officeId и placeId имеет какое-либо значение
//             if(!officeId && !placeId && subtypeId) {
//
//                 //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//                 Item = await item.findAll({where:{subtypeId: subtypeId, officeId: UserDto.role}})
//
//             }
//             if(!officeId && placeId && subtypeId) {
//
//                 //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//                 Item = await item.findAll({where:{placeId: placeId, subtypeId: subtypeId, officeId: UserDto.role}})
//
//             }
//             if(officeId && !placeId && subtypeId) {
//
//                 //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//                 Item = await item.findAll({where:{officeId: UserDto.role, subtypeId: subtypeId}})
//
//             }
//             if(officeId && placeId && !subtypeId) {
//
//                 //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//                 Item = await item.findAll({where:{officeId: UserDto.role, placeId: placeId}})
//
//             }
//
//             if(officeId && placeId && subtypeId) {
//                 //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
//                 Item = await item.findAll({where:{officeId: UserDto.role, placeId, subtypeId}})
//             }
//
//             //Возвращаем ответ в json формате
//             return Item
//     }
// }
// module.exports = new itemService()