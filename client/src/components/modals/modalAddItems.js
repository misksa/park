import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form, Dropdown, ButtonGroup} from "react-bootstrap";
import {createItem, fetchItem} from "../../http/parkAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {sendData} from "../../utils/sendData";
import DropdownOffice from "../Dropdown/DropdownOffice";
import DropdownPlace from "../Dropdown/DropdownPlace";

const ModalAddItems = observer(({show, onHide}) => {
    const {park} = useContext(Context)
    const [name, setName] = useState('')
    const [inventory, setInventory] = useState('')
    const [serial, setSerial] = useState('')
    const [manage, setManage] = useState('')
    const [cpu, setCpu] = useState('')
    const [ram, setRam] = useState('')



    const AddItems = () => {
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)
        const formData = new FormData()
        formData.append('name', name)
        formData.append('inventory', inventory)
        formData.append('serial', serial)
        formData.append('manage', manage)
        formData.append('cpu', cpu)
        formData.append('ram', ram)
        formData.append('officeId', park.SelectedOffice.id)
        formData.append('placeId', park.SelectedPlace.id)
        formData.append('subtypeId', park.SelectedSubtype.id)
        createItem(formData).then(r =>{
           if(r){
               fetchItem().then(data => {
                   park.SetItem(data.rows)
                   park.SetTotalCount(data.count)
                   park.SetSelectedOffice('')
                   park.SetSelectedPlace('')
                   park.SetSelectedSubtype('')
                   setName('')
                   setInventory('')
                   setSerial('')
                   setManage('')
                   setCpu('')
                   setRam('')
               })
           }
            clearInterval(timerId)
            park.setLoad(false)
        })
    }
    const close = () => {
        park.SetSelectedOffice('')
        park.SetSelectedPlace('')
        park.SetHistoryModal('')
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
                    Добавить новый предмет
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DropdownOffice title={'Выбрать офис'}/>
                <DropdownPlace title={'Выбрать место'}/>
                <Form
                    onSubmit={event => event.preventDefault()}
                    onKeyUp={(e) => sendData(e, AddItems)}
                >
                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={'Введите название модели предмета'}
                        className={'mt-2'}
                    />
                    <FormControl
                        value={serial}
                        onChange={e => setSerial(e.target.value)}

                        placeholder={'Введите серийный номер'}
                        className={'mt-2'}
                    />
                    <FormControl
                        value={inventory}
                        onChange={e => setInventory(e.target.value)}
                        placeholder={'Введите инвентарный номер'}
                        className={'mt-2'}
                    />
                    <FormControl
                        value={manage}
                        onChange={e => setManage(e.target.value)}
                        placeholder={'Введите id и Имя сотрудника за кем закреплен предмет'}
                        className={'mt-2'}
                    />
                    {park.SelectedSubtype.name === 'Ноутбуки' ?
                        <div>
                            <FormControl
                                value={cpu}
                                onChange={e => setCpu(e.target.value)}
                                placeholder={'Введите информацию о процессоре'}
                                className={'mt-2'}
                            />
                            <FormControl
                                value={ram}
                                onChange={e => setRam(e.target.value)}
                                placeholder={'Введите информацию о оперативной памяти'}
                                className={'mt-2'}
                            />
                        </div>
                            :
                        <></>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={AddItems}>Добавить</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalAddItems;