import { Formik, Form } from "formik";
import { Fragment } from "react"
import PageHeader from "../../Components/PageHeader";
import * as Yup from 'yup';
import { Button, Card, CardBody, Input, Label } from "reactstrap";
import InputBox from "../../Components/InputBox";
import { PostMethod } from "../../Services/MainService";
import { handleSuccess } from "../../utils/Sweetalert";

const AddEvents = () => {
    // const initialValues = {}
    const validationSchema = Yup.object().shape({

    })

    const handleSubmit = (values) => {
        var formData = new FormData();
        formData.append('name', values.name)
        formData.append('hostName', values.hostName)
        formData.append('description', values.description)
        formData.append('eventType', values.eventType)
        formData.append('date', values.date)
        formData.append('file', values.file)

        PostMethod('https://localhost:44323/api/Events/Events', formData).then((res) => {
            if (res.status == 200) {
                handleSuccess("Successfully added.")
            }
        })
    }

    const handleImage = (e, values) => {
        values.file = e.currentTarget.files[0]
    }

    const SaveEvents = (values) => {

    }
    return <Fragment>
        <Formik
            initialValues={{}}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}>
            {({ values, errors, setFieldValue }) => {
                const handleValueChange = (name, value) => {
                    setFieldValue(name, value)
                }
                return <Form>
                    <PageHeader header="Add Events" />
                    <Card>
                        <CardBody>
                            <div className="div-flex-center">
                                <div className="div-width">
                                    <InputBox label='Name' name='name' handleChange={(name, value) => handleValueChange(name, value)} />
                                </div>
                                <div className="div-width">
                                    <InputBox label='Host Name' name='hostName' handleChange={(name, value) => handleValueChange(name, value)} />
                                </div>
                            </div>
                            <div className="div-flex-center pt-3">
                                <div className="div-width">
                                    <InputBox label='Cheif Guest' name='cheifGuest' handleChange={(name, value) => handleValueChange(name, value)} />
                                </div>
                                <div className="div-width">
                                    <InputBox label='Description' name='description' handleChange={(name, value) => handleValueChange(name, value)} />
                                </div>
                            </div>
                            <div className="div-flex-center pt-3">
                                <div className="div-width">
                                    <label>Select Event Type</label>
                                    <Input name='eventType' onChange={(e) => handleValueChange(e.target.name, e.target.value)} type='select'>
                                        <option>Select</option>
                                        <option value={1}>Cultural</option>
                                        <option value={2}>Technical</option>
                                        <option value={3}>Fun</option>
                                        <option value={4}>Literary</option>
                                    </Input>
                                </div>
                                <div className="div-width">
                                    <InputBox label='Description' name='description' handleChange={(name, value) => handleValueChange(name, value)} />
                                </div>
                            </div>
                            <div className="div-flex-center pt-3">
                                <div className="div-width">
                                    <InputBox type='date' label='Date' name='date' handleChange={(name, value) => handleValueChange(name, value)} />
                                </div>
                                <div className="div-width">
                                    Upload Image
                                    <Input type='file' name='file' onChange={(e) => handleImage(e, values)} />
                                </div>
                            </div>
                            <div className="pt-4 text-center">
                                <Button className="btn btn-success" type='submit' onClick={() => SaveEvents}>Save</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Form>
            }}
        </Formik>
    </Fragment>
}
export default AddEvents;