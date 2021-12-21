import React, {useContext, useRef} from 'react';
import {Table} from "react-bootstrap";
import moment from "moment";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {getPageCount} from "../../../utils/pages";
import {useObserver} from "../../../utils/useObserver";


const TableHistoryModal = observer(({Items, isLoad, totalCount, limit, page, setPage, history}) => {
    const {park} = useContext(Context)
    const {user} = useContext(Context)

    const lastElement = useRef()

    const totalPage = getPageCount(totalCount, limit)

    useObserver(lastElement, page < totalPage, isLoad, () => {
        //Делаем на еденицу больше нашу текущую страницу тем самым провоцируем подгрузку следующей порции постов
        setPage(page + 1)
    })

    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>Админ</th>
                <th>Время</th>
                <th>Действие</th>
                <th>Офис</th>
                <th>Место</th>
                <th>Менеджер</th>
                <th>Акт</th>
            </tr>
            </thead>
            <tbody>
            {history.filter(History => History.itemId === Items.id).map(History =>
                <tr
                    key={History.id}
                >
                    <td>{History.user}</td>
                    <td>{moment(History.createdAt).format('DD-MMM-YYYY HH:mm', 'ru')}</td>
                    <td>{History.action}</td>
                    {History.officeId ?
                        park.office.filter(office => office.id === History.officeId).map(office =>
                            <td key={office.id}>{office.name}</td>)
                        :
                        <td/>
                    }
                    <td>{History.place}</td>
                    {History.manage ?
                        <td>{History.manage}</td>
                        :
                        <td> </td>
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
                                alt={'Акт'}
                            /></a></td>
                        :
                        <td>  </td>
                    }
                </tr>
            )}
            <div ref={lastElement}/>
            </tbody>
        </Table>
    );
});

export default TableHistoryModal;