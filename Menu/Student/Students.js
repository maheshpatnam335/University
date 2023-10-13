import axios from "axios";
import moment from "moment";
import { Fragment, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Card, CardBody, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import PageHeader from "../../Components/PageHeader";
import { GetMethod } from "../../Services/MainService";
import { BRANCH, CASTE, CLASS, GENDER, getTextFromArray, SECTION } from "../domain/BranchConstants";

const Students = (props) => {
    const [students, setStudents] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        name: '', branch: '', admissionNumber: '', rollNumber: '', address: '', caste: '', class: '', section: '',
        dob: '', fatherName: '', mobileNumber: '', gender: ''
    })
    const [state, setState] = useState({ branchId: 0, classId: 0, sectionId: 0, attendance: 0 })

    const handleValueChange = (name, value) => {
        if (name == 'branchId') {
            state.branchId = value
        }
        if (name == 'classId') {
            state.classId = value
        }
        if (name == 'sectionId') {
            state.sectionId = value
        }
        GetMethod(`https://localhost:44323/api/Student?branch=${state.branchId}&classId=${state.classId}&section=${state.sectionId}`).then((res) => {
            setStudents(res.data)
        })
    }

    const AddStudent = () => {
        props.history.push('/Menu/Student/AddStudent')
    }
    const employeeHandleChange = (e) => {
        setLoading(true);
        if (e.length > 0) {
            var branchName = '';
            BRANCH.map((i, j) => {
                if (i.id == e[0].branchId) {
                    branchName = i.name
                }
            })
            axios.get('https://localhost:44323/api/Student/AttendanceList').then((res) => {
                var att = res.data.filter(x => x.rollNumber == e[0].rollNumber)
                setState({ ...state, attendance: att[0].attendancePercentage })
            })

            setDetails({
                ...details, name: e[0].name, admissionNumber: e[0].admissionNumber, dob: e[0].dateOfBirth, gender: e[0].gender
                , fatherName: e[0].fatherName, rollNumber: e[0].rollNumber, branch: branchName, mobileNumber: e[0].mobileNumber,
                address: e[0].address, caste: e[0].caste, class: e[0].class, section: e[0].sectionId
            })
        }
        setModal(!modal)
        setLoading(false)
    }
    const toggle = () => setModal(!modal)
    return <Fragment>
        <Card>
            <CardBody>
                <Row>
                    <Col md='3'><PageHeader header="Student Details" /></Col>
                    <Col md='7' />
                    <Col > <Button className="btn btn-success" onClick={() => AddStudent()} >Add student</Button></Col>
                </Row>
                <div className="div-space-around">
                    <div>
                        <Label className="pt-4">Select Branch</Label>
                        <Input type='select' name="branchId" onChange={(e) => handleValueChange(e.target.name, e.target.value)}
                            className="div-width">
                            <option>Select</option>
                            {
                                BRANCH.map((i, j) => {
                                    return <option value={i.id}>{i.name}</option>
                                })
                            }
                        </Input>
                    </div>
                    <div>
                        <Label className="pt-4">Class</Label>
                        <Input type="select" name='classId' onChange={(e) => handleValueChange(e.target.name, e.target.value)} className="div-width">
                            <option>Select Year</option>
                            {
                                CLASS.map((i, j) => {
                                    return <option value={i.id}>{i.name}</option>
                                })
                            }
                        </Input>
                    </div>
                </div>
                <div className="div-space-around">
                    <div>
                        <Label className="pt-4">Select Section</Label>
                        <Input type='select' name='sectionId' onChange={(e) => handleValueChange(e.target.name, e.target.value)}
                            className="div-width"     >
                            <option>Select</option>
                            {
                                SECTION.map((i, j) => {
                                    return <option value={i.id}>{i.name}</option>
                                })
                            }
                        </Input></div>
                    <div>
                        <Label className="pt-4">Search Student</Label>
                        <Typeahead
                            id="student"
                            labelKey="name"
                            name="student"
                            onChange={(e) => employeeHandleChange(e)}
                            options={students ? students : []}
                            placeholder="Choose one student..."
                        />
                    </div>
                </div>
            </CardBody>
            <Modal isOpen={modal} toggle={toggle} className="div-padding-center-modal-lg div-center" size="lg">
                <ModalHeader >
                    <h5 className="div-text-bold">Student details</h5>
                </ModalHeader>
                <ModalBody>
                    <Row className="pt-5">
                        <Col>Name:<strong>{"  " + details.name}</strong></Col>
                        <Col> Branch:<strong>{"  " + details.branch}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Class:<strong>{"  " + getTextFromArray(CLASS, details.class)}</strong></Col>
                        <Col> Section:<strong>{"  " + getTextFromArray(SECTION, details.section)}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Admission No: <strong>{"  " + details.admissionNumber}</strong></Col>
                        <Col> Roll No: <strong>{"  " + details.rollNumber}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Date Of  Birth: <strong>{"  " + moment(details.dob).format(moment.HTML5_FMT.DATE)}</strong></Col>
                        <Col> Parent/Guradian Name: <strong>{"  " + details.fatherName}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Phone:<strong>{"  " + details.mobileNumber}</strong></Col>
                        <Col>Phone:<strong>{"  " + details.mobileNumber}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Gender:<strong>{"  " + getTextFromArray(GENDER, details.gender)}</strong></Col>
                        <Col>Address:<strong>{"  " + details.address}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>No of Backlogs:</Col>
                        <Col> Attendace:<strong>{"  " + state.attendance}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Caste:<strong>{"  " + getTextFromArray(CASTE, details.caste)}</strong></Col>
                        <Col> Scholarship status:</Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Card >
    </Fragment>

}
export default Students;