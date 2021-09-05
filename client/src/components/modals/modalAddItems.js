import React, {useContext, useState} from 'react';
import {Button, FormControl, Modal, Form, Dropdown, ButtonGroup} from "react-bootstrap";
import {createItem} from "../../http/parkAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ModalAddItems = observer(({show, onHide}) => {
    const {park} = useContext(Context)
    const [name, setName] = useState('')
    const [inventory, setInventory] = useState('')
    const [serial, setSerial] = useState('')
    const [manage, setManage] = useState('')
    const [cpu, setCpu] = useState('')
    const [ram, setRam] = useState('')
    const AddItems = () => {
        createItem({name:name, inventory:inventory, serial:serial, manage:manage, cpu:cpu, ram:ram, officeId: park.SelectedOffice.id, placeId:park.SelectedPlace.id, subtypeId: park.SelectedSubtype.id})
            .then(data => setName(''), setInventory(''), setSerial(''), setManage(''), setCpu(''), setRam(''), onHide())
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый предмет
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown
                    as={ButtonGroup}
                        className={'ml-1'}
                >
                    <Dropdown.Toggle variant={"secondary"}>{park.SelectedOffice.name || 'Выберите офис'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {park.office.map(office =>
                            <Dropdown.Item
                                key={office.id}
                                onClick={() => park.SetSelectedOffice(office)}
                            >
                                {office.name}</Dropdown.Item>

                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown
                    as={ButtonGroup}
                    className={'ml-1'}
                >
                    <Dropdown.Toggle variant={"secondary"}>{park.SelectedPlace.name || 'Выберите место'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {park.place.filter(place => place.officeId === park.SelectedOffice.id).map(place =>
                            <Dropdown.Item
                                key={place.id}
                                onClick={() => park.SetSelectedPlace(place)}
                            >
                                {place.name}</Dropdown.Item>

                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown
                    as={ButtonGroup}
                    className={'ml-1'}
                >
                        <Dropdown.Toggle variant={"secondary"}>{park.SelectedSubtype.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {park.Subtype.map(Subtype =>
                                <Dropdown.Item
                                    key={Subtype.id}
                                    onClick={() => park.SetSelectedSubtype(Subtype)}
                                >
                                    {Subtype.name}</Dropdown.Item>

                            )}
                        </Dropdown.Menu>
                </Dropdown>
                <Form>
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
                        <div></div>}
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