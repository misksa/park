import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {createPlace} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ModalAddPlace = observer(({show, onHide}) => {
    const [name, setName] = useState( '')

    const {park} = useContext(Context)
    const addPlace = () => {
        if(!park.SelectedOffice.id){
            toast.error('Выбери офис', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            if(!name){
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
                createPlace({name: name, officeId: park.SelectedOffice.id}).then(data => onHide())
                park.SetSelectedOffice('')
            }
        }
    }
    const dropStatePark = () => {
        park.SetSelectedOffice('')
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            onExit={dropStatePark}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление нового КЦ, школы или места в офисе
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle variant={"secondary"}>{park.SelectedOffice.name || 'Выберите офис'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        {park.office.map(office =>
                                <Dropdown.Item
                                    key={office.id}
                                    onClick={() => park.SetSelectedOffice(office)}
                                >
                                    {office.name}</Dropdown.Item>

                            )}
                        </Dropdown.Menu>

                    </Dropdown>
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
                <ToastContainer/>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalAddPlace;