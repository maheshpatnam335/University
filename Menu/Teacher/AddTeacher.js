import axios from "axios";
import { Form, Formik } from "formik";
import { Fragment } from "react";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
import * as Yup from 'yup';
import InputBox from "../../Components/InputBox";
import PageHeader from "../../Components/PageHeader";
import { PostMethod } from "../../Services/MainService";
import { handleError, handleSuccess } from "../../utils/Sweetalert";
import { BRANCH, GENDER, MARITALSTATUS, QUALIFICATION } from "../domain/BranchConstants";

const AddTeacher = () => {
    const initialValues = {
        name: '',
        employeeId: '',
        gender: 0,
        maritalStatus: 0,
        department: 0,
        age: 0,
        experince: 0,
        subjects: '',
        address: '',
        email: '',
        qualification: 0,
        phone: '',
        dateOfJoining: '',
        spouseName: '',
        eSINo: '',
        pFNo: ''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required.'),
        employeeId: Yup.string().required('Employee Id is required.'),
        gender: Yup.number().required('Gender is required.'),
        maritalStatus: Yup.number().required('Marital status is required.'),
        department: Yup.number().required('Department is required.'),
        age: Yup.number().required('Age is required.'),
        subjects: Yup.string().required('Subjects are required.'),
        address: Yup.string().required('Address is required.'),
        qualification: Yup.number().required('Qualification is required.'),
        phone: Yup.string().required('Mobile Number is required.'),
        dateOfJoining: Yup.string().required('Date of joining is required.'),
        spouseName: Yup.string().required('Father name or spouse name is required.'),
        eSINo: Yup.string().required('Esi number is required.'),
        pFNo: Yup.string().required('PF number is required.')
    })
    const handleSubmit = (values) => {
        try {
            PostMethod('https://localhost:44323/api/Teacher', values).then((res) => {
                if (res.status == 200) {
                    handleSuccess("Data saved successfully.")
                }
            })
        }
        catch {
            handleError("Invalid details")
        }
    }

    return <Fragment>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ values, errors, setFieldValue }) => {
                const handleChange = (name, value) => {
                    setFieldValue(name, value)
                }
                return <Form>
                    <Card >
                        <div style={{ marginLeft: '30px' }}><PageHeader header="Add Teacher" /></div>
                        <CardBody style={{ marginLeft: '40px', marginRight: '40px' }}>
                            <Row className="pt-2" >
                                <Col >
                                    <InputBox name='name' label="Name" handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.name}</p>
                                </Col>
                                <Col >
                                    <InputBox name='employeeId' label="Employee Id" handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.employeeId}</p>
                                </Col>
                                <Col >
                                    <label>Gender</label>
                                    <Input type='select' name='gender' key={"id"} onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                        <option>Select</option>
                                        {GENDER.map((i) => {
                                            return <option value={i.id}>{i.name}</option>
                                        })}
                                    </Input>
                                    <p style={{ color: 'red' }}>{errors && errors.gender}</p>
                                </Col>
                            </Row>
                            <Row className="pt-2" >
                                <Col >
                                    <label>Marital Status</label>
                                    <Input type='select' name='maritalStatus' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                        <option>Select</option>
                                        {MARITALSTATUS.map((i) => {
                                            return <option value={i.id}>{i.name}</option>
                                        })}
                                    </Input>
                                    <p style={{ color: 'red' }}>{errors && errors.maritalStatus}</p>
                                </Col>
                                <Col >
                                    <InputBox name='age' label="Age" type="number" handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.age}</p>
                                </Col>
                                <Col >
                                    <InputBox name='experince' label="Experince" type="number" handleChange={handleChange} />
                                </Col>
                            </Row>
                            <Row className="pt-2" >
                                <Col>
                                    <label>Branch</label>
                                    <Input type='select' name='department' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                        <option>Select</option>
                                        {BRANCH.map((i) => {
                                            return <option value={i.id}>{i.name}</option>
                                        })}
                                    </Input>
                                </Col>
                                <Col >
                                    <InputBox name='subjects' label="Subjects" handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.subjects}</p></Col>
                                <Col >
                                    <label>Address</label>
                                    <textarea name='address' onChange={(e) => handleChange(e.target.name, e.target.value)} className="form-control" />
                                    <p style={{ color: 'red' }}>{errors && errors.address}</p> </Col>
                            </Row>
                            <Row className="pt-2" >
                                <Col > <InputBox name='email' label="Email" handleChange={handleChange} /></Col>
                                <Col>
                                    <label>Qualification</label>
                                    <Input type='select' name='qualification' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                        <option>Select</option>
                                        {QUALIFICATION.map((i) => {
                                            return <option value={i.id}>{i.name}</option>
                                        })}
                                    </Input>
                                    <p style={{ color: 'red' }}>{errors && errors.qualification}</p>
                                </Col>
                                <Col><InputBox name='phone' label="Mobile Number" handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.phone}</p>
                                </Col>
                            </Row>
                            <Row className="pt-2" >
                                <Col>
                                    <InputBox name='dateOfJoining' label="Date Of Joining" type="date" handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.dateOfJoining}</p>
                                </Col>
                                <Col><InputBox name='spouseName' label="Father/Husband Name" handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.spouseName}</p></Col>
                                <Col>
                                    <InputBox name='eSINo' label="ESI No" handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.eSINo}</p>
                                </Col>
                            </Row>
                            <Row className="pt-2">
                                <Col md='3'><InputBox name='pFNo' label="PF No" handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.pFNo}</p></Col>
                            </Row>
                            <Row className='pt-4'>
                                <Col md='3' />
                                <Col md='3'>
                                    <Button className="btn-success" type="submit">Save</Button>
                                </Col>
                                <Col md='3'>
                                    <Button className="btn-info" type="reset">Cancel</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Form>
            }}
        </Formik>
    </Fragment>
}
export default AddTeacher;