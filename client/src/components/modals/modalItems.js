import React, {useContext, useState} from 'react';

import {Modal, Button, ButtonGroup} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {updateItem} from "../../http/parkAPI";
import ModalMessage from "./modalMessage"
import ModalHistory from "./modalHistory";
import ModalGiveItems from "./modalGiveItems";

const ModalItems = observer(({ Items, show, onHide }) => {

    const {park} = useContext(Context)
    const [manage, setManage] = useState(Items.manage)
    const [modalMessage, setModalMessage] = useState(false)
    const [modalHistory, setModalHistory] = useState(false)
    const [modalGiveItems, setModalGiveItems] = useState(false)




    const itemUpdate = () => {
        updateItem({ manage: manage , id: Items.id, officeId: park.SelectedOffice.id, placeId: park.SelectedModalPlace.id}).then(data =>
            park.SetSelectedModalPlace(''),
            onHide())
    }
    const escFunction = (event) => {
        if (event.keyCode === 27) {
            park.SetSelectedEdit(false)
            setManage(Items.manage)
        }
        if (event.keyCode === 13) {
            park.SetSelectedEdit(false)
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
                <Modal.Title className="contained-modal-title-vcenter">
                        <Dropdown
                            as={ButtonGroup}
                            className={'ml-1'}
                        >
                            <Dropdown.Toggle variant={"light"}>{park.SelectedModalPlace.name || 'Переместить в'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {park.place.filter(place => place.officeId === Items.officeId).map(place =>
                                    <Dropdown.Item
                                        key={place.id}
                                        onClick={() => park.SetSelectedModalPlace(place)}
                                    >
                                        {place.name}</Dropdown.Item>

                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {park.office.filter(office => office.id == Items.officeId).map(office =>
                    <div>Офис: {office.name}</div>
                )}
                {park.place.filter(Place => Place.id == Items.placeId).map(Place =>
                    <div>Место: {Place.name}</div>
                )}
                <div>Сотрудник:
                    {park.SelectedEdit === true ?
                        <input
                            onKeyUp={escFunction}
                            id={'inp'}
                            autoFocus
                            className={'ml-2'}
                            value={manage}
                            onChange={(e) => {
                                setManage(e.target.value)
                            }
                            }
                            onBlur={() => park.SetSelectedEdit(false)}
                        />
                        :
                        <span
                            onClick={() => park.SetSelectedEdit(true)}
                            className={'ml-2'}
                            style={{cursor:'pointer', width: 200}}
                        >
                            {manage}
                            <img
                                className={'ml-2'}
                                style={{cursor: 'pointer'}}
                                width={20}
                                height={20}
                                src={'http://localhost:5000/edit.png'}
                                onClick={() => park.SetSelectedEdit(true) }
                            />
                        </span>
                    }
                </div>
                <div>Название: {Items.name}</div>
                <div>Инвентарный номер: {Items.inventory}</div>
                <div>Серийный номер: {Items.serial}</div>
                <div>Оперативная память: {Items.ram}</div>
                <div>Процессор: {Items.cpu}</div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-warning'} onClick={()=> setModalGiveItems(true)}>Выдать на руки</Button>
                <Button variant='outline-primary' onClick={() => { setModalMessage(true)
                }}
                >Заметка</Button>
                <Button variant='outline-dark' onClick={() => {setModalHistory(true)}}>История</Button>
                <Button variant='outline-success' onClick={itemUpdate}>Принять</Button>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
            <ModalMessage show={modalMessage} Items={Items} onHide={() => setModalMessage(false)} />
            <ModalHistory show={modalHistory} Items={Items} onHide={() => setModalHistory(false)} />
            <ModalGiveItems show={modalGiveItems} Items={Items} onHide={() => setModalGiveItems(false)}/>
        </Modal>


);
});

export default ModalItems;