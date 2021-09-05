import React, {useContext} from 'react';
import {Button, Modal, Dropdown, DropdownButton, ButtonGroup} from "react-bootstrap";
import {Context} from "../../index";
import {deletePlace} from "../../http/parkAPI";
import {observer} from "mobx-react-lite";


const ModalDeletePlace = observer(({show, onHide}) => {
    const {park} = useContext(Context)
    const DeletePlace = () => {
        deletePlace({placeId: park.SelectedPlace.id}).then(data => {
            onHide()
            park.SetSelectedPlace('')
        })
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
                    Удаление КЦ, школы или места в офисе
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
                        <Dropdown.Toggle variant={"secondary"}>{park.SelectedPlace.name || 'Выберите кц'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {park.place.filter(place => place.officeId == park.SelectedOffice.id).map(place =>
                                <Dropdown.Item
                                    key={place.id}
                                    onClick={() => park.SetSelectedPlace(place)}
                                >
                                    {place.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={DeletePlace}>Удалить</Button>
                <Button variant='light' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalDeletePlace;