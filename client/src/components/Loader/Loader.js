import React from 'react';
import {Spinner} from "react-bootstrap";
import cl from './Loader.module.css'
const Loader = () => {
    return (
        <div
            className={cl.container}
        >
            <Spinner
                animation={"border"}
                className={cl.content}
            />
        </div>
);
}


export default Loader;