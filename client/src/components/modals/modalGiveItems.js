import React, { useState} from 'react';
import {Modal, Button, FormControl, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {giveItem} from "../../http/parkAPI";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ModalGiveItems = observer(({ Items, show, onHide }) => {
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)

    const giveItems = () => {
        if (file && name) {
            const formData = new FormData()
            formData.append('id', Items.id)
            formData.append('name', name)
            formData.append('img', file)
            giveItem(formData).then(data => onHide()).then(setName(''), setFile(null))
        } else {
          toast.error('Укажи имя фамилию сотрудника и загрузи акт приема-передачи', {
             position: "top-right",
             autoClose: 5000,
             hideProgressBar: true,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
          })
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
            <Modal.Body
                style={{ width: '49rem', height:'20rem'}}
            >
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
            <ToastContainer/>
        </Modal>


    );
});

export default ModalGiveItems;