import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import cl from './ModalHistory.module.css'
import { fetchOneHistory} from "../../../http/parkAPI";
import TableHistoryModal from "./TableHistoryModal";

const ModalHistory = observer(({show, onHide, Items}) => {

    const [isLoad, setIsLoad] = useState(false)

    const [history, setHistory] = useState([])

    const [totalCount, setTotalCount] = useState(null)

    const [page, setPage] = useState(1)

    const limit = 15

    useEffect(()=>{
        setIsLoad(true)
        fetchOneHistory(Items.id, page, limit).then((data) => {
            setHistory([...history, ...data.rows])
            setTotalCount(data.count)
            setIsLoad(false)
        })

    }, [page])

    useEffect(()=>{
        fetchOneHistory(Items.id, page, limit).then(data => {
            setHistory(data.rows)
            setTotalCount(data.count)
        })
    }, [])


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="contained-modal-title-vcenter">
                    История
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                className={cl.ModalBody}
            >
                    <TableHistoryModal history={history} page={page} setPage={setPage} limit={limit} totalCount={totalCount} setTotalCount={setTotalCount} isLoad={isLoad} Items={Items}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>

);
});

export default ModalHistory;