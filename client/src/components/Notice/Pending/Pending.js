import React, {useContext} from 'react';
import cl from './pengind.module.css'
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const pe = observer(() => {
    const {park} = useContext(Context)

    if(park.Load) {

        return  (
            <div
                className={cl.div}
            >
                <div
                    className={cl.content}
                >
                    <Spinner
                        className={cl.spinner}
                        animation={'border'}
                        variant={'secondary'}
                    />

                    <span
                        className={cl.text}
                    >Загрузка...</span>
                </div>
            </div>
        )
    }
    return (
        <div></div>
    )
    })

export default pe;