import React, {useContext, useEffect, useRef, useState} from 'react';
import {Table} from "react-bootstrap";
import moment from "moment";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchHistory} from "../http/parkAPI";
import {getPageCount, } from "../utils/pages";
import {useObserver} from "../utils/useObserver";

const TableHistory = observer(() => {
    const {park} =useContext(Context)
    const {user} =useContext(Context)
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
        <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Админ</th>
                    <th>Время</th>
                    <th>Действие</th>
                    <th>Предмет</th>
                    <th>Офис</th>
                    <th>Место</th>
                    <th>Менеджер</th>
                    <th>Акт</th>
                </tr>
                </thead>
                <tbody>
                {park.History.map(History =>
                    <tr key={History.id}>
                        {user.Client.filter(client => client.id === History.userId).map(client =>
                            <td key={client.id}>{client.username}</td>)}
                        <td>{moment(History.createdAt).format('DD-MMM-YYYY HH:mm', 'ru')}</td>
                        <td>{History.action}</td>

                            <td>{History.nameItem}: {History.inventory}</td>

                        {History.officeId ?
                            park.office.filter(office => office.id === History.officeId).map(office =>
                                <td key={office.id}>{office.name}</td>)
                            :
                            <td/>
                        }

                        {History.place ?
                            <td>{History.place}</td>
                                :
                            <td/>
                        }

                        {History.manage ?
                            <td>{History.manage}</td>
                                :
                            <td/>
                        }

                        {History.img ?
                            <td
                                style={{cursor:'pointer'}}
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