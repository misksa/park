import React, {createContext} from 'react';
import ReactDOM from 'react-dom';

import './index.css';


import App from './App';

// import reportWebVitals from './reportWebVitals';

//Импортируем UserPark
import UserPark from './park/UserPark'

//Импортируем Park
import Park from "./park/DevicePark";

//Создаем контекст реакта и экспортируем его
export  const Context = createContext(null)
ReactDOM.render(
    //Оборачиваем приложение в Context.Provider
    <Context.Provider value={{

        //Передаем объект и создаем новый объект класса UserStore
        user: new UserPark(),
        park: new Park()

    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
