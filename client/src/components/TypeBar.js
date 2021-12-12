import React, {useContext} from 'react';

import {Accordion, Card, Button, ListGroupItem} from "react-bootstrap";

import {Context} from "../index";
import {observer} from "mobx-react-lite";

const TypeBar = observer(() => {
    const {park} = useContext(Context)
    return (
        <div className={'d-flex'}>
        <Accordion >
            {park.typeItem.map(typeItem =>
                <Card key={typeItem.id}>
                    <Card.Header>
                        <Accordion.Toggle
                            as={Button}
                            variant="button"
                            eventKey={typeItem.id}
                            key={typeItem.id}
                        >
                            {typeItem.name}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse
                        eventKey={typeItem.id}
                        key={typeItem.id}
                    >
                        <Card.Body className='p-0'>
                            {park.Subtype.filter(Subtype => Subtype.typeId === typeItem.id).map(Subtype =>
                                <ListGroupItem
                                    key={Subtype.id}
                                    active={Subtype.id === park.SelectedSubtype.id}
                                    onClick={() => park.SetSelectedSubtype(Subtype)}
                                    style={{cursor: 'pointer'}}
                                >{Subtype.name}</ListGroupItem>
                            )}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
        </div>
    )
})

export default TypeBar;