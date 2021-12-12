import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {createPlace, fetchPlace} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";
import {sendData} from "../../utils/sendData";
import DropdownOffice from "../Dropdown/DropdownOffice";

const ModalAddPlace = observer(({show, onHide}) => {
    const [name, setName] = useState( '')

    const {park} = useContext(Context)
    const addPlace = () => {
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)
        const formData = new FormData()
        formData.append('name', name)
        formData.append('officeId', park.SelectedOffice.id)
        createPlace(formData).then((r)=>{
            if(r) {
                fetchPlace().then(data => {
                    park.SetPlace(data)
                    park.SetSelectedOffice('')
                })
            }
            clearInterval(timerId)
            park.setLoad(false)
        })
    }
    const close = () => {
        park.SetSelectedOffice('')
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            onExit={close}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление нового КЦ, школы или места в офисе
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onSubmit={event => event.preventDefault()}
                    onKeyUp={(e) => sendData(e, addPlace)}
                >
                <DropdownOffice title={'Выбрать офис'}/>
                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={'mt-2'}
                        placeholder='Введите название места в офисе'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={addPlace}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalAddPlace;