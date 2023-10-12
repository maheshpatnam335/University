import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import PageHeader from "../../Components/PageHeader";
import { BRANCH, CLASS, SECTION } from "../domain/BranchConstants";

const Students = (props) => {
    var logId = localStorage.getItem('login')
    const [user, setUser] = useState(0);
    const [students, setStudents] = useState([]);
    const [details, setDetails] = useState({ name: '', branch: '', admissionNumber: '', rollNumber: '', dob: '', fatherName: '' })
    const [state, setState] = useState({ branchId: 0, classId: 0, sectionId: 0 })

    useEffect(() => {
        axios.get(`https://localhost:44323/api/Register/Id?Id=${logId}`).then((res) => {
            setUser(res.data.roleId)
        })
    }, [])

    const handleValueChange = (name, value) => {
        BRANCH.map((i, j) => {
            if (i.name == value) {
                state.branchId = i.id
            }
        })
        CLASS.map((i, j) => {
            if (i.name == value) {
                state.classId = i.id
            }
        })

        SECTION.map((i, j) => {
            if (i.name == value) {
                state.sectionId = i.id
            }
        })
        axios.get(`https://localhost:44323/api/Student?branch=${state.branchId}&classId=${state.classId}&section=${state.sectionId}`).then((res) => {
            setStudents(res.data)
        })
    }

    const AddStudent = () => {
        props.history.push('/Menu/Student/AddStudent')
    }
    const employeeHandleChange = (e) => {
        var branchName = '';
        BRANCH.map((i, j) => {
            if (i.id == e[0].branchId) {
                branchName = i.name
            }
        })
        setDetails({
            ...details, name: e[0].name, admissionNumber: e[0].admissionNumber, dob: e[0].dateOfBirth
            , fatherName: e[0].fatherName, rollNumber: e[0].rollNumber, branch: branchName
        })
    }
    return <Fragment>
        <Card>
            <CardBody>
                <Row>
                    <Col md='3'><PageHeader header="Student Details" /></Col>
                    <Col md='7'/>
                    <Col > <Button className="btn-success" onClick={() => AddStudent()} >Add student</Button></Col>
                </Row>
                <Row><Col><Label className="pt-4">Select Branch</Label>
                    <Input type='select' name="branchId" onChange={(e) => handleValueChange(e.target.name, e.target.value)}
                    >
                        <option>Select</option>
                        {
                            BRANCH.map((i, j) => {
                                return <option >{i.name}</option>
                            })
                        }
                    </Input>
                </Col>
                    <Col>
                        <Label className="pt-4">Class</Label>
                        <Input type="select" name='classId' onChange={(e) => handleValueChange(e.target.name, e.target.value)}>
                            <option>Select Year</option>
                            {
                                CLASS.map((i, j) => {
                                    return <option>{i.name}</option>
                                })
                            }
                        </Input>
                    </Col>
                    <Col> <Label className="pt-4">Select Section</Label>
                        <Input type='select' name='sectionId' onChange={(e) => handleValueChange(e.target.name, e.target.value)}
                        >
                            <option>Select</option>
                            {
                                SECTION.map((i, j) => {
                                    return <option>{i.name}</option>
                                })
                            }
                        </Input></Col>
                    <Col>
                        <Label className="pt-4">Search Student</Label>
                        <Typeahead
                            id="student"
                            labelKey="name"
                            name="student"
                            onChange={(e) => employeeHandleChange(e)}
                            // multiple={""}
                            options={students}
                            placeholder="Choose one student..."
                        />
                    </Col>
                </Row>
                <CardBody >
                    <Row className="pt-5">
                        <Col>Name:<strong>{"  " + details.name}</strong></Col>
                        <Col> Branch:<strong>{"  " + details.branch}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Class:<strong>{"  "}</strong></Col>
                        <Col> Section:<strong>{"  "}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Admission No: <strong>{"  " + details.admissionNumber}</strong></Col>
                        <Col> Roll No: <strong>{"  " + details.rollNumber}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Date Of  Birth: <strong>{"  " + details.dob}</strong></Col>
                        <Col> Parent/Guradian Name: <strong>{"  " + details.fatherName}</strong></Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Phone:</Col>
                        <Col>Phone:</Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Gender:</Col>
                        <Col>Address:</Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>No of Backlogs:</Col><Col> Attendace:</Col>
                    </Row>
                    <Row className="pt-2">
                        <Col>Caste:</Col><Col> Scholarship status:</Col>
                    </Row>
                </CardBody>
            </CardBody>
        </Card >
    </Fragment>
}
export default Students;