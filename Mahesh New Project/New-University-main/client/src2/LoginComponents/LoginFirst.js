import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Modal, ModalBody, Row } from "reactstrap"

const LoginFirst = (props) => {
    const [modal, setModal] = useState(true);
    var history = useHistory();
    const Login = () => {
        setModal(!modal)
        history.push('/Login')
    }
    const toggle = () => setModal(!modal)
    return   <Modal isOpen={modal} toggle={toggle} style={{alignItems:'center',marginTop:'160px'}}>
            <ModalBody className="pt-4 pb-4">
                <h4 className="text-center">Login first to access Data</h4>
                <Row className="pt-4">
                    <Col md='5' /> <Col><Button className="bg-success" onClick={() => Login()}>OK</Button></Col>
                </Row>
            </ModalBody>
        </Modal>
}
export default LoginFirst;