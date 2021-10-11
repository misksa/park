import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Container, ButtonGroup, Row, Col, Card, Table} from "react-bootstrap";
import ModalAddPlace from "../components/modals/modalAddPlace";
import ModalAddItems from "../components/modals/modalAddItems";
import ModalAddOffice from "../components/modals/modalAddOffice";
import ModalAddSubtype from "../components/modals/modalAddSubtype";
import {fetchOffice, fetchPlace, fetchSubtype, fetchType} from "../http/parkAPI";
import {Context} from "../index";
import moment from "moment"
import ModalEditPlace from "../components/modals/modalEditPlace";
import ModalAddUser from "../components/modals/addModalUser";
import ModalDeleteUser from "../components/modals/deleteModalUser";
import ModalAddType from "../components/modals/addModalType";
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
    const [addTypeVisible, setAddTypeVisible] = useState(false)

    useEffect(()=> {
        fetchPlace().then(data => park.SetPlace(data))
        fetchOffice().then(data => park.SetOffice(data))
        fetchType().then(data => park.SetTypeItem(data))
        fetchSubtype().then(data => park.SetSubtype(data))
    }, [])

    const scrollEndRef = useRef(null)

    const scrollBottom = () => {
        scrollEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
        scrollBottom()
    }, []);

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
                    <Col md={10}>
                        <Card style={{ float:'right'
                        }}>
                            <Card.Body>
                                <Card.Title>Последние изменения в парке</Card.Title>
                                <Card.Text
                                    style={{overflow: 'scroll', width: '50rem', height:'20rem'}}

                                >
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                        <tr>
                                            <th>Админ</th>
                                            <th>Время</th>
                                            <th>Действие</th>
                                            <th>Офис</th>
                                            <th>Место</th>
                                            <th>Менеджер</th>
                                            <th>Акт</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {park.History.map(History =>
                                            <tr>
                                                {user.client.filter(client => client.id == History.userId).map(client =>
                                                    <td>{client.username}</td>)}
                                                <td>{moment(History.createdAt).format('DD-MMM-YYYY HH:mm', 'ru')}</td>
                                                <td>{History.action}</td>
                                                {History.office ?
                                                    park.office.filter(office => office.id == History.office).map(office =>
                                                        <td>{office.name}</td>)
                                                    :
                                                    <td></td>
                                                }
                                                {History.place ?
                                                    park.place.filter(place => place.id == History.place).map(place =>
                                                        <td>{place.name}</td>)
                                                    :
                                                    <td></td>
                                                }
                                                <td>{History.manage}</td>
                                                {History.img ?
                                                    <td
                                                        style={{cursor:'pointer'}}
                                                    >
                                                        <a
                                                            target={"_blank"}
                                                            href={'http://localhost:5000/'+ History.img}><img
                                                            width={30}
                                                            height={30}
                                                            src={'http://localhost:5000/'+ History.img}
                                                        /></a></td>
                                                    :
                                                    <td></td>
                                                }

                                            </tr>
                                        )}
                                        <div ref={scrollEndRef}></div>
                                        </tbody>
                                    </Table>
                                </Card.Text>
                            </Card.Body>
                        </Card>
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
            <ModalEditPlace show={deletePlaceVisible} onHide={() => setDeletePlaceVisible(false)} />
            <ModalAddUser show={addUser} onHide={() => setAddUser(false)} />
            <ModalDeleteUser show={deleteUser} onHide={() => setDeleteUser(false)} />
            <ModalAddType show={addTypeVisible} onHide={() => setAddTypeVisible(false)} />
        </Container>
    );
};

export default AdminPanel;