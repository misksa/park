import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import {Modal, Button, FormControl, Row, Col, Form, Card} from "react-bootstrap";
import {createMessage, fetchMessage} from "../../../http/parkAPI";
import {observer} from "mobx-react-lite";
import moment from "moment";
import {sendData} from "../../../utils/sendData";
import cl from './modalMessage.module.css'

const ModalMessage = observer(({Items, show, onHide}) => {
    const {park} = useContext(Context)
    const {user} = useContext(Context)
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        createMessage({remark: message, itemId: Items.id})
            .then(r =>{
            if(r){
                fetchMessage().then(data => {
                    park.SetMessage(data)
                    setMessage('')
                })
            }
        })
    }
    return (
        <Modal
            show={show}
            size={'lg'}
            onHide={onHide}
            centered
        >
            <Modal.Header
                closeButton
                className={cl.MessageModalHeader}
            >
                <Modal.Title
                    className={cl.MessageModalTitle}
                >
                    <Form
                        className={cl.MessageForm}
                        onSubmit={event => event.preventDefault()}
                        onKeyUp={(e) => sendData(e, sendMessage)}
                    >
                        <FormControl
                            as={'textarea'}
                            className={cl.MessageInput}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={'Введите сообщение'}
                        />
                        <Button
                            variant="success" onClick={sendMessage}
                            className={'mt-2'}
                        >
                            Отправить
                        </Button>
                    </Form>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
               className={cl.MessageBody}
            >
                {park.Message.filter(Message => Message.itemId === Items.id).map(Message =>
                    <Card
                        key={Message.id}
                        className={cl.MessageBlock}>
                    {user.Client.filter(client => client.id === Message.userId).map(client =>
                        <Row
                        key={client.id}
                        >
                            <Col sm={3}>
                                <div
                                    className={cl.MessageUserName}
                                >{client.username}</div>
                                <div
                                    className={cl.MessageTime}
                                >{moment(Message.createdAt).format('DD-MMM-YYYY HH:mm', 'ru')}</div>
                            </Col>
                            <Col className={'justify-content-center'} md={9}>
                                {Message.remark}
                            </Col>
                        </Row>
                    )}
                        </Card>
                )}
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