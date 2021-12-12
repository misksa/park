/*Основная страница приложения, где будет таблица с позициями,
 список офисов и мест в офисе, так же типы позиций */
import React, {useContext, useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import PlaceBar from "../components/PlaceBar";
import TypeBar from "../components/TypeBar";
import ParkList from "../components/ParkList/ParkList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {
    fetchItem
} from "../http/parkAPI";
import Search from "../components/Search/Search";
import Pages from "../components/Page";

const Park = observer(() => {
    const {park} = useContext(Context)

    const [loadItems, setLoadItems] = useState(false)

    useEffect( ()=> {
        const setLoad = () => setLoadItems(true)
        const timerId = setInterval(setLoad, 200)
        fetchItem(park.SelectedOffice.id, park.SelectedPlace.id, park.SelectedSubtype.id, park.Page, park.Limit, park.Search).then(data => {
            park.SetItem(data.rows)
            park.SetTotalCount(data.count)
            clearInterval(timerId)
            setLoadItems(false)
        })
    },[park.SelectedOffice, park.SelectedPlace, park.SelectedSubtype, park.Page, park.Search, park])


    return (
        <div className={'container-fluid justify-content-center'} >
            <Search/>
            <Row className={'mt-3'}>
                <Col sm={'auto'}>
                    <PlaceBar />
                </Col>
                <Col md={0} >
                    <ParkList loadItems={loadItems} setLoadItems={setLoadItems} />
                    <Pages/>
                </Col>
                <Col
                    sm={1}
                    className={'ml-5'}
                >
                    <TypeBar />
                </Col>
            </Row>
        </div>
    );
});

export default Park;