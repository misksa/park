import {FormControl} from "react-bootstrap";
import cl from './Search.module.css'
import {useContext, useState} from "react";
import {Context} from "../../index";
import Container from "react-bootstrap/Container";


const Search = () => {
    const {park} = useContext(Context)

    // const Filter = park.Filter
    const [filter, setFilter] = useState('')

    park.setSearch(filter)

    return (
        <Container
            className={cl.container}
        >
                <FormControl
                    className={cl.input}
                    placeholder={'Название предмета / менеджер / иневентарный номер / серийный номер...'}
                    value={filter}
                    onChange={(e) =>setFilter(e.target.value)}
                />
        </Container>

    );
};

export default Search;