import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import StatsList from "../components/StatsList/StatsList";
import {
    fetchAuthOffice,
    fetchCount,
    fetchMessage,
    fetchPlace,
    fetchPublicOffice,
    fetchSubtype,
    fetchType
} from "../http/parkAPI";
import {Context} from "../index";




const Stats = observer(() => {
    const {park} = useContext(Context)

    useEffect(()=> {
        fetchPlace().then(data => park.SetPlace(data))
        fetchType().then(data => park.SetTypeItem(data))
        fetchCount().then(data => park.SetCount(data))
        fetchPublicOffice().then(data => park.SetOffice(data))
        fetchAuthOffice().then(data => park.SetAuthOffice(data))
        fetchSubtype().then(data => park.SetSubtype(data))
    }, [park])

    return (
        <div >

            <StatsList/>
        </div>
    );
});

export default Stats;