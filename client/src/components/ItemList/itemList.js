import React, {useContext, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import ModalItems from "../modals/ModalItems/modalItems";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import BadgeStatusPlace from "../badgeStatusPlace";
import notice from "../../utils/notice";
import {choseItems} from "../../utils/chooseItems";
import cl from './ItemList.module.css'

const ItemList = observer(({Items}) => {
    const {park} = useContext(Context)

    const [modalItem, setModalItem] = useState(false)

    const chooseItems = (e) => {
        if(e.target.checked) {
            park.SetSelectedItems([...park.SelectedItems, Items])
            if (park.SelectedItems.length >= 2) {
                if(choseItems(park.SelectedItems)){
                    notice.Error('Нельзя переносить предметы из двух разных офисов в один')
                    park.SetSelectedItems(park.SelectedItems.filter(SelectedItems => SelectedItems.id !== Items.id))
                }
            }
        } else {
            park.SetSelectedItems(park.SelectedItems.filter(SelectedItems => SelectedItems.id !== Items.id))
        }
    }

    return (
        <Col
        className={'mt-2'}
        >
            <Card
                className={cl.ItemBody}
            >
                <div>
                    <BadgeStatusPlace Items={Items} />
                        {park.replaceItems &&
                            <input
                                key={Items.id}
                                type={'checkbox'}
                                className={cl.input}
                                onChange={(e)=> {
                                    chooseItems(e)
                                }
                                }
                            />
                        }
                    </div>
                <Card.Body
                    style={{cursor:'pointer'}} className='p-1'
                    onClick={() => {
                        setModalItem(true)
                    }}
                >
                    <div className='d-flex'>
                        {park.Subtype.filter(subtype => subtype.id === Items.subtypeId).map(subtype =>
                        <img key={subtype.id} width={30} height={30} src={'http://localhost:5000/'+ subtype.img}  alt={'Акт'}/>
                    )}
                        <div className='ml-1'>{Items.name}</div>
                    </div>
                    <div>№ {Items.inventory}</div>
                    <div>{Items.manage}</div>
                </Card.Body>
                <ModalItems show={modalItem} Items={Items} onHide={() => setModalItem(false)} />
            </Card>
        </Col>
    );
})

export default ItemList;