const {office, subtype, item, place} = require("../models/models");
const accessService = require("../service/accessService");
const { Op } = require("sequelize");

class CountService {
    async count (User) {
        try {
            let Count = []
            let Office
            if(User.role === 'admin') {
                const Access = await accessService.officeAccess(User.id)
                Office = await office.findAll({
                    where: {
                        [Op.or]: Access
                    }
                })
            } else {
                Office = await office.findAll()
            }

            const officeId = Office.map(Office => Office.id)
            const officeIdForPlace = officeId.map(OfficeId => OfficeId = {officeId : OfficeId}  )
            const Subtype = await subtype.findAll()
            const subtypeId = Subtype.map(Subtype => Subtype.id)
            const Place = await place.findAll({where: {
                    [Op.or] : officeIdForPlace
                }})
            const placeId = Place.map(place => place.id)
            for (let z = 0; z < officeId.length; z++) {
                for (let i = 0; i < subtypeId.length; i++) {
                    for(let x = 0; x < placeId.length; x++) {
                    let itemCount = await item.count({where: {
                            subtypeId: subtypeId[i],
                            officeId: officeId[z],
                            placeId: placeId[x]
                        }})
                    let object = {
                        officeId: officeId[z],
                        subtypeId: subtypeId[i],
                        placeId: placeId[x],
                        count: itemCount,
                    }
                    Count.push(object)
                    }
                }
            }
            return Count
        } catch (e) {
            throw e
        }
    }
}
module.exports = new CountService()