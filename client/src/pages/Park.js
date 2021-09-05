/*Основная страница приложения, где будет таблица с позициями,
 список офисов и мест в офисе, так же типы позиций */
import React, {useContext, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import PlaceBar from "../components/PlaceBar";
import TypeBar from "../components/TypeBar";
import ParkList from "../components/ParkList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

import {fetchCount, fetchHistory, fetchItem, fetchOffice, fetchPlace, fetchSubtype, fetchType} from "../http/parkAPI";
import {fetchUser} from "../http/userAPI";
import jwt_decode from "jwt-decode";
const Park = observer(() => {

    const {park} = useContext(Context)
    const {user} = useContext(Context)

    const token = localStorage.getItem('accessToken')
    user.SetIAm(jwt_decode(token))

    useEffect(()=> {
        fetchItem().then(data => park.SetItem(data))
        fetchPlace().then(data => park.SetPlace(data))
        fetchType().then(data => park.SetTypeItem(data))
        fetchCount().then(data => park.SetCount(data))
        fetchOffice().then(data => park.SetOffice(data))
        fetchSubtype().then(data => park.SetSubtype(data))
        fetchUser().then(data => user.SetClient(data))
        fetchHistory().then(data => park.SetHistory(data))
        fetchItem(null, null,null).then(data => {
            park.SetItem(data)
        })
    }, [])


    useEffect( ()=> {
        fetchItem(park.SelectedOffice.id, park.SelectedPlace.id, park.SelectedSubtype.id).then(data => {
            park.SetItem(data)
        })

    },[park.SelectedOffice, park.SelectedPlace, park.SelectedSubtype])
    return (
        <Container fluid>
            <Row className={'mt-3'}>
                <Col md={"auto"}>
                    <PlaceBar />
                </Col>
                <Col md={8} >
                    <ParkList/>
                </Col>
                <Col
                    md={"auto"}
                    className={'ml-5'}
                >
                    <TypeBar />
                </Col>
            </Row>

        </Container>
    );
});

export default Park;