import { Formik } from "formik";
import { Fragment, useEffect, useState } from "react"
import { Button, Card, CardBody } from "reactstrap";
import InputBox from "../Components/InputBox";
import PageHeader from '../Components/PageHeader'
import Loading from "../Menu/domain/Loading";
import { GetMethod } from "../Services/MainService";

const UpdateProfile = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    var logId = localStorage.getItem('login');
    useEffect(() => {
        GetMethod(GetMethod(`https://localhost:44323/api/Register/Id?Id=${logId}`).then((res) => {
            setData(res.data)
            setLoading(false)
        }))
    }, [])
    const initialValues = data;
    const handleValueChange = (name, value) => {

    }
    const handleSubmit = (values) => {

    }
    return <Fragment>
        <PageHeader header="Update Profile" />
        {loading ? <Loading /> :
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ values, errors, setFieldValue }) => {
                    return <Card>
                        <CardBody>
                            <div className="pl-3">
                                <div className="div-space-around pl-3">
                                    <div>
                                        <InputBox label='First Name' name='firstName' value={values['firstName']}
                                            handleChange={(name, value) => handleValueChange(name, value)} />
                                    </div>
                                    <div>
                                        <InputBox label='Last Name' name='lastName' value={values['lastName']}
                                            handleChange={(name, value) => handleValueChange(name, value)} />
                                    </div>
                                </div>
                                <div className="div-space-around pl-3">
                                    <div>
                                        <InputBox label='Email' name='email' value={values['email']}
                                            handleChange={(name, value) => handleValueChange(name, value)} />
                                    </div>
                                    <div>
                                        <InputBox label='MobileNumber' name='mobileNumber' value={values['mobileNumber']}
                                            handleChange={(name, value) => handleValueChange(name, value)} />
                                    </div>
                                </div>
                                <div className="div-space-around pl-3">
                                    <div>
                                        <InputBox label='Password' name='password' value={values['password']}
                                            handleChange={(name, value) => handleValueChange(name, value)} />
                                    </div>
                                    <div>
                                        <InputBox label='Confirm Password' name='confirmPassword' value={values['confirmPassword']}
                                            handleChange={(name, value) => handleValueChange(name, value)} />
                                    </div>
                                </div>
                                <div className="pt-5 pl-3 justify-content-center" >
                                    <div><Button color="info" >Cancel</Button></div>
                                    <div><Button color="success" className="pl-3">Update</Button></div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                }}
            </Formik>
        }
    </Fragment>
}
export default UpdateProfile;