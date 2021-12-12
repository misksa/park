import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {getPageCount, getPagesArray} from "../utils/pages";

const Page = observer(() => {
    const {park} = useContext(Context)
    const totalCount = getPageCount(park.totalCount, park.Limit)
    const pages = getPagesArray(totalCount)
    return (
        <Pagination className={'mt-5'}>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={park.Page === page}
                    onClick={() =>park.SetPage(page)}
                >{page}</Pagination.Item>
            )}
        </Pagination>
    );
});

export default Page;