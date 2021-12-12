import React from 'react';
import {observer} from "mobx-react-lite";
import StatsList from "../components/StatsList/StatsList";




const Stats = observer(() => {

    return (
        <div >

            <StatsList/>
        </div>
    );
});

export default Stats;