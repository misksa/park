/*Этот файл, компонент с авторизацией, тут создаем страницу для вход */
import React, {useContext, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Card, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {PARK_ROUTE} from "../utils/consts";
import notice from "../utils/notice";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()

    const signIn = async () => {
        const data = await Login(login, password)
        if (data.data.status === 204 || data.data.status === 404 ) {
         notice.Error(data.data.message)
        } else {
            localStorage.setItem('accessToken', data.data.accessToken)
            console.log(data.data.User)
            user.SetUser(data.data.User)
            user.setIsAuth(true)
            history.push(PARK_ROUTE)
        }
    }

    return (
       <Container
           className={'d-flex justify-content-center align-items-center'}
           // Задаем высоту контейнера и получае её от высоты всего браузера минус высоты панели навбара
           style={{height: window.innerHeight-54}}
       >
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