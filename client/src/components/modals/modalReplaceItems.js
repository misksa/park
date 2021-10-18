import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {Button, ButtonGroup, Dropdown, Form, Modal, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {replaceOffice} from "../../http/parkAPI";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ModalReplaceItems = observer(({show, onHide}) => {
    const {park} = useContext(Context)
    const [file, setFile] = useState(null)
    const [cycle, setCycle] = useState(false)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeOffice = () => {
        let SelectItem = []

        SelectItem = park.Items.filter(items => items.check === true)

        const idSelectItems = SelectItem.map(SelectItem => SelectItem.id)
        const officeIdSelectItems = SelectItem.map(SelectItem => SelectItem.officeId)

       for(let i = 0; i < officeIdSelectItems.length; i++ ) {
            if(i !== 0){
                if(officeIdSelectItems[i] !== officeIdSelectItems[i-1]){
                    setCycle(false)
                    break
                } else {
                    setCycle(true)
                    break
                }
            }
        }
        if(officeIdSelectItems.length === 1) {
            setCycle(true)
        }
       if(!idSelectItems.length){
           toast.error('Выбери какие предметы переместить', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
           });
       } else {
               if(!park.SelectedModalOffice.id){
                   toast.error('Выбери офис', {
                       position: "top-right",
                       autoClose: 5000,
                       hideProgressBar: true,
                       closeOnClick: true,
                       pauseOnHover: true,
                       draggable: true,
                       progress: undefined,
                   });
               } else {
                   if(!park.SelectedModalPlace.id){
                       toast.error('Выбери место в офиссе', {
                           position: "top-right",
                           autoClose: 5000,
                           hideProgressBar: true,
                           closeOnClick: true,
                           pauseOnHover: true,
                           draggable: true,
                           progress: undefined,
                       });
                   } else {
                       if(!file){
                           toast.error('Загрузи акт приема передачи', {
                               position: "top-right",
                               autoClose: 5000,
                               hideProgressBar: true,
                               closeOnClick: true,
                               pauseOnHover: true,
                               draggable: true,
                               progress: undefined,
                           });
                       } else {
                           if(officeIdSelectItems.reduce((currentValue) => currentValue == park.SelectedModalOffice.id) ) {
                               toast.error('Предмет уже в этом офисе', {
                                   position: "top-right",
                                   autoClose: 5000,
                                   hideProgressBar: true,
                                   closeOnClick: true,
                                   pauseOnHover: true,
                                   draggable: true,
                                   progress: undefined,
                               });
                           } else {
                               if(!cycle){
                                   toast.error('Нельзя перемещать предметы из разных офисов в один', {
                                       position: "top-right",
                                       autoClose: 5000,
                                       hideProgressBar: true,
                                       closeOnClick: true,
                                       pauseOnHover: true,
                                       draggable: true,
                                       progress: undefined,
                                   });
                               } else {
                               const formData = new FormData()
                               formData.append('id', idSelectItems)
                               formData.append('officeId', park.SelectedModalOffice.id)
                               formData.append('placeId', park.SelectedModalPlace.id)
                               formData.append('img', file)
                               replaceOffice(formData).then(data => onHide(), park.SetSelectedModalOffice(''), park.SetSelectedModalPlace(''), setFile(null))
                           }
                       }
                   }
               }
           }
       }

        }
    const closeModal = () => {
        onHide()
        park.SetSelectedModalOffice('')
        park.SetSelectedModalPlace('')
    }

    if(park.SelectedModalPlace.officeId !== park.SelectedModalOffice.id) {
        park.SetSelectedModalPlace('')
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
                    <Dropdown
                        as={ButtonGroup}
                        className={'ml-1'}
                    >
                        <Dropdown.Toggle
                            variant={"light"}
                        >
                            {park.SelectedModalOffice.name || 'Переместить в'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {park.office.map(office =>
                                <Dropdown.Item
                                    key={office.id}
                                    onClick={() => park.SetSelectedModalOffice(office)}
                                >
                                    {office.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                        as={ButtonGroup}
                        className={'ml-1'}
                    >
                            <Dropdown.Toggle variant={"light"}>{park.SelectedModalPlace.name || 'Переместить в'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {park.place.filter(place => place.officeId === park.SelectedModalOffice.id).map(place =>
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
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Название</th>
                            <th>Инвентарник</th>
                            <th>Офис</th>
                            <th>Место</th>
                            <th>Менеджер</th>
                        </tr>
                        </thead>
                        <tbody>
                        {park.Items.filter(items => items.check === true).map(items =>
                            <tr>
                                <td>{items.name}</td>
                                <td>{items.inventory}</td>
                                {park.office.filter(office => office.id == items.officeId).map(office =>
                                    <td>{office.name}</td>
                                )}
                                {park.place.filter(place => place.id == items.placeId).map(place =>
                                    <td>{place.name}</td>
                                )}
                                <td>{items.manage}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
            </Modal.Body>
            <Modal.Footer>
                <div className={'d-flex'}>
                    <Form.Control
                    placeholder={'Загрузить акт'}
                    type="file"
                    onChange={selectFile}
                />
                </div>

                <Button variant='outline-success' onClick={changeOffice}>Переместить</Button>
                <Button variant='outline-danger' onClick={closeModal}
                >Закрыть</Button>
                <ToastContainer/>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalReplaceItems;