import React, {useContext, useState} from 'react';
import cl from "./ModalItems.module.css";
import {Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const ModalBodyItem = observer(({Items, manage, setManage}) => {
    const {park} = useContext(Context)

    const escFunction = (event) => {
        if (event.keyCode === 27) {
            park.SetSelectedEdit(false)
            // setManage(Items.manage)
        }
        if (event.keyCode === 13) {
            park.SetSelectedEdit(false)
        }
    }

    return (
        <Modal.Body
        >
            {park.office.filter(office => office.id === Items.officeId).map(office =>
                <div key={office.id}><span className={cl.ModalSpanName}>Офис: </span> <span className={cl.ModalSpanItems}>{office.name}</span></div>
            )}
            <hr className={cl.modalHr} />
            {park.place.filter(Place => Place.id === Items.placeId).map(Place =>
                <div key={Place.id}><span className={cl.ModalSpanName}>Место: </span> <span className={cl.ModalSpanItems} >{Place.name}</span></div>
            )}
            <hr className={cl.modalHr} />
            <div><span className={cl.ModalSpanName}>Сотрудник: </span>

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
                            <span className={cl.ModalSpanItems} >{manage || Items.manage}</span>
                            <img
                                className={'ml-2'}
                                style={{cursor: 'pointer'}}
                                width={20}
                                height={20}
                                src={'http://localhost:5000/edit.png'}
                                onClick={() => park.SetSelectedEdit(true) }
                                alt={'Редактировать'}/>
                        </span>
                }
            </div>
            <hr className={cl.modalHr} />
            <div><span className={cl.ModalSpanName}>Название: </span><span className={cl.ModalSpanItems} >{Items.name}</span></div>
            <hr className={cl.modalHr} />
            <div><span className={cl.ModalSpanName}>Инвентарный номер: </span><span className={cl.ModalSpanItems} >{Items.inventory}</span></div>
            <hr className={cl.modalHr} />
            <div><span className={cl.ModalSpanName}>Серийный номер: </span><span className={cl.ModalSpanItems} >{Items.serial}</span> </div>
            <hr className={cl.modalHr} />
            <div><span className={cl.ModalSpanName}>Оперативная память: </span><span className={cl.ModalSpanItems} >{Items.ram}</span></div>
            <hr className={cl.modalHr} />
            <div><span className={cl.ModalSpanName}>Процессор: </span><span className={cl.ModalSpanItems} >{Items.cpu}</span> </div>
        </Modal.Body>
    );
});

export default ModalBodyItem;