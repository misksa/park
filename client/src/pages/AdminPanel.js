import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, ButtonGroup, Row, Col} from "react-bootstrap";
import ModalAddPlace from "../components/modals/modalAddPlace";
import ModalAddItems from "../components/modals/modalAddItems";
import ModalAddOffice from "../components/modals/modalAddOffice";
import ModalAddSubtype from "../components/modals/modalAddSubtype";
import {fetchOffice, fetchPlace, fetchSubtype, fetchType} from "../http/parkAPI";
import {Context} from "../index";
import ModalDeletePlace from "../components/modals/modalDeletePlace";
import ModalAddUser from "../components/modals/addModalUser";
import ModalDeleteUser from "../components/modals/deleteModalUser";
const AdminPanel = () => {

    const {park} = useContext(Context)
    const {user} = useContext(Context)
    const [addPlaceVisible, setAddPlaceVisible ] = useState(false)
    const [addPCVisible, setAddPCVisible ] = useState(false)
    const [addOfficeVisible, setAddOfficeVisible] = useState(false)
    const [addSubtypeVisible, setAddSubtypeVisible] = useState(false)
    const [deletePlaceVisible, setDeletePlaceVisible ] = useState(false)
    const [addUser, setAddUser] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)

    useEffect(()=> {
        fetchPlace().then(data => park.SetPlace(data))
        fetchOffice().then(data => park.SetOffice(data))
        fetchType().then(data => park.SetTypeItem(data))
        fetchSubtype().then(data => park.SetSubtype(data))
    }, [])
    return (
        <Container className='mt-2 ml-1'>
            {user.iAm.role === 'superuser' ?
                <Row>
                    <Col md={2}>
                        <ButtonGroup vertical>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setAddOfficeVisible(true)}
                            >
                                Добавить офис</Button>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setAddUser(true)}
                            >
                                Добавить пользователя</Button>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setDeleteUser(true)}
                            >
                                Удалить пользователя</Button>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setAddPlaceVisible(true)}
                            >
                                Добавить КЦ</Button>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setDeletePlaceVisible(true)}
                            >
                                Удалить КЦ</Button>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setAddSubtypeVisible(true)}
                            >
                                Добавить подтип техники</Button>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setAddPCVisible(true)}
                            >
                                Добавить предмет</Button>
                        </ButtonGroup>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                :
                <Row>
                    <Col md={2}>
                        <ButtonGroup vertical>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setAddPCVisible(true)}
                            >
                                Добавить предмет</Button>
                        </ButtonGroup>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            }
            <ModalAddPlace show={addPlaceVisible} onHide={() => setAddPlaceVisible(false)} />
            <ModalAddItems show={addPCVisible} onHide={() => setAddPCVisible(false)} />
            <ModalAddOffice show={addOfficeVisible} onHide={() => setAddOfficeVisible(false)} />
            <ModalAddSubtype show={addSubtypeVisible} onHide={() => setAddSubtypeVisible(false)} />
            <ModalDeletePlace show={deletePlaceVisible} onHide={() => setDeletePlaceVisible(false)} />
            <ModalAddUser show={addUser} onHide={() => setAddUser(false)} />
            <ModalDeleteUser show={deleteUser} onHide={() => setDeleteUser(false)} />

        </Container>



    );
};

export default AdminPanel;