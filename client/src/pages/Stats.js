import React, {useContext} from 'react';
import {Accordion, Button, Card, Container, ListGroupItem, Table} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Stats = observer(() => {
    const {park} = useContext(Context)
    const {user} = useContext(Context)

    return (
        <Container className={'mt-3'}>
            {user.iAm.role === 'superuser' ?
                <Accordion>
                    {park.office.map(office =>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle
                                    as={Button}
                                    variant="button"
                                    active={office.id === park.SelectedOffice.id}
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
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        {park.Subtype.map(subtype =>
                                            <tr key={subtype.id}>
                                                <td key={subtype.id}>
                                                    {subtype.name}
                                                </td>
                                                {park.Count.filter(count => count.subtypeId === subtype.id && count.officeId === office.id).map(count =>
                                                    <td key={count.subtypeId}>
                                                        {count.count + ' шт'}
                                                    </td>
                                                )}
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )}
                </Accordion>
                :
                <Accordion>
                    {park.office.filter(office => office.id == user.iAm.role).map(office =>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle
                                    as={Button}
                                    variant="button"
                                    active={office.id === park.SelectedOffice.id}
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
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        {park.Subtype.map(subtype =>
                                            <tr key={subtype.id}>
                                                <td key={subtype.id}>
                                                    {subtype.name}
                                                </td>
                                                {park.Count.filter(count => count.subtypeId === subtype.id && count.officeId === office.id).map(count =>
                                                    <td key={count.subtypeId}>
                                                        {count.count + ' шт'}
                                                    </td>
                                                )}
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )}
                </Accordion>
                }
        </Container>

    );
});

export default Stats;