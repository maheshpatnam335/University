import axios from "axios"
import { Form, Formik } from "formik"
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap"
import * as Yup from 'yup'
import InputBox from "../Components/InputBox"
import { handleError, handleSuccess } from "../utils/Sweetalert"


const Login = (props) => {
    // var logId = localStorage.getItem('login');
    // if (logId != null && logId != 0) {
    //     Success(logId);
    // }
    const [data, setData] = useState([{ id: 0, text: 'Select' }, { id: 1, text: 'Students' }, { id: 2, text: 'Teachers' }]);
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Employee Id or Roll number is required."),
        role: Yup.string().required("Role is a required."),
        password: Yup.string().required("Password is required.")
    })
    const Success = (data) => {
        localStorage.setItem('user', data.jwtToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        localStorage.setItem('refreshTokenExpiry', data.refreshTokenExpiry);
        localStorage.setItem('roleId', data.roleId);
        localStorage.setItem('login', data.loginId);
        props.history.push('/Dashboard')
    }



    const handleSubmit = async (values) => {
        try {
            if (values.role == "Students") values.roleId = 1;
            if (values.role == "Teachers") values.roleId = 2;

            await axios.get(`https://localhost:44323/api/Register/Login?email=${values.email}&password=${values.password}&roleId=${values.roleId}`).then((res) => {
                if (res.data.hasError) {
                    handleError(res.data.messages[0].messageContent)
                    return;
                }
                Success(res.data);
                handleSuccess("Successfully logged in.")
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })

        } catch {
            handleError("Invalid details")
        }

    }
    return <div className="back-image">
        <Row md='12' className="pt-5 p-4 pb-5">
            <Col md='5'></Col>
            <Col md='3'>
                <Card className=" back1-image p-4" style={{ borderRadius: '15px' }}>
                    <CardBody  className="pt-4" style={{ borderRadius: '15px' }} >
                        <Formik
                            initialValues={{ email: '', password: '', role: '', roleId: 0 }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({ errors, values, setFieldValue }) => {
                                const handleChange = (name, value) => {
                                    setFieldValue(name, value)
                                    if (value == "Students") {
                                        values.role = 1
                                    }
                                    if (value == "Teachers") {
                                        values.role = 2
                                    }
                                }
                                return <Form className="">
                                    <InputBox name='email' label='RollNumber/EmployeeId' handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.email}</p>
                                    <InputBox name='password' type='password' label='Password' handleChange={handleChange} />
                                    <p style={{ color: 'red' }}>{errors && errors.password}</p>
                                    <Col><label>Login as</label>
                                        <Input type="select" name="role"
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        >
                                            {data.map((i, j) => {
                                                return <option>{i.text} </option>
                                            })}
                                        </Input>
                                        <p style={{ color: 'red' }}>{errors && errors.role}</p>
                                    </Col>
                                    <Row className="pt-4">
                                        <Col ><Button type="submit" className="btn btn-success">Login</Button></Col>
                                        <Col><Button type="reset" className="btn btn-danger">Clear</Button></Col>

                                    </Row>
                                    <Row className="pt-4">
                                        <p>If new user, please <Link to='/Register'>Register</Link> first</p>
                                    </Row>
                                </Form>
                            }}
                        </Formik>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
}
export default Login;