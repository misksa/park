import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import {Context} from "../../index";
import ItemList from "../ItemList/itemList";
import {observer} from "mobx-react-lite";
import Loader from "../Loader/Loader";
import cl from './ParkList.module.css'
const ParkList = observer(({loadItems}) => {
        const {park} = useContext(Context)

            if(loadItems) {
                return (
                    <Loader />
                )
            }

            return (
                <Row
                    sm={6}
                    className={'d-flex'}
                >
                    {park.Items.map(Items =>
                        <ItemList
                        key={Items.id}
                        Items={Items}
                    >{Items.name}</ItemList>
                    )}
                    {park.Items.length === 0 &&
                    <div className={cl.noItems}>
                        Предметы не найдены!
                    </div>
                    }
                </Row>
            );
})

export default ParkList;