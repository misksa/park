import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Modal, Button, FormControl, Row, Col, Table} from "react-bootstrap";
import {createMessage, fetchMessage} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";

const ModalMessage = observer(({Items, show, onHide}) => {
    const {park} = useContext(Context)
    const {user} = useContext(Context)
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        createMessage({remark: message, itemId: Items.id})
            .then(data => setMessage(''))
    }
        useEffect(() =>{
            fetchMessage().then(data => park.SetMessage(data))
        },[park.SelectedMessage])


    const date = park.Message.filter(message => message.itemId === Items.id).map(message => message.createdAt)

    console.log(date)


    return (
        <Modal
            show={show}
            size={'lg'}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <Row>
                        <Col md={7}>
                            <FormControl
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={'Введите сообщение'}
                            />
                        </Col>
                       <Col>
                           <Button variant="success" onClick={sendMessage}>
                               Отправить
                           </Button>
                       </Col>
                    </Row>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Админ</th>
                        <th>Время</th>
                        <th>Заметка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {park.Message.filter(Message => Message.itemId === Items.id).map(Message =>
                        <tr>
                        {user.client.filter(client => client.id === Message.userId).map(client =>
                            <td>{client.username}</td>
                        )}
                        <td>{Message.createdAt}</td>
                        <td>{Message.remark}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide} >
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalMessage;