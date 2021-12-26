//Компонент выбора места в офисе
import React, {useContext} from 'react';
import {ButtonGroup, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DropdownPlace = observer(({title}) => {
    const {park} = useContext(Context)
    return (
        <Dropdown
            as={ButtonGroup}
            className={'ml-1'}
        >
            <Dropdown.Toggle variant={"light"}>{park.SelectedModalPlace.name || title }</Dropdown.Toggle>
            <Dropdown.Menu>
                {park.place.filter(place => place.officeId === park.SelectedModalOffice.id).map(place =>
                    <Dropdown.Item
                        key={place.id}
                        onClick={() => park.SetSelectedModalPlace(place)}
                    >
                        {place.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default DropdownPlace;