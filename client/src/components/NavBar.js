import React, {useContext, useState} from 'react';

import {Context} from "../index";

import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";

import Button from "react-bootstrap/Button";
import {ADMIN_ROUTE, LOGIN_ROUTE, PARK_ROUTE, STATS_ROUTE} from "../utils/consts";

import {observer} from "mobx-react-lite";

import {useHistory} from 'react-router-dom';
import {Logout} from "../http/userAPI";
import ModalReplaceItems from "./modals/modalReplaceItem/modalReplaceItems";


const NavBar = observer(() => {
    //Получаем UserPark из контекста
    const {park} = useContext(Context)
    const {user} = useContext(Context)
    const history = useHistory()
    const LogOut = () => {
        Logout()
        user.SetUser({})
        user.setIsAuth(false)
        history.push(LOGIN_ROUTE)
    }
    const [modalReplaceItems, setModalReplaceItems] = useState(false)
    return (
            <div id={'NavBar'}>
                    <Navbar bg="dark" variant="dark">
                        <Nav.Link id={'NavLink'}
                            style={{color: 'white', fontsize: 50}}
                            onClick={() => {
                                history.push(PARK_ROUTE)
                                park.SetSelectedOffice('')
                                park.SetSelectedPlace('')
                                park.SetSelectedSubtype('')
                            }}
                        >
                            На главную парка</Nav.Link>
                        {park.replaceItems ?
                            <Button
                                variant={'outline-light'}
                                onClick={() => {
                                    park.SetSelectedItems([])
                                    park.SetReplaceItems(false)
                                }
                                }
                            >
                                Отменить
                            </Button>
                            :
                            <Button
                                variant={'outline-light'}
                                onClick={() => park.SetReplaceItems(true)}
                            >
                                Выбрать предметы
                            </Button>
                        }
                        {park.replaceItems &&
                            <div
                                style={{color:'white', cursor:'pointer'}}
                                className={'ml-2'}
                                onClick={() => setModalReplaceItems(true)}
                            >
                                Выбрано: {park.SelectedItems.length}
                            </div>
                        }
                        <Nav className="ml-auto">
                            <div
                                className={'mr-5 mt-2'}
                                style={{color: 'white'}}
                            >
                                {user.User.username}
                            </div>
                            <Button
                                className={'mr-2'}
                                variant={"outline-light"}
                                onClick={() => {
                                    history.push(STATS_ROUTE)
                                    park.SetSelectedOffice('')
                                    park.SetSelectedPlace('')
                                    park.SetSelectedSubtype('')
                                }}
                            >Статистика</Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() => {
                                    history.push(ADMIN_ROUTE)
                                    park.SetSelectedOffice('')
                                    park.SetSelectedPlace('')
                                    park.SetSelectedSubtype('')
                                }}
                            >Админ панель</Button>
                            <Button
                                variant={"outline-light"}
                                className={'ml-2'}
                                onClick={LogOut}
                            >Выйти</Button>
                        </Nav>
                    </Navbar>
                <ModalReplaceItems show={modalReplaceItems} onHide={() => setModalReplaceItems(false)}/>
            </div>
    )
})


export default NavBar;