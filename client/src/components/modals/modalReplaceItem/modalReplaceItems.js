import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import {Button, ButtonGroup, Dropdown, Form, Modal, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchItem, replaceOffice} from "../../../http/parkAPI";
import {sendData} from "../../../utils/sendData";
import notice from "../../../utils/notice";
import TableSelectedItem from "./TableSelectedItem";
import DropdownOffice from "../../Dropdown/DropdownOffice";
import DropdownPlace from "../../Dropdown/DropdownPlace";

const ModalReplaceItems = observer(({show, onHide}) => {
    const {park} = useContext(Context)
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeOffice = () => {
        if(file.type.slice('/', 5) !== 'image') {
            notice.Error('Можно загружать только фото')
            return
        }
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)
        const idSelectItems = park.SelectedItems.map(SelectItem => SelectItem.id)
            const formData = new FormData()
            formData.append('id', idSelectItems)
            formData.append('officeId', park.SelectedModalOffice.id)
            formData.append('placeId', park.SelectedModalPlace.id)
            formData.append('img', file)
            replaceOffice(formData).then((r)=>{
                console.log(r)
                if(r){
                    fetchItem(park.Page, park.Limit).then(data => {
                        park.SetItem(data.rows)
                        park.SetTotalCount(data.count)
                        park.SetSelectedModalOffice([])
                        park.SetSelectedModalPlace([])
                        setFile(null)
                        park.SetSelectedItems([])
                    })
                }
                clearInterval(timerId)
                park.setLoad(false)
            })
    }

    const close = () => {
        park.SetSelectedOffice('')
        park.SetSelectedPlace('')
        setFile(null)
    }

    return (
        <Form
            onSubmit={event => event.preventDefault()}
            onKeyUp={(e) => sendData(e, replaceOffice)}
        >
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            onExit={close}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <DropdownOffice title={'Переместить в '}/>
                    <DropdownPlace title={'Переместить в'}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <TableSelectedItem/>
            </Modal.Body>
            <Modal.Footer>
                <div className={'d-flex'}>
                    <Form
                        onSubmit={event => event.preventDefault()}
                    >
                        <Form.Control
                            placeholder={'Загрузить акт'}
                            type="file"
                            accept={'image/*'}
                            onChange={selectFile}
                        />
                    </Form>
                </div>
                <Button variant='outline-success' onClick={changeOffice}>Переместить</Button>
                <Button variant='outline-danger' onClick={onHide}
                >Закрыть</Button>
            </Modal.Footer>
        </Modal>
        </Form>
    );
});

export default ModalReplaceItems;