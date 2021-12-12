import React, {useContext} from 'react';
import {Button, Modal, Dropdown} from "react-bootstrap";
import {deleteUser, fetchUser} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const ModalDeleteUser = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const {park} = useContext(Context)

    const deleteClient = () => {
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)


        const formData = new FormData()
            formData.append('id', user.SelectedClient.id)
            deleteUser(formData).then((r)=>{
                if(r) {
                    fetchUser().then(data => {
                        user.SetClient(data)
                        user.SetSelectedClient('')
                    })
                }
                clearInterval(timerId)
                park.setLoad(false)
            })
        }
        const close = () => {
            user.SetSelectedClient('')
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
                    Добавление нового пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Dropdown
                        className={'mt-1'}
                    >
                        <Dropdown.Toggle variant={"secondary"}>{user.SelectedClient.username || 'Выбрать пользователя'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                            {user.Client.map(client =>
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
            </Modal.Footer>
        </Modal>
    );
});

export default ModalDeleteUser;