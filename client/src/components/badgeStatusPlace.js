import React from 'react';
import {Badge} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {editStatus} from "../http/parkAPI";

const BadgeStatusPlace = observer(({Items}) => {
    const changeStatus = (Items) => {
        if (Items.placeStatus < 3) {
            Items.placeStatus++
            editStatus({id: Items.id, placeStatus: Items.placeStatus})
        } else {
            Items.placeStatus = 1
            editStatus({id: Items.id, placeStatus: Items.placeStatus})
        }
        console.log(Items.placeStatus)
    }
    let placeholder
    let color
    if(Items.placeStatus === 1) {
        placeholder = 'На месте'
        color = 'success'
    }
    if(Items.placeStatus === 2) {
        placeholder = 'Выдан на руки'
        color = 'warning'
    }
    if(Items.placeStatus === 3) {
        placeholder = 'Не найден'
        color = 'danger'
    }

    return (
        <Badge
            key={Items.id}
            onClick={()=>changeStatus(Items)}
            className='mr-4'
            style={{cursor: 'pointer'}}
            variant={color}
        >{placeholder}</Badge>
    );
});

export default BadgeStatusPlace;
