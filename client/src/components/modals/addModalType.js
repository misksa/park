import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form} from "react-bootstrap";
import {createType, fetchType} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {sendData} from "../../utils/sendData";



const ModalAddType = observer(({show, onHide}) => {
    const [name, setName] = useState( '')
    const {park} = useContext(Context)
    const addType = async () => {
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)

        const formData = new FormData()
        formData.append('name', name)
        createType(formData).then((r) => {
            if(r) {
                fetchType().then(data => park.SetTypeItem(data))
                setName('')
            }
            clearInterval(timerId)
            park.setLoad(false)
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление нового типа техники
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onSubmit={event => event.preventDefault()}
                    onKeyUp={(e) => sendData(e, addType)}
                >
                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={'mt-2'}
                        placeholder='Введите название типа'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={addType}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalAddType;