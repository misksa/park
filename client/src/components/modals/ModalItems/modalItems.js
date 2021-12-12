import React, {useContext, useState} from 'react';
import {Modal, Button, ButtonGroup} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchHistory, fetchItem, updateItem} from "../../../http/parkAPI";
import ModalMessage from "../ModalMessage/modalMessage"
import ModalHistory from "../ModalHistory/modalHistory";
import ModalGiveItems from "../modalGiveItems";
import DropdownPlaceItem from "./DropdownPlaceItem";
import ModalBodyItem from "./ModalBodyItem";

const ModalItems = observer(({Items, show, onHide }) => {

    const {park} = useContext(Context)
    const [manage, setManage] = useState('')
    const [modalMessage, setModalMessage] = useState(false)
    const [modalHistory, setModalHistory] = useState(false)
    const [modalGiveItems, setModalGiveItems] = useState(false)

    const itemUpdate = () => {
        const setLoading = () => {park.setLoad(true)}
        const timerId = setInterval(setLoading, 200)
            updateItem({ manage: manage , id: Items.id, placeId: park.SelectedModalPlace.id}).then((r)=>{
                if(r) {
                    fetchItem().then(data => {
                        park.SetItem(data.rows)
                        park.SetSelectedModalPlace('')
                        setManage('')
                    })
                }
                clearInterval(timerId)
                park.setLoad(false)
                })
    }

    const close = () => {
        park.SetSelectedOffice('')
        park.SetSelectedModalPlace('')
        setManage('')
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
                <Modal.Title className="contained-modal-title-vcenter">
                <DropdownPlaceItem Items={Items}/>
                </Modal.Title>
            </Modal.Header>
            <ModalBodyItem Items={Items} manage={manage} setManage={setManage} />
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