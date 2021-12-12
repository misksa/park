import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import cl from './StatsList.module.css'
const StatsList = observer(() => {

    const {park} = useContext(Context)
    return (
        <div>
            {park.authOffice.map(office =>
                <div key={office.id} className={cl.BlockOffice}>
                    <span className={cl.OfficeName}>{office.name}</span>
                    {park.Subtype.map(subtype =>
                        <div key={subtype.id} className={cl.SubtypeBlock}>
                            <span className={cl.SubtypeName}>{subtype.name} </span>
                            <div className={cl.placeBlock}>
                            {park.place.filter(place => place.officeId === office.id).map(place =>
                                <div key={place.id}>
                                    <span>{place.name}: </span>
                                    {park.Count.filter(count => count.officeId === office.id && count.placeId === place.id && count.subtypeId === subtype.id).map(count =>
                                        <span key={count.id} className={cl.count} >{count.count} шт</span>
                                    )}
                                </div>
                            )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

export default StatsList;