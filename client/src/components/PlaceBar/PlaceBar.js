import React, {useContext} from 'react';

import {Context} from "../../index";

import {Accordion, Card, Button, ListGroupItem} from "react-bootstrap";

import {observer} from "mobx-react-lite";
import cl from './PlaceBar.module.css'

const PlaceBar = observer(() => {
    const {park} = useContext(Context)
    return (
        <div className={'d-flex'}>
                <Accordion>
                    {park.authOffice.map(office =>
                        <Card key={office.id}>
                            <Card.Header>
                                <Accordion.Toggle
                                    className={cl.Toggle}
                                    as={Button}
                                    variant="button"
                                    active={office.id === park.SelectedOffice.id}
                                    onClick={() => {
                                        park.SetSelectedOffice(office)
                                        park.SetSelectedPlace('')
                                    }
                                    }
                                    eventKey={office.id}
                                    key={office.id}
                                >
                                    {office.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse
                                eventKey={office.id}
                                key={office.id}
                            >
                                <Card.Body className='p-0'>
                                    {park.place.filter(place => place.officeId === office.id).map(place =>
                                        <ListGroupItem
                                            key={place.id}
                                            active={place.id === park.SelectedPlace.id}
                                            onClick={() => park.SetSelectedPlace(place)}
                                            style={{cursor: 'pointer'}}
                                        >{place.name}</ListGroupItem>
                                    )}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )}
                </Accordion>
        </div>

    )
})
export default PlaceBar;