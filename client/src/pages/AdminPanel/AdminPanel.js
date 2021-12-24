import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, ButtonGroup, Row, Col} from "react-bootstrap";
import ModalAddPlace from "../../components/modals/modalAddPlace";
import ModalAddItems from "../../components/modals/modalAddItems";
import ModalAddOffice from "../../components/modals/modalAddOffice";
import ModalAddSubtype from "../../components/modals/modalAddSubtype";
import {Context} from "../../index";
import ModalEditPlace from "../../components/modals/modalEditPlace";
import ModalAddUser from "../../components/modals/addModalUser";
import ModalDeleteUser from "../../components/modals/deleteModalUser";
import ModalAddType from "../../components/modals/addModalType";
import TableHistory from "../../components/tableHistory/tableHistory";
import {observer} from "mobx-react-lite";
import cl from './AdminPanel.module.css'
import {
    fetchAuthOffice,
    fetchPlace, fetchPublicOffice,
    fetchSubtype,
    fetchType
} from "../../http/parkAPI";
import {fetchUser} from "../../http/userAPI";

const AdminPanel = observer(() => {
    const {user} = useContext(Context)

    const {park} = useContext(Context)

    const [addPlaceVisible, setAddPlaceVisible ] = useState(false)
    const [addPCVisible, setAddPCVisible ] = useState(false)
    const [addOfficeVisible, setAddOfficeVisible] = useState(false)
    const [addSubtypeVisible, setAddSubtypeVisible] = useState(false)
    const [deletePlaceVisible, setDeletePlaceVisible ] = useState(false)
    const [addUser, setAddUser] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const [addTypeVisible, setAddTypeVisible] = useState(false)

    useEffect(()=> {
        fetchPlace().then(data => park.SetPlace(data))
        fetchType().then(data => park.SetTypeItem(data))
        fetchAuthOffice().then(data => park.SetAuthOffice(data))
        fetchPublicOffice().then(data => park.SetOffice(data))
        fetchSubtype().then(data => park.SetSubtype(data))
        fetchUser().then(data => user.SetClient(data))
    }, [park])

    return (
        <Container
            fluid
            // className={' d-flex ml-3'}
        >
            {user.User.role === 'superuser' ?
                    <Row md={3}>
                        <Col xl={2} lg={2} md={2}>
                        <ButtonGroup
                            vertical
                            className={cl.button}
                        >
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
                                Редактировать/удалить КЦ</Button>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setAddTypeVisible(true)}
                            >
                                Добавить тип техники</Button>
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
                        <Col
                            xl={10} lg={10} md={10} xs={2} sm={1}
                            // md={'auto'}
                        >
                            <TableHistory />
                        </Col>
                        </Row>
                :
                        <Row>
                         <Col>
                        <ButtonGroup vertical>
                            <Button
                                variant={'secondary'}
                                className='mt-1'
                                onClick={() => setAddPCVisible(true)}
                            >
                                Добавить предмет</Button>
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
                                Редактировать/удалить КЦ
                            </Button>
                        </ButtonGroup>
                         </Col>
                        </Row>
            }
            <ModalAddPlace show={addPlaceVisible} onHide={() => setAddPlaceVisible(false)} />
            <ModalAddItems show={addPCVisible} onHide={() => setAddPCVisible(false)} />
            <ModalAddOffice show={addOfficeVisible} onHide={() => setAddOfficeVisible(false)} />
            <ModalAddSubtype show={addSubtypeVisible} onHide={() => setAddSubtypeVisible(false)} />
            <ModalEditPlace show={deletePlaceVisible} onHide={() => setDeletePlaceVisible(false)} />
            <ModalAddUser show={addUser} onHide={() => setAddUser(false)} />
            <ModalDeleteUser show={deleteUser} onHide={() => setDeleteUser(false)} />
            <ModalAddType show={addTypeVisible} onHide={() => setAddTypeVisible(false)} />
        </Container>
    );
});

export default AdminPanel;