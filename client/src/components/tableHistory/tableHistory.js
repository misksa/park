import React, {useContext, useEffect, useRef, useState} from 'react';
import {Table} from "react-bootstrap";
import moment from "moment";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchHistory} from "../../http/parkAPI";
import {getPageCount, } from "../../utils/pages";
import {useObserver} from "../../utils/useObserver";
import cl from './TableHistory.module.css'

const TableHistory = observer(() => {
    const {park} = useContext(Context)
    const [isLoadHistory, setIsLoadHistory] = useState(false)
    const lastElement = useRef()
    const totalCount = getPageCount(park.totalCountHistory, park.LimitHistory)


    useObserver(lastElement, park.PageHistory < totalCount, isLoadHistory, () =>{
        park.SetPageHistory(park.PageHistory + 1)
    })

    useEffect(()=>{
        setIsLoadHistory(true)
        fetchHistory( park.PageHistory, park.LimitHistory).then((data) => {
            park.SetHistory([...park.History, ...data.rows])
            park.SetTotalCountHistory(data.count)
            setIsLoadHistory(false)
        })
    }, [park.PageHistory])

    return (
        <Table
            striped bordered hover size="sm"
            className={cl.Table}
        >
                <thead>
                <tr>
                    <th  className={cl.td} >Админ</th>
                    <th className={cl.td} >Время</th>
                    <th  className={cl.td} >Действие</th>
                    <th  className={cl.td} >Предмет</th>
                    <th  className={cl.td} >Офис</th>
                    <th className={cl.td} >Место</th>
                    <th className={cl.td} >Менеджер</th>
                    <th  className={cl.td} >Акт</th>
                </tr>
                </thead>
                <tbody>
                {park.History.map(History =>
                    <tr key={History.id}>
                        <td className={cl.td} >{History.user}</td>
                        <td className={cl.td} >{moment(History.createdAt).format('DD-MMM-YYYY HH:mm', 'ru')}</td>
                        <td className={cl.td} >{History.action}</td>
                        <td className={cl.td} >{History.nameItem}: {History.inventory}</td>
                        {History.officeId ?
                            park.office.filter(office => office.id === History.officeId).map(office =>
                                <td className={cl.td} key={office.name}>{office.name}</td>)
                            :
                            <td/>
                        }
                        {History.place ?
                            <td className={cl.td} >{History.place}</td>
                                :
                            <td/>
                        }
                        {History.manage ?
                            <td className={cl.td} >{History.manage}</td>
                                :
                            <td/>
                        }
                        {History.img ?
                            <td
                                className={cl.img}
                            >
                                <a
                                    rel="noopener noreferrer"
                                    target={"_blank"}
                                    href={'http://localhost:5000/'+ History.img}><img
                                    width={30}
                                    height={30}
                                    src={'http://localhost:5000/'+ History.img}
                                 alt={'Акт приема передачи'}/></a></td>
                            :
                            <td/>
                        }
                    </tr>
                )}
                <div ref={lastElement}/>
                </tbody>
            </Table>
    );
});

export default TableHistory;