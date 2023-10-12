import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import * as Yup from 'yup';
import InputBox from "../Components/InputBox";
import PageHeader from "../Components/PageHeader";

const Students = () => {
    var logId = localStorage.getItem('login')
    const [user, setUser] = useState(0)
    const [students, setStudents] = useState([]);
    const [details, setDetails] = useState({ name: '', branch: '', admissionNumber: '', rollNumber: '', dob: '', fatherName: '' })
    const [state, setState] = useState({ branchId: 0, classId: 0, sectionId: 0 })
    const [addStudent, setAddStudent] = useState(false)
    const [branch, setBranch] = useState([{ id: 1, name: "Civil Engg" }, { id: 2, name: "Mechanical Engg" }]);
    const [year, setYear] = useState([{ id: 1, name: "Ist-year" }, { id: 2, name: "IInd-year" }
        , { id: 3, name: "IIIrd-year" }, { id: 4, name: "IVth-year" }]);
    const [section, setSection] = useState([{ id: 1, name: "A" }, { id: 2, name: "B" }, { id: 3, name: "C" }, { id: 4, name: "D" }]);

    const initialValues = {
        name: '',
        branch: '',
        branchId: 0,
        admissionNumber: '',
        rollNumber: '',
        dateOfBirth: '',
        fatherName: '',
        section: '',
        class: 0,
        classId: '',
        section: '',
        sectionId: 0

    }
    useEffect(() => {
        axios.get(`https://localhost:44323/api/Register/Id?Id=${logId}`).then((res) => {
            setUser(res.data.roleId)
        })
    }, [])
    const validationSchema = Yup.object().shape({
        // name: Yup.string().required(),
        // branch: Yup.string().required(),
        // rollNumber: Yup.string().required()
    })
    const handleSubmit = (values) => {
        branch.map((i, j) => {
            if (i.name == values.branch) {
                values.branchId = i.id
                values.branch = ""
            }
        })
        year.map((i, j) => {
            if (i.name == values.classId) {
                values.class = i.id
                values.classId = ""
            }
        })

        section.map((i, j) => {
            if (i.name == values.section) {
                values.sectionId = i.id
                values.section = ""
            }
        })
        try {
            axios.post('https://localhost:44323/api/Student', values).then((res) => {
                alert("successful")
            })
        }
        catch {
            alert("Error")
        }
    }

    const handleValueChange = (name, value) => {
        branch.map((i, j) => {
            if (i.name == value) {
                state.branchId = i.id
            }
        })
        year.map((i, j) => {
            if (i.name == value) {
                state.classId = i.id
            }
        })

        section.map((i, j) => {
            if (i.name == value) {
                state.sectionId = i.id
            }
        })
        console.log(state)
        axios.get(`https://localhost:44323/api/Student?branch=${state.branchId}&classId=${state.classId}&section=${state.sectionId}`).then((res) => {
            setStudents(res.data)
        })
    }

    const AddStudent = () => {
        setAddStudent(true)
    }
    const GetDetails = () => {
        setAddStudent(false)
    }
    const employeeHandleChange = (e) => {
        var branchName = '';
        branch.map((i, j) => {
            if (i.id == e[0].branchId) {
                branchName = i.name
            }
        })
        setDetails({
            ...details, name: e[0].name, admissionNumber: e[0].admissionNumber, dob: e[0].dateOfBirth
            , fatherName: e[0].fatherName, rollNumber: e[0].rollNumber, branch: branchName
        })
    }
    return <center>
        <Card>
            <PageHeader header="Students" />
            <CardBody>
                <Row >
                    <Col md='3' >
                        <Label>Select Branch</Label>
                        <Input type='select' name="branchId" onChange={(e) => handleValueChange(e.target.name, e.target.value)}
                        >
                            <option>Select</option>
                            {
                                branch.map((i, j) => {
                                    return <option>{i.name}</option>
                                })
                            }
                        </Input>
                        <Label className="pt-4">Class</Label>
                        <Input type="select" name='classId' onChange={(e) => handleValueChange(e.target.name, e.target.value)}>
                            <option>Select Year</option>
                            {
                                year.map((i, j) => {
                                    return <option>{i.name}</option>
                                })
                            }
                        </Input>
                        <Label className="pt-4">Select Section</Label>
                        <Input type='select' name='sectionId' onChange={(e) => handleValueChange(e.target.name, e.target.value)}
                        >
                            <option>Select</option>
                            {
                                section.map((i, j) => {
                                    return <option>{i.name}</option>
                                })
                            }
                        </Input>
                        <Label className="pt-4">Search Student</Label>
                        <Typeahead
                            id=""
                            labelKey="name"
                            name="student"
                            onChange={(e) => employeeHandleChange(e)}
                            // multiple={""}
                            options={students}
                            placeholder="Choose one student..."
                        />
                        <Row className="pt-4">
                            {user == 2 ? <Col><Button className="btn-success" onClick={() => AddStudent()}>Add student</Button></Col> : ''}
                            <Col><Button className="btn-info" onClick={() => GetDetails()}>Get details</Button></Col>
                        </Row>
                    </Col>

                    {addStudent ? <> <Col md='1' />
                        <Col md='8'>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(values) => handleSubmit(values)}
                            >
                                {({ errors, setFieldValue }) => {
                                    const handleChange = (name, value) => {
                                        setFieldValue(name, value)
                                    }
                                    return <Form>
                                        <Row><Col md='8'><h4>Add student here</h4></Col> </Row>
                                        <Row >
                                            <Col md='3' />
                                            <Col md='3'><InputBox name='name' label='Name' handleChange={handleChange} /></Col>
                                            <Col md='3'><label>Branch</label>
                                                <Input type="select" name='branch' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                                    <option>Select Branch</option>
                                                    {
                                                        branch.map((i, j) => {
                                                            return <option>{i.name}</option>
                                                        })
                                                    }
                                                </Input></Col>
                                        </Row>
                                        <Row>
                                            <Col md='3' />
                                            <Col md='3'><label>Class</label>
                                                <Input type="select" name='classId' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                                    <option>Select Year</option>
                                                    {
                                                        year.map((i, j) => {
                                                            return <option>{i.name}</option>
                                                        })
                                                    }
                                                </Input></Col>
                                            <Col md='3'><label>Section</label>
                                                <Input type="select" name='section' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                                    <option>Select Section</option>
                                                    {
                                                        section.map((i, j) => {
                                                            return <option>{i.name}</option>
                                                        })
                                                    }
                                                </Input></Col>
                                        </Row>
                                        <Row>
                                            <Col md='3' />
                                            <Col md='3'><InputBox name='rollNumber' label='Roll Number' handleChange={handleChange} /></Col>
                                            <Col md='3'><InputBox name='admissionNumber' label='Admission No' handleChange={handleChange} /></Col>
                                        </Row>
                                        <Row >
                                            <Col md='3' />
                                            <Col md='3'><InputBox name='dateOfBirth' label='Date of Birth' type='date' handleChange={handleChange} /></Col>
                                            <Col md='3'><InputBox name='fatherName' label='Father Name' handleChange={handleChange} /></Col>
                                        </Row>
                                        <Row className="pt-4">
                                            <Col md='3' />
                                            <Col md='3'><Button className="btn-success" type="submit">Save</Button></Col>
                                            <Col md='3'><Button className="btn-danger" type="reset">Clear</Button></Col>
                                        </Row>
                                    </Form>
                                }}
                            </Formik>
                        </Col>
                    </> : <><Col md='2' />
                        <Col md='7'>
                            <Row><Col md='8'><h4>Details shown here</h4></Col> </Row>
                            <CardBody style={{ textAlign: 'left' }}>
                                <Row ><Col>Name:<strong>{"  " + details.name}</strong></Col>
                                    <Col> Branch:<strong>{"  " + details.branch}</strong></Col></Row>
                                <Row><Col>Admission No: <strong>{"  " + details.admissionNumber}</strong></Col>
                                    <Col> Roll No: <strong>{"  " + details.rollNumber}</strong></Col></Row>
                                <Row><Col>Date Of  Birth: <strong>{"  " + details.dob}</strong></Col>
                                    <Col> Parent/Guradian Name: <strong>{"  " + details.fatherName}</strong></Col></Row>
                                <Row><Col>No of Backlogs:</Col><Col> Attendace:</Col></Row>
                            </CardBody>
                        </Col>
                    </>
                    }
                </Row>
            </CardBody>
        </Card>
    </center>
}
export default Students;