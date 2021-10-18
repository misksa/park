import React, {useContext} from 'react';
import {Button, Modal, Dropdown} from "react-bootstrap";
import {deleteUser, registration} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ModalDeleteUser = observer(({show, onHide}) => {
    const {user} = useContext(Context)

    const deleteClient = () => {
        if(!user.SelectedClient.id) {
            toast.error('Выбери пользователя', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
        const formData = new FormData()
            formData.append('id', user.SelectedClient.id)
            deleteUser(formData).then(data => onHide())
            user.SetSelectedClient('')
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
                    Добавление нового пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Dropdown
                        className={'mt-1'}
                    >
                        <Dropdown.Toggle variant={"secondary"}>{user.SelectedClient.username || 'Выбрать пользователя'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {user.client.map(client =>
                                <Dropdown.Item
                                    key={client.id}
                                    onClick={() => user.SetSelectedClient(client)}
                                >
                                    {client.username}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={deleteClient}>Удалить</Button>
                <Button variant='light' onClick={onHide}>Закрыть</Button>
                <ToastContainer/>

            </Modal.Footer>
        </Modal>
    );
});

export default ModalDeleteUser;