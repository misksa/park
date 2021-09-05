import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import {Context} from "../index";
import ItemList from "./itemList";
import {observer} from "mobx-react-lite";

const ParkList = observer(() => {
        const {park} = useContext(Context)
        return (
            <Row className='d-flex'>
                {park.Items.map(Items =>
                <ItemList
                    key={Items.id}
                    Items={Items}
                >{Items.name}</ItemList>
                )}
            </Row>
        );
})


export default ParkList;