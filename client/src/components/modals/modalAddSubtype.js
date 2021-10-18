import React, {useContext, useEffect, useState} from 'react';
import {Button, FormControl, Modal, Form, Dropdown, FormLabel} from "react-bootstrap";
import {Context} from "../../index";
import { createSubtype} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ModalAddSubtype = observer(({show, onHide}) => {
    const [name, setName] = useState( '')
    const [file, setFile] = useState(null)
    const {park} = useContext(Context)
    const addSubtype = () => {
        if(!park.SelectedTypeItem.id) {
            toast.error('Выбери тип', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            if(!name) {
                toast.error('Введи название подтипа', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                if(!file){
                    toast.error('Загрузи иконку подтипа', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }else{
                    const formData = new FormData()
                    formData.append('name', name)
                    formData.append('typeId', park.SelectedTypeItem.id)
                    formData.append('img', file)
                    createSubtype(formData).then(data => onHide(), park.SetSelectedTypeItem(''))
                }
            }
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
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление нового подтипа техники
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
                <ToastContainer/>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalAddSubtype;