import React, {useContext} from 'react';
import {ButtonGroup, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DropdownOffice = observer(({title}) => {
    const {park} = useContext(Context
    )
    return (
        <Dropdown
            as={ButtonGroup}
            className={'ml-1'}
        >
            <Dropdown.Toggle
                variant={"light"}
            >
                {park.SelectedModalOffice.name || title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {park.office.map(office =>
                    <Dropdown.Item
                        key={office.id}
                        onClick={() => {park.SetSelectedModalOffice(office)
                            if(park.SelectedModalPlace.officeId !== park.SelectedModalOffice.id) {
                                park.SetSelectedModalPlace('')
                            }
                        }}
                    >
                        {office.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default DropdownOffice;