import axios from "axios"
import { Form, Formik } from "formik"
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap"
import * as Yup from 'yup'
import InputBox from "../Components/InputBox"
import { alertError } from "../Components/Toast"


const Login = (props) => {
    const [data, setData] = useState([{ id: 0, text: 'Select' }, { id: 1, text: 'Students' }, { id: 2, text: 'Teachers' }]);
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Employee Id or Roll number is required."),
        role: Yup.string().required("Role is a required."),
        password: Yup.string().required("Password is required.")
    })
    const handleSubmit = async (values) => {
        try {
            if (values.role == "Students") values.roleId = 1;
            if (values.role == "Teachers") values.roleId = 2;

            await axios.get(`https://localhost:44323/api/Register/Login?email=${values.email}&password=${values.password}&roleId=${values.roleId}`).then((res) => {
                // SweetAlertMesssage("Successful")
                alert("Succesful")
                localStorage.setItem('login', res.data.id)
                props.history.push('/Dashboard');
            })
        } catch {
            alert("Invalid details")
            alertError();
        }

    }
    return <Fragment>
        <Row md='12' className="pt-5">
            <Col md='5'></Col>
            <Col md='3'>
                <Card className="pt-4" >
                    <CardBody>
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
    </Fragment>
}
export default Login;