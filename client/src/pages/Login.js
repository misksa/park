/*Этот файл, компонент с авторизацией, тут создаем страницу для вход */
import React, {useContext, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Card, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory, useLocation} from "react-router-dom";
import {PARK_ROUTE} from "../utils/consts";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()
    const signIn = async () => {
            const data = await Login(login, password)
            console.log(data)
            console.log(data.data.status)
            if(data.data.accessToken) {
                localStorage.setItem('accessToken', data.data.accessToken)
                user.SetUser(data)
                user.setIsAuth(true)
                history.push(PARK_ROUTE)
            } else {
                toast.error(data.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
    }

    return (
       <Container
           className={'d-flex justify-content-center align-items-center'}
           // Задаем высоту контейнера и получае её от высоты всего браузера минус высоты панели навбара
           style={{height: window.innerHeight-54}}
       >
           <ToastContainer

           />
           <Card style={{width: 600}} className={'p-5'}>
               <h2 className={'m-auto'} >Login</h2>
               <Form className={'d-flex flex-column'}>
                   <Form.Control
                       value={login}
                       onChange={e => setLogin(e.target.value)}
                       className={'mt-3'}
                       placeholder={'Введите логин'}
                   />
                   <Form.Control
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       className={'mt-3'}
                       placeholder={'Введите пароль'}
                       type={'password'}
                   />
                   <Button
                       onKeyPress={signIn}
                       className={'mt-3 align-self-end'}
                       variant={"outline-success"}
                       onClick={signIn}
                   >Войти</Button>
               </Form>
           </Card>
       </Container>
    );
});

export default Auth;