import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Badge} from "react-bootstrap";
import ModalItems from "./modals/modalItems";
import {Context} from "../index";
import {fetchSubtype} from "../http/parkAPI";
import {observer} from "mobx-react-lite";

const ItemList = observer(({Items}) => {
    useEffect(()=> {
        fetchSubtype().then(data => park.SetSubtype(data))
    }, [])

    const [modalItem, setModalItem] = useState(false)
    const [checked, setChecked] = useState(false)
    const {park} = useContext(Context)

    const chooseItem = (Items) => {
        Items.check = !checked;
    }

    return (

        <Col md={4} className='mt-3 '>
            <Card>
                <div className='d-flex justify-content-end align-items-center ml-2 mt-1'>
                    <Badge
                        className='mr-4'
                        style={{cursor: 'pointer'}}
                        variant='success'
                        >На месте</Badge>
                    <div className='d-flex mb-4'>
                        {park.replaceItems ?
                            <input
                                key={Items.id}
                                type={'checkbox'}
                                className='mr-2'
                                checked={checked}
                                onChange={()=> {
                                    setChecked(!checked)
                                    chooseItem(Items)
                                }
                                }
                                id={Items.id}
                            />
                            :
                            <div>
                            </div>
                        }

                    </div>
                </div>
                <Card.Body
                    style={{cursor:'pointer'}} className='p-1'
                    onClick={() => {
                        setModalItem(true)
                    }}
                >
                    <div className='d-flex'>
                        {park.Subtype.filter(subtype => subtype.id === Items.subtypeId).map(subtype =>
                        <img width={30} height={30} src={'http://localhost:5000/'+ subtype.img} />
                    )}
                        <div className='ml-1'>{Items.name}</div>
                    </div>
                    <div>Инвентарный №: {Items.inventory}</div>
                    <div>Менеджер: {Items.manage}</div>
                </Card.Body>
            </Card>
            <ModalItems show={modalItem} Items={Items} onHide={() => setModalItem(false)} />
        </Col>

    );
})

export default ItemList;