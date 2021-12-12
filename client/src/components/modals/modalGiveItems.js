import React, {useContext, useState} from 'react';
import {Modal, Button, FormControl, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchItem, giveItem} from "../../http/parkAPI";
import {Context} from "../../index";
import notice from "../../utils/notice";
import {sendData} from "../../utils/sendData";

const ModalGiveItems = observer(({ Items, show, onHide }) => {
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)

    const {park} = useContext(Context)
    const giveItems = () => {
        if(file.type.slice('/', 5) !== 'image') {
            notice.Error('Можно загружать только фото')
            return
        }
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)
        const formData = new FormData()
        formData.append('id', Items.id)
        formData.append('name', name)
        formData.append('img', file)
        giveItem(formData).then((r)=> {
            if(r) {
                fetchItem().then(data => {
                    park.SetItem(data.rows)
                    park.SetTotalCount(data.count)
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
    return (
        <Form
            onSubmit={event => event.preventDefault()}
            onKeyUp={(e) => sendData(e, giveItems)}
        >
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="contained-modal-title-vcenter">
                    Выдать {Items.name} {Items.inventory} на руки сотруднику:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{ width: '49rem', height:'20rem'}}
            >
                <FormControl
                    className={'mt-3'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Введите id имя и фамилию сотрудника'
                />
                <Form.Control
                    className={'mt-3'}
                    type="file"
                    accept={'image/*'}
                    onChange={selectFile}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={giveItems}>Принять</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
        </Form>
    );
});

export default ModalGiveItems;