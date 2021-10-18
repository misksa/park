import React, {useContext, useState} from 'react';
import {Button, Modal, Dropdown, ButtonGroup, FormControl} from "react-bootstrap";
import {Context} from "../../index";
import {deletePlace, editPlace} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const ModalEditPlace = observer(({show, onHide}) => {
    const {park} = useContext(Context)
    const [name, setName] = useState('')
    const DeletePlace = () => {
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
        }else {
            if (!park.SelectedPlace.id) {
                toast.error('Выбери кц для удаления', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                deletePlace({placeId: park.SelectedPlace.id}).then(data => {
                    onHide()
                    park.SetSelectedPlace('')
                })
            }
    }
    }

    const EditPlace = () => {
        if(!park.SelectedOffice.id) {
            toast.error('Выбери офис', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            if(!park.SelectedPlace.id){
                toast.error('Выбери место для редактирования', {
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
                    toast.error('Введи новое название', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }else{
                    editPlace({name: name, placeId: park.SelectedPlace.id}).then(data => {
                        onHide()
                        park.SetSelectedPlace('')
                        park.SetSelectedOffice('')
                        setName('')
                    })
                }
            }

        }
    }
    const dropStatePark = () => {
        park.SetSelectedOffice('')
        park.SetSelectedPlace('')
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
                    Выберите КЦ, школу, место что бы удалить или переименовать
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Dropdown
                        as={ButtonGroup}
                        className={'ml-1'}
                    >
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
                    <Dropdown
                        as={ButtonGroup}
                        className={'ml-1'}
                    >
                        <Dropdown.Toggle variant={"secondary"}>{park.SelectedPlace.name || 'Выберите кц'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {park.place.filter(place => place.officeId == park.SelectedOffice.id).map(place =>
                                <Dropdown.Item
                                    key={place.id}
                                    onClick={() => park.SetSelectedPlace(place)}
                                >
                                    {place.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
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
                <ToastContainer/>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalEditPlace;