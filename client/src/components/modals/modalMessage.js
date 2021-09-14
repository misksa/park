import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import {Modal, Button, FormControl, Row, Col, Table} from "react-bootstrap";
import {createMessage, fetchMessage} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";
import moment from "moment";

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
            <Modal.Body
                style={{overflow: 'scroll', width: '49rem', height:'20rem'}}
            >
                <Table striped bordered hover size="sm"

                >
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
                        <td>{moment(History.createdAt).format('DD-MMM-YYYY HH:mm', 'ru')}</td>
                        <td>{Message.remark}</td>
                        </tr>
                    )}
                    <div ref={scrollEndRef}></div>
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