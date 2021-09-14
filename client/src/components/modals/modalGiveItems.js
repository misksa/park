import React, {useContext, useState} from 'react';
import {Modal, Button, FormControl, Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {giveItem, updateItem} from "../../http/parkAPI";

const ModalGiveItems = observer(({ Items, show, onHide }) => {

    const {park} = useContext(Context)
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)

    const giveItems = () => {
        if (file && name) {
            const formData = new FormData()
            formData.append('id', Items.id)
            formData.append('name', name)
            formData.append('img', file)
            giveItem(formData).then(onHide)
        } else {
            alert('При выдаче на руки обязательно нужен акт и указать имя!!!')
        }
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="contained-modal-title-vcenter">
                    Выдать {Items.name} {Items.inventory} на руки сотруднику:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    className={'mt-3'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Введите id имя и фамилию сотрудника'
                />
                <Form.Control
                    className={'mt-3'}
                    type="file"
                    onChange={selectFile}
                />
            </Modal.Body>
            <Modal.Footer>

                <Button variant='outline-success' onClick={giveItems}>Принять</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>


    );
});

export default ModalGiveItems;