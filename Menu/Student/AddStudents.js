import axios from "axios";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
import * as Yup from 'yup';
import InputBox from "../../Components/InputBox";
import PageHeader from "../../Components/PageHeader";
import { GetMethod, PostMethod } from "../../Services/MainService";
import { displayBackendError } from "../../utils/DisplayError";
import { handleSuccess } from "../../utils/Sweetalert";
import { BRANCH, CASTE, CLASS, GENDER, SECTION } from "../domain/BranchConstants";
import Loading from "../domain/Loading";

const AddStudent = (props) => {
    var logId = localStorage.getItem('login')
    const [user, setUser] = useState(0);
    const [loading, setLoading] = useState(false);
    const initialValues = {
        name: '',
        branchId: 0,
        class: 0,
        sectionId: 0,
        gender: 0,
        mobileNumber: '',
        admissionNumber: '',
        rollNumber: '',
        dateOfBirth: '',
        fatherName: '',
        caste: 0,
        address: '',
    }
    useEffect(() => {
        GetMethod(`https://localhost:44323/api/Register/Id?Id=${logId}`).then((res) => {
            setUser(res.data.roleId)
        })
    }, [])
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required."),
        branchId: Yup.string().required("Branch is required."),
        rollNumber: Yup.string().required("Roll Number is required.")
    })
    const handleSubmit = (values) => {
        setLoading(true)
        PostMethod('https://localhost:44323/api/Student', values).then(() => {
            handleSuccess('Successfully added.');
        }).catch((ex) => {
            displayBackendError(ex)
        })
        setLoading(false)
    }
    return <Fragment>
        <div className="ml-2"><PageHeader header="Add Student" /></div>
        {loading ? <Loading /> :
            <Card>
                <center>
                    <CardBody>
                        {user == 2 ? <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <> <Col md='1' />
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
                                                <Row >
                                                    <Col md='3'>
                                                        <InputBox name='name' label='Name' handleChange={handleChange} />
                                                        <p style={{ color: 'red' }}>{errors && errors.name}</p></Col>
                                                    <Col md='3'><label>Branch</label>
                                                        <Input type="select" name='branchId' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                                            <option>Select Branch</option>
                                                            {
                                                                BRANCH.map((i, j) => {
                                                                    return <option value={i.id}>{i.name}</option>
                                                                })
                                                            }
                                                        </Input></Col>
                                                    <Col md='3'><label>Class</label>
                                                        <Input type="select" name='class' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                                            <option>Select Year</option>
                                                            {
                                                                CLASS.map((i, j) => {
                                                                    return <option value={i.id}>{i.name}</option>
                                                                })
                                                            }
                                                        </Input>
                                                    </Col>
                                                </Row>
                                                <Row className="pt-2">
                                                    <Col md='3'><label>Section</label>
                                                        <Input type="select" name='sectionId' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                                            <option>Select Section</option>
                                                            {
                                                                SECTION.map((i, j) => {
                                                                    return <option value={i.id}>{i.name}</option>
                                                                })
                                                            }
                                                        </Input></Col>
                                                    <Col md='3'>
                                                        <label>Gender</label>
                                                        <Input type="select" name='gender' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                                            <option>Select gender</option>
                                                            {GENDER.map((i, j) => {
                                                                return <option value={i.id}>{i.name}</option>
                                                            })}
                                                        </Input>
                                                    </Col>
                                                    <Col md='3'>
                                                        <InputBox name='mobileNumber' label='Phone' type='number' handleChange={handleChange} />
                                                    </Col>
                                                </Row>
                                                <Row className="pt-4">
                                                    <Col md='3'>
                                                        <InputBox name='rollNumber' label='Roll Number' handleChange={handleChange} />
                                                        <p style={{ color: 'red' }}>{errors && errors.rollNumber}</p></Col>
                                                    <Col md='3'><InputBox name='admissionNumber' label='Admission No' handleChange={handleChange} /></Col>
                                                    <Col md='3'><InputBox name='dateOfBirth' label='Date of Birth' type='date' handleChange={handleChange} /></Col>
                                                </Row>
                                                <Row className="pt-2">
                                                    <Col md='3'><InputBox name='fatherName' label='Father Name' handleChange={handleChange} /></Col>
                                                    <Col md='3'>
                                                        <label> Caste</label>
                                                        <Input type='select' name='caste' onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                                            <option>Select</option>
                                                            {CASTE.map((i) => {
                                                                return <option value={i.id}>{i.name}</option>
                                                            })}
                                                        </Input>
                                                    </Col>
                                                    <Col md='3'><label>Address</label>
                                                        <textarea name='address' className="form-control"></textarea></Col>
                                                </Row>
                                                <Row className="ml-4">
                                                    <Col md='3'><Button className="btn-success" type="submit">Save</Button></Col>
                                                    <Col md='3'><Button className="btn-danger" type="reset">Clear</Button></Col>
                                                </Row>
                                            </Form>
                                        }}
                                    </Formik>
                                </Col>
                            </>
                        </Row>
                            : <h1 className="text-center">You do not have permission</h1>}
                    </CardBody>
                </center>
            </Card >
        }
    </Fragment>
}
export default AddStudent;