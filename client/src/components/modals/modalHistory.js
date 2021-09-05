import React, {useContext, useState} from 'react';
import {Button, Modal, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ModalHistory = observer(({show, onHide, Items}) => {
    const {park} = useContext(Context)
    const {user} = useContext(Context)

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
            <Modal.Body>
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
                                <td>{History.createdAt}</td>
                                <td>{History.action}</td>
                            {park.office.filter(office => office.id == History.office).map(office =>
                                        office.name ?
                                        <td>{office.name}</td>
                                            :
                                        <td> </td>
                            )}
                            <td>{History.place}</td>
                            <td>{History.manage}</td>
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
                        </tr>
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>

);
});

export default ModalHistory;