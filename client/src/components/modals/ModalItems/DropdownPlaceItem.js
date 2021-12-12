import React, {useContext} from 'react';
import {ButtonGroup, Dropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const DropdownPlaceItem = observer(({Items}) => {
    const {park} = useContext(Context)
    return (
        <Dropdown
            as={ButtonGroup}
            className={'ml-1'}
        >
            <Dropdown.Toggle variant={"light"}>{park.SelectedModalPlace.name || 'Переместить'}</Dropdown.Toggle>
            <Dropdown.Menu>
                {park.place.filter(place => place.officeId === Items.officeId && place.id !== Items.placeId).map(place =>
                    <Dropdown.Item
                        key={place.id}
                        onClick={() => park.SetSelectedModalPlace(place)}
                    >
                        {place.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default DropdownPlaceItem;