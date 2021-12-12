import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form} from "react-bootstrap";
import {fetchUser, registration} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {chooseAccess} from "../../utils/chooseAccess";
import {sendData} from "../../utils/sendData";

const ModalAddUser = observer(({show, onHide}) => {
    const [username, setUsername] = useState( '')
    const [login, setLogin] = useState( '')
    const [access, setAccess] = useState([])
    const [password, setPassword] = useState( '')
    const {park} = useContext(Context)
    const {user} = useContext(Context)

    const addUser = async () => {
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)
        const formData = new FormData()
        formData.append('login', login)
        formData.append('password', password)
        formData.append('officeId', access)
        formData.append('username', username)
        registration(formData).then((r) => {
            if(r) {
                fetchUser().then(data => user.SetClient(data))
                park.SetSelectedOffice('')
            }
            clearInterval(timerId)
            park.setLoad(false)
        })
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
                <Form
                    onSubmit={event => event.preventDefault()}
                    onKeyUp={(e) => sendData(e, addUser)}
                >
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
                    <h4>Доступ к офисам: </h4>
                    {park.office.map(office =>
                        <div
                            key={office.id}
                            className={'d-inline'}
                        >
                        <span
                            className={'ml-2'}
                        >
                            {office.name}</span>
                            <input
                                type={'checkbox'}
                                value={office.id}
                                onChange={(e)=> chooseAccess(e, setAccess, access)}
                            />
                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={addUser}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalAddUser;