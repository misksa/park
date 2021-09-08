import React, {useContext, useEffect, useState} from 'react';
import {Button, FormControl, Modal, Form, Dropdown, FormLabel} from "react-bootstrap";
import {Context} from "../../index";
import {createPlace, createSubtype, fetchSubtype, fetchType} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";


const ModalAddSubtype = observer(({show, onHide}) => {
    const [name, setName] = useState( '')
    const [file, setFile] = useState(null)
    const {park} = useContext(Context)
    const addSubtype = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('typeId', park.SelectedTypeItem.id)
        formData.append('img', file)
        createSubtype(formData).then(data => onHide())
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
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление нового КЦ типа техники
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle variant={"secondary"}>{park.SelectedTypeItem.name || 'Выберите тип техники'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {park.typeItem.map(typeItem =>
                                <Dropdown.Item
                                    key={typeItem.id}
                                    onClick={() => park.SetSelectedTypeItem(typeItem)}
                                >
                                    {typeItem.name}</Dropdown.Item>

                            )}
                        </Dropdown.Menu>

                    </Dropdown>

                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={'mt-2'}
                        placeholder='Введите название подтипа'
                    />
                    <Form.Group controlId="formFile" className="mb-3 mt-5">
                        <Form.Label>Выберите икнонку для подтипа</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={selectFile}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={addSubtype}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalAddSubtype;