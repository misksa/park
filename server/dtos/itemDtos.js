module.exports = class itemDto {
    id;
    name;
    serial;
    inventory;
    manage;
    cpu;
    ram;
    placeId;
    subtypeId;
    officeId;
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.serial = model.serial
        this.inventory = model.inventory
        this.manage = model.manage
        this.cpu = model.cpu
        this.ram = model.ram
        this.placeId = model.placeId
        this.subtypeId = model.subtypeId
        this.officeId = model.officeId
    }
}