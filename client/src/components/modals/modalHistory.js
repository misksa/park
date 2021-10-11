import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Modal, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import moment from "moment";

const ModalHistory = observer(({show, onHide, Items}) => {
    const {park} = useContext(Context)
    const {user} = useContext(Context)
    const scrollEndRef = useRef(null)

    const scrollBottom = () => {
        scrollEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
        scrollBottom()
    }, [show]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="contained-modal-title-vcenter">
                    История
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{overflow: 'scroll', width: '49rem', height:'20rem'}}
            >
                <div>
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
                    {park.History.filter(History => History.itemId == Items.id).map(History =>
                        <tr>
                            {user.client.filter(client => client.id == History.userId).map(client =>
                                <td>{client.username}</td>)}
                                <td>{moment(History.createdAt).format('DD-MMM-YYYY HH:mm', 'ru')}</td>
                                <td>{History.action}</td>
                            {History.office?
                                park.office.filter(office => office.id == History.office).map(office =>
                                        <td>{office.name}</td>)
                                            :
                                        <td> </td>
                            }
                            {History.place ?
                                park.place.filter(place => place.id == History.place).map(place =>
                                    <td>{place.name}</td>)
                                :
                                <td></td>
                            }
                            {History.manage ?
                                <td>{History.manage}</td>
                                :
                                <td> </td>
                            }
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
                                <td>  </td>
                            }
                        </tr>
                        )}
                    <div ref={scrollEndRef}></div>
                    </tbody>
                </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>

);
});

export default ModalHistory;