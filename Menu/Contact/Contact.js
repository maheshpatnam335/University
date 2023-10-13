import { Fragment, useEffect, useState } from "react";
import { BsFillPersonFill } from 'react-icons/bs';
import { FcEndCall } from 'react-icons/fc';
import { FiPhoneCall } from 'react-icons/fi';
import { GiRotaryPhone } from 'react-icons/gi';
import { IoIosMail } from 'react-icons/io/';
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, List, Modal, ModalBody, Row } from "reactstrap";
import PageHeader from "../../Components/PageHeader";
import call from '../../Images/callinggif1.webp';
import CallTimer from "./CallTimer";

const Contact = () => {
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [number, setNumber] = useState('');
    const toggle = () => setModal(!modal);
    var i = 0;
    useEffect(() => {
        const timer = setTimeout(() => {
            i++
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return <Fragment>
        <Row>
            <Col md='10'> <PageHeader header="Contact Us" />  </Col>
            <Col className="pt-4" md='2'><Button className="btn btn-info" onClick={() => history.push('/Menu/Contact/Chat')}>Chat us</Button></Col>
        </Row>

        <Card>
            <Card>
                <CardBody className="bg-info white">
                    <h3>HOLY MARY INSTITUTE OF TECHNOLOGY AND SCIENCE</h3>
                    <h4 className="pt-3">UGC- AUTONOMOUS, Accredited by NAAC - A Grade</h4>
                    <h5>(Approved by AICTE, Recognized by UGC Under section 2(f) & 12(B), Permanently Affiliated to JNTUH)</h5>
                    <h4>EAMCET / ECET / POLYCET / ICET / PGECET Code : HOLY</h4>
                </CardBody>
            </Card>
            <Card className="margin-top bg-success white">
                <CardBody >
                    <h2>Our Other Institutions</h2>
                    <List>
                        <ul>
                            <li>Holy Mary Institute of Technology (Polytechnic.)- TSPOLYCET Code: HMTK</li>
                            <li>Holy Mary Institute of Technology & Science (College of Pharmacy)-TSEAMCET/TSECET/TSPGECET/GPAT Code: HMIP</li>
                            <li>Holy Mary Institute of Technology & Management (MBA)-TSICET Code: HMCM</li>
                            <li>Holy Trinity College of Education - Course: B.Ed. TSEdCET Code: HOLY</li>
                        </ul>
                    </List>
                </CardBody>
            </Card>
            <Card className="bg-danger white margin-top">
                <CardBody>
                    <h5>Courses : B.TECH, B.PHARMACY, PHARMA-D, POLYTECHNIC, M.TECH, M.PHARMACY, MBA(OU), MBA(JNTUH), B.Ed, D.El.Ed</h5>
                    <h6>Admissions Help Line Numbers : +91 98488 89961/ 62/ 63/ 64/ 65.</h6>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <h4 className="pt-3"><strong>For Student Educational Verification :</strong></h4>
                    <p><strong><IoIosMail className="phone" /></strong><Link> hits.ac@gmail.com</Link></p>
                    <p onClick={() => setModal(!modal)}><strong><FiPhoneCall className="phone" /></strong>
                        <Link onClick={() => setNumber('709576556')}> 709576556</Link></p>
                    <p onClick={() => setModal(!modal)}><strong><GiRotaryPhone className="phone" /> </strong>
                        <Link onClick={() => setNumber('040-4105208')}>040-4105208</Link></p>
                </CardBody>
            </Card>
        </Card>
        <Modal isOpen={modal} toggle={toggle} className="width-2 pt-5" title="Calling">
            <ModalBody className="text-center back-color">
                <h4>Calling...</h4>
                <h5>{number}</h5>
                <h6><img src={call} alt="Calling..." className="radial" width={'80px'} /></h6>
                <h6><CallTimer /></h6>
                <h2><BsFillPersonFill className="size-2" /></h2>
                <h2><FcEndCall className="end-call" title="End call" onClick={() => setModal(!modal)} /></h2>
            </ModalBody>
        </Modal>

    </Fragment>
}
export default Contact;