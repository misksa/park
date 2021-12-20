import React, {useContext, useState} from 'react';
import {Button, Modal, FormControl} from "react-bootstrap";
import {Context} from "../../index";
import {deletePlace, editPlace, fetchPlace} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";
import DropdownOffice from "../Dropdown/DropdownOffice";
import DropdownPlace from "../Dropdown/DropdownPlace";

const ModalEditPlace = observer(({show, onHide}) => {
    const {park} = useContext(Context)
    const [name, setName] = useState('')
    const DeletePlace = () => {
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)
        deletePlace({placeId: park.SelectedModalPlace.id}).then((r) => {
            if(r) {
                fetchPlace().then(data => {
                    park.SetPlace(data)
                    park.SetSelectedModalPlace('')
                })
            }
            clearInterval(timerId)
            park.setLoad(false)
        })
    }
    const EditPlace = () => {
                    editPlace({name: name, placeId: park.SelectedModalPlace.id}).then((r) => {
                        if(r) {
                            fetchPlace().then(data => {
                                park.SetPlace(data)
                                park.SetSelectedModalPlace('')
                                setName('')
                            })
                        }
                    })
    }
    const close = () => {
        park.SetSelectedModalPlace('')
        park.SetSelectedModalOffice('')
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
                    Выберите КЦ, школу, место что бы удалить или переименовать
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DropdownOffice title={'Выбрать офис'}/>
                <DropdownPlace title={'Выбрать место'}/>
                <FormControl
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={'mt-2'}
                    placeholder='Введите название нового кц'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={EditPlace}>Переименовать</Button>
                <Button variant='outline-danger' onClick={DeletePlace}>Удалить</Button>
                <Button variant='light' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalEditPlace;