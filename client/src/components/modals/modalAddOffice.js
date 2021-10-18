import React, {useState} from 'react';
import {Button, FormControl, Modal, Form} from "react-bootstrap";
import {createOffice} from "../../http/parkAPI";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ModalAddOffice = ({show, onHide}) => {
    const [value, setValue] = useState( '')

    const addOffice = () => {
        if(!value) {
            toast.error('Введи имя', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            createOffice({name: value}).then(data => {
                setValue('')
                onHide()
            })
        }
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
                    Добавление нового офиса
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Введите название нового офиса'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={addOffice}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <ToastContainer/>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddOffice;