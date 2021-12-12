import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form} from "react-bootstrap";
import {createOffice, fetchAuthOffice, fetchPublicOffice} from "../../http/parkAPI";
import {Context} from "../../index";
import {sendData} from "../../utils/sendData";

const ModalAddOffice = ({show, onHide}) => {
    const {park} = useContext(Context)
    const [value, setValue] = useState( '')

    const addOffice = () => {
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)

        createOffice({name: value}).then((r) => {
                if(r) {
                    fetchAuthOffice().then(data => park.SetAuthOffice(data))
                    fetchPublicOffice().then(data => park.SetOffice(data))
                    setValue('')
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
                    Добавление нового офиса
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onSubmit={event => event.preventDefault()}
                    onKeyUp={(e) => sendData(e, addOffice)}
                >
                    <FormControl
                        value={value}
                        onKeyUp={(e) => e.preventDefault()}
                        onChange={(e) => setValue(e.target.value)
                        }
                        placeholder='Введите название нового офиса'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='outline-success'
                    onClick={addOffice}
                >Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddOffice;