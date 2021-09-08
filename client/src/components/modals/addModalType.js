import React, {useState} from 'react';
import {Button, FormControl, Modal, Form} from "react-bootstrap";
import {createType} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";


const ModalAddType = observer(({show, onHide}) => {
    const [name, setName] = useState( '')
    const addType = () => {
        const formData = new FormData()
        formData.append('name', name)
        createType(formData).then(data => onHide())
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
                <Form>
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