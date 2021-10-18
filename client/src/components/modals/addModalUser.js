import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form, Dropdown} from "react-bootstrap";
import {registration} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ModalAddUser = observer(({show, onHide}) => {
    const [username, setUsername] = useState( '')
    const [login, setLogin] = useState( '')
    const [password, setPassword] = useState( '')
    const {park} = useContext(Context)

    const addUser = () => {
        if(!username) {
            toast.error('Введи имя и фамилию', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else {
            if(!login) {
                toast.error('Введи логин', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else{
                if(!password) {
                    toast.error('Введи пароль', {
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
                    formData.append('login', login)
                    formData.append('password', password)
                    formData.append('role', park.SelectedOffice.id)
                    formData.append('username', username)
                    registration(formData).then(data => onHide())
                    park.SetSelectedOffice('')
                }
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
                    Добавление нового пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                            className={'mt-1'}

                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        placeholder='Логин'
                    />
                    <FormControl
                            className={'mt-1'}

                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Полное имя пользователя'
                    />
                    <FormControl
                            className={'mt-1'}

                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Пароль'
                    />
                    <Dropdown
                        className={'mt-1'}
                    >
                        <Dropdown.Toggle variant={"secondary"}>{park.SelectedOffice.name || 'Выбрать роль'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {park.office.map(office =>
                                <Dropdown.Item
                                    key={office.id}
                                    onClick={() => park.SetSelectedOffice(office)}
                                >
                                    {office.name}</Dropdown.Item>
                            )}
                            <Dropdown.Item>SuperUser</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={addUser}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <ToastContainer/>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalAddUser;