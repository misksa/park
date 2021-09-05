// import React, {useContext} from 'react';
// import {Button, Modal, Table} from "react-bootstrap";
// import {observer} from "mobx-react-lite";
// import {Context} from "../../index";
//
// const ModalImage = observer(({show, onHide, Histor}) => {
//     const {park} = useContext(Context)
//     const {user} = useContext(Context)
//
//     // const [modalImage, setModalImage] = useState(false)
//
//     return (
//         <Modal
//             show={show}
//             onHide={onHide}
//             size="lg"
//             centered
//         >
//             <Modal.Header closeButton>
//             </Modal.Header>
//             <Modal.Body>
//                 {park.History.filter(History => History.id == Histor).map(History =>
//                     <img src={'http://localhost:5000/'+ History.img}/>
//                 )}
//             </Modal.Body>
//         </Modal>
//
//     );
// });
//
// export default ModalImage;