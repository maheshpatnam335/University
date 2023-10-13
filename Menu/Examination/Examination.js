import { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Input, Row } from "reactstrap";
import { FiMenu } from 'react-icons/fi'
import Profile from '../../Images/Profile.jpg'
import axios from "axios";
import Loading from "../domain/Loading";
import InputBox from "../../Components/InputBox";
import { BsPencilSquare } from 'react-icons/bs'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { TbReport } from 'react-icons/tb'
import { MdStreetview } from 'react-icons/md'


const Examination = () => {
    var logId = localStorage.getItem('login');
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`https://localhost:44323/api/Register/Id?Id=${logId}`).then((res) => {
            setUser(res.data);
            setLoading(false)
        })

    }, [])
    return <Fragment>
        {loading ? <Loading /> :
            <Card>
                <div className="card-h-3">
                    <Row>
                        <Col md='1'><h1>HITS</h1>  </Col>
                        <Col md='3' className="flex"><FiMenu size="35" />
                            <Input placeholder="Search" name='search' className="radial-2" style={{ height: '35px' }} />
                        </Col>
                    </Row>
                    <h4 className="pt-2" style={{ marginLeft: '190px', fontWeight: 'bold' }}>Exam Record</h4>
                    <div className="flex">
                        <Card className="b-h mat-2">
                            <img src={Profile} className="radial ma-2" />
                            <p className="ma-c-2">
                                <p> {user.firstName + " " + user.lastName}</p>
                                <p style={{ fontSize: '12px', marginLeft: '10px' }}>   {user.roleId == 2 && "Asst.Professor"}</p>
                            </p>
                            <p className="ma-c-2"><BsPencilSquare size={'25'} /><a> Exam Record</a></p>
                            <p className="ma-c-2"><AiOutlineUserAdd size={'25'} /><a>  Registration</a></p>
                            <p className="ma-c-2"><TbReport size={'25'} /><a>  Reports</a></p>
                            <p className="ma-c-2"><MdStreetview size={'25'} /><a>  Exam View</a></p>
                        </Card>
                        <Card className="b-h2 ma-c-2 mat-3 pt-5">
                            <Row className="mlr-2">
                                <Col><InputBox name='name' label="First Name" /></Col>
                                <Col>   <InputBox name='name' label="Roll Number" /></Col>
                            </Row>
                            <Row className="mlr-2 pt-2  ">
                                <Col><InputBox name='name' label="Last Name" /></Col>
                                <Col>
                                    <label>Gender </label>
                                    <p className="flex pt-2">
                                        <p>Male <input type={'radio'} name='gender' /></p>
                                        <p className="mlr-2">  FeMale <input type={'radio'} name='gender' /></p>
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mlr-2">
                                <Col><InputBox name='fatherName' label="Father Name" /></Col>
                                <Col>   <InputBox name='branch' label="Branch" /></Col>
                            </Row>
                            <Row className="mlr-2 pt-2">
                                <Col><InputBox name='class' label="Class" /></Col>
                                <Col>   <InputBox name='password' label="Password" /></Col>
                            </Row>
                            <Row className="mlr-2 pt-2" md='12'>
                                <Col md='6'><InputBox name='mobileNumber' label="Mobile Number" /></Col>
                                <Col md='2' />
                                <Col className="pt-4">
                                    <Button style={{ backgroundColor: '#0077b6' }}>Register Student</Button>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </div>
            </Card>
        }
    </Fragment>
}
export default Examination;