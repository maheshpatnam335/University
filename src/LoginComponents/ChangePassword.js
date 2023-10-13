import axios from "axios";
import { Fragment, useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import InputBox from "../Components/InputBox";
import { handleSuccess } from "../utils/Sweetalert";

const ChangePassword = (props) => {
    const [state, setState] = useState({ oldPassword: '', newPassword: '', cPassword: '' })
    const [error, setError] = useState(false);
    const handleChange = (name, value) => {
        if (name == 'oldPassword') {
            setState({ ...state, oldPassword: value })
        }
        if (name == 'newPassword') {
            setState({ ...state, newPassword: value })
        }
        if (name == 'cPassword') {
            setState({ ...state, cPassword: value })
        }
    }
    const handleSubmit = () => {
        try {
            axios.put(`https://localhost:44323/api/Register/ChangePassword?oldPassword=${state.oldPassword}&newPassword=${state.newPassword}`).then((res) => {
                localStorage.removeItem('login')
                handleSuccess();
                props.history.push('/Login')
            })

        } catch {

        }
    }
    return <Fragment>
        <Row className="pt-4">
            <Col md='2' />
            <Col md='4'>
                <Card >
                    <CardHeader >Change Password</CardHeader>
                    <CardBody className="pb-4"> 
                        <InputBox label='Old Password' name='oldPassword' handleChange={(name, value) => handleChange(name, value)} />
                        <InputBox label='New Password' name='newPassword' handleChange={(name, value) => handleChange(name, value)} />
                        <InputBox label='Confirm Password' name='cPassword' handleChange={(name, value) => handleChange(name, value)} />
                        <Row className="pt-4">
                            <Col>
                                <Button className="bg-success" onClick={() => handleSubmit()}>
                                    Save</Button></Col>
                            <Col>
                                <Button className="bg-danger">Cancel</Button></Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col md='3'>
                <Card>
                    <CardBody>
                        <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={5}
                            value={state.newPassword}
                            valueAgain={state.cPassword}
                            onChange={(isValid) => {
                                handleChange('validPassword', isValid);
                            }}
                        />
                    </CardBody>
                </Card>

            </Col>
        </Row>
    </Fragment>
}
export default ChangePassword;