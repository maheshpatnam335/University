import { Fragment, useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Modal, ModalBody, Row } from "reactstrap";
import { MdSportsCricket, MdEmojiPeople, MdSportsKabaddi, MdSportsHockey, MdSportsBaseball } from 'react-icons/md'
import { GiShuttlecock, GiBasketballBasket } from 'react-icons/gi';
import { IoMdFootball } from 'react-icons/io';
import { GrHide } from 'react-icons/gr';
import { RiClapperboardLine } from 'react-icons/ri';
import { FaVolleyballBall, FaChessBoard, FaTableTennis, FaDiceSix, FaChair } from 'react-icons/fa';
import { GetMethod } from "../../Services/MainService";


const Sports = () => {
    const [sports, setSports] = useState([])
    const [modal, setModal] = useState(false)
    useEffect(() => {
        GetMethod('https://localhost:44323/api/Sports/Sports').then((res) => {
            setSports(res.data);
        }, [])
    })
    const GetSport = () => {
        setModal(!modal);
    }
    console.log(sports.length > 0 && sports[0].filesName.split(','))
    const toggle = () => setModal(!modal);
    return <Fragment>
        <Row>
            <Col>
                <Card className="main-card mb-4">
                    <CardBody>
                        <CardTitle>OutDoor Games</CardTitle>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="primary" onClick={() => GetSport()} >
                            <MdSportsCricket size={'35'} />
                            <p>Cricket</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="secondary">
                            <GiShuttlecock size={'35'} />
                            <p>Badminton</p>

                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="success">
                            <IoMdFootball size="35" />
                            <p>Foot Ball</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="info">
                            <MdEmojiPeople size={'35'} />
                            <p>Kho-kho</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="warning">
                            <FaVolleyballBall size='35' />
                            <p>Volleyball</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="danger">
                            <MdSportsKabaddi size="35" />
                            <p>Kabaddi</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="focus">
                            <MdSportsHockey size='35' />
                            <p>Hockey</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="alternate">
                            <GiBasketballBasket size='35' />
                            <p>Basket Ball</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="info">
                            <MdSportsBaseball size='35' />
                            <p>Base Ball</p>
                        </Button>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="main-card mb-3">
                    <CardBody>
                        <CardTitle>InDoor Games</CardTitle>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="primary">
                            <RiClapperboardLine size='35' />
                            <p>  Carroms</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="secondary">
                            <FaChessBoard size={'35'} />
                            <p>Chess</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="success">
                            <GrHide size="35" />
                            <p>Hide and seek</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="info">
                            <FaTableTennis size='35' />
                            <p> Table tennis</p>

                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="warning">
                            <FaDiceSix size='35' />
                            <p>Ludo</p>
                        </Button>
                        <Button className="mb-2 mr-2 btn-icon-vertical w-1" color="danger">
                            <FaChair size='35' />
                            <p>Musical Chairs</p>
                        </Button>
                    </CardBody>
                </Card>
            </Col>

        </Row>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalBody>
                {sports.length > 0 && 
                <img src={`blob:http://localhost:3000/b44215fe-c5a0-4d6c-b7b1-48c4af305d3f`} alt='img_1' width={'100px'} height={'120px'} />
                // <img src={sports[0].filesName.split(',')[0]} alt='img_1' width={'100px'} height={'120px'} />
                }
            </ModalBody>
        </Modal>
    </Fragment>
}
export default Sports;