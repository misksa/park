import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {createPlace} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";


const ModalAddPlace = observer(({show, onHide}) => {
    const [name, setName] = useState( '')

    const {park} = useContext(Context)
    const addPlace = () => {
        // const formData = new FormData()
        // formData.append('name', name)
        // formData.append('officeId', park.SelectedOffice.id)
        createPlace({name: name, officeId: park.SelectedOffice.id}).then(data => onHide())
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
            </Modal.Footer>
        </Modal>
    );
});

export default ModalAddPlace;