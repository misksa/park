import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {createSubtype, fetchSubtype} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";
import {sendData} from "../../utils/sendData";
import notice from "../../utils/notice";

const ModalAddSubtype = observer(({show, onHide}) => {
    const [name, setName] = useState( '')
    const [file, setFile] = useState(null)
    const {park} = useContext(Context)
    const addSubtype = () => {
        if(file.type.slice('/', 5) !== 'image') {
            notice.Error('Можно загружать только фото')
            return
        }        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)
                    const formData = new FormData()
                    formData.append('name', name)
                    formData.append('typeId', park.SelectedTypeItem.id)
                    formData.append('img', file)
                    createSubtype(formData).then((r)=>{
                        if(r) {
                            fetchSubtype().then(data => {
                                park.SetSubtype(data)
                                park.SetSelectedTypeItem('')
                                setName('')
                                setFile(null)
                            })
                        }
                        clearInterval(timerId)
                        park.setLoad(false)
                    })
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const close = () => {
        park.SetSelectedTypeItem('')
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
                    Добавление нового подтипа техники
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onSubmit={event => event.preventDefault()}
                    onKeyUp={(e) => sendData(e, addSubtype)}
                >
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
                            accept={'image/*'}
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