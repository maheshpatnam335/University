import axios from "axios";
import { Form, Formik } from "formik";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
import * as Yup from 'yup';
import InputBox from "../Components/InputBox";
import PageHeader from "../Components/PageHeader";
//import 'react-widgets/dist/css/react-widgets.css'

const Register = (props) => {
    const [data, setData] = useState([{ id: 0, text: 'Select' }, { id: 1, text: 'Students' }, { id: 2, text: 'Teachers' }]);
    const [role, setRole] = useState(0);
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        roleNumber: '',
        employeeId: '',
        password: '',
        confirmPassword: '',
        roleId: 0,
        role: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Employee Id or Roll number is required"),
        role: Yup.string().required("Role is a required"),
        password: Yup.string().required("Password is required."),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null]).required()
    })
    const handleSubmit = async (values) => {
        try {
            if (values.role == "Students") {
                values.roleId = 1
            }
            if (values.role == "Teachers") {
                values.roleId = 2
            }
            await axios.post(`https://localhost:44323/api/Register`, values).then((res) => {
                alert("Succesful");
                props.history.push('/')
            })
        }
        catch(exception) {
            alert('Getting errror')
        }

    }
    return <Fragment>
        <Card>
            <CardBody>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values, errors, setFieldValue }) => {
                        const handleChange = async (name, value) => {
                            setFieldValue(name, value)
                            if (value == "Students") {
                                setRole(1);
                            }
                            if (value == "Teachers") {
                                setRole(2);
                            }
                            if (value == "Select") {
                                setRole(0)
                            }
                        }
                        return <Form>
                            <center>
                                <PageHeader header='Register' />
                                <Row>
                                    <Col md='4' />
                                    <Col md='2'>
                                        <InputBox name='firstName' label='First Name' handleChange={handleChange} />
                                    </Col>
                                    <Col md='2'>
                                        <InputBox name='lastName' label="Last Name" handleChange={handleChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='4' />
                                    <Col md='2'>
                                        <InputBox name='email' type='email' label='Email' handleChange={handleChange} />
                                        <p style={{ color: 'red' }}>{errors && errors.email}</p>
                                    </Col>
                                    <Col md='2'>
                                        <InputBox name='mobileNumber' label='Mobile Number' type='number' handleChange={handleChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='4' />

                                    <Col md='2'>
                                        <label>Select role</label>
                                        <Input type="select" name="role"
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        >
                                            {data.map((i, j) => {
                                                return <option>{i.text} </option>
                                            })}
                                        </Input>
                                        <p style={{ color: 'red' }}>{errors && errors.role}</p>
                                    </Col>
                                    <Col md='2'>
                                        {role == 1 ?
                                            <InputBox name='roleNumber' label='Rollnumber' handleChange={handleChange} />
                                            :
                                            (role == 2 ? <InputBox name='employeeId' label='Employee Id' handleChange={handleChange} />
                                                : <InputBox name='' label='Employee Id/Roll number' disabled={true} />)
                                        }

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='4' />
                                    <Col md='2'>
                                        <InputBox type='password' name='password' label='Password' handleChange={handleChange} />
                                        <p style={{ color: 'red' }}>{errors && errors.password}</p>
                                    </Col>
                                    <Col md='2'>
                                        <InputBox type='password' name='confirmPassword' label='Password' handleChange={handleChange} />
                                        <p style={{ color: 'red' }}>{errors && errors.confirmPassword}</p>
                                    </Col>
                                </Row>
                                <Row className="pt-4">
                                    <Col md='4' />
                                    <Col md='2'>
                                        <Button type='submit' className="btn btn-success">Register</Button>
                                    </Col>
                                    <Col md='2'><Button type="reset" className="btn btn-warning">Clear</Button></Col>
                                </Row>
                                <Row className="pt-4">
                                    <p>If already had an account please <Link to='/'>Login</Link></p>
                                </Row>
                            </center>
                        </Form>
                    }}
                </Formik>

            </CardBody>
        </Card>
    </Fragment>
}
export default Register;