import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
import PageHeader from "../../Components/PageHeader";
import { BRANCH, GENDER, getFullDate, getTextFromArray, MARITALSTATUS, QUALIFICATION } from "../domain/BranchConstants";

const Teachers = () => {
    const [user, setUser] = useState(0);
    const [employees, setEmployees] = useState([])
    const [details, setDetails] = useState({
        employeeName: '', employeeId: 0, department: '', subject: '', gender: 0, maritalStatus: 0, age: 0, email: '',
        experience: 0, dateOfJoing: '', guardianName: '', eSINo: '', pFNo: '', qualification: 0, phone: '', address: ''
    })
    var logId = localStorage.getItem('login');
    useEffect(() => {
        axios.get(`https://localhost:44323/api/Register/Id?Id=${logId}`).then((res) => {
            setUser(res.data.roleId)
        })
    }, [])
    const branchHandleChange = (e) => {
        axios.get(`https://localhost:44323/api/Teacher/Department?id=${e.target.value}`).then((res) => {
            setEmployees(res.data)
        })
    }
    const employeeHandleChange = (selected) => {
        axios.get(`https://localhost:44323/api/Teacher/Id?id=${selected[0].id}`).then((res) => {
            console.log(res.data)
            setDetails({
                ...details, employeeName: res.data.name, employeeId: res.data.employeeId, gender: res.data.gender,
                maritalStatus: res.data.maritalStatus, age: res.data.age, experience: res.data.experince, department: res.data.department,
                subject: res.data.subjects, qualification: res.data.qualification, address: res.data.address, phone: res.data.phone,
                email: res.data.email, dateOfJoing: res.data.dateOfJoining, guardianName: res.data.spouseName, eSINo: res.data.esiNo, pFNo: res.data.pfNo
            })
        })
    }
    return <Fragment>
        <PageHeader header="Faculty details" />

        {user == 2 ?
            <Card>
                <Row>
                    <Col md='10' />
                    <Col md='2' className="pt-3">
                        <Link to='/Menu/Teachers/AddTeacher'> <Button className='bg-success'>Add Teacher</Button></Link>
                    </Col>
                </Row>
                <CardBody style={{ textAlign: 'left' }}>
                    <Row>
                        <Row className="pb-4">
                            <Col md='4'>
                                <Input type='select' name='branch' className="form-control" onChange={(e) => branchHandleChange(e)}>
                                    <option>Select Branch</option>
                                    {BRANCH.map((res) => {
                                        return <option value={res.id}>{res.name}</option>
                                    })}
                                </Input>
                            </Col>
                            <Col md='4'>
                                <Typeahead
                                    id="teacher"
                                    labelKey="name"
                                    name="teacher"
                                    onChange={(e) => employeeHandleChange(e)}
                                    options={employees}
                                    placeholder="Choose one teacher..."
                                />
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>Name:<strong>{"  " + details.employeeName}</strong></Col>
                            <Col> Employee Id:<strong>{"  " + details.employeeId}</strong></Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>Gender:<strong>{"  " + getTextFromArray(GENDER, details.gender)}</strong></Col>
                            <Col>Marital Status:<strong>{"  " + getTextFromArray(MARITALSTATUS, details.maritalStatus)}</strong></Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>Age:<strong>{"  " + details.age}</strong></Col>
                            <Col>Experince:<strong>{"  " + details.experience}</strong></Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>Department : <strong>{"  " + getTextFromArray(BRANCH, details.department)}</strong></Col>
                            <Col> Subjects: <strong>{"  " + details.subject}</strong></Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>Qualification :<strong>{"  " + getTextFromArray(QUALIFICATION, details.qualification)}</strong></Col>
                            <Col>Address :<strong>{"  " + details.address}</strong></Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>Phone :<strong>{"  " + details.phone}</strong></Col>
                            <Col>Email :<strong>{"  " + details.email}</strong></Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>Date Of  Joining: <strong>{"  " + details.dateOfJoing != '' ? getFullDate(details.dateOfJoing) : '-'}</strong></Col>
                            <Col> Husband/Wife/Parent Name: <strong>{"  " + details.guardianName}</strong></Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>ESI no:<strong>{"  " + details.eSINo}</strong></Col>
                            <Col> PF no:<strong>{"  " + details.pFNo}</strong></Col>
                        </Row>
                    </Row>
                </CardBody>
            </Card>
            : <h1>You don't have permission for this page</h1>}</Fragment>
}
export default Teachers;