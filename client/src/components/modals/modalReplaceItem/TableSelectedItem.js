import React, {useContext} from 'react';
import {Table} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const TableSelectedItem = observer(() => {
    const {park} = useContext(Context)
    return (
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
            {park.SelectedItems.map(SelectedItems =>
                <tr key={SelectedItems.id}>
                    <td>{SelectedItems.name}</td>
                    <td>{SelectedItems.inventory}</td>
                    {park.office.filter(office => office.id === SelectedItems.officeId).map(office =>
                        <td>{office.name}</td>
                    )}
                    {park.place.filter(place => place.id === SelectedItems.placeId).map(place =>
                        <td>{place.name}</td>
                    )}
                    <td>{SelectedItems.manage}</td>
                </tr>
            )}
            </tbody>
        </Table>
    );
});

export default TableSelectedItem;