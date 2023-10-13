import axios from "axios";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import InputBox from "../../Components/InputBox";
import PageHeader from "../../Components/PageHeader";
import { FileDownload } from "../../DataImports/FileDownload";
import { GetBlobMethod, PostMethod } from "../../Services/MainService";
import { handleError, handleSuccess } from "../../utils/Sweetalert";

const ImportTeachers = () => {
    const [state, setState] = useState({ file: '', month: '' })
    const handleSubmit = () => {
        var formdata = new FormData();
        formdata.append('month', state.month)
        formdata.append('file', state.file)
        try {
            PostMethod('https://localhost:44323/api/Teacher/ImportTeachers', formdata).then((res) => {
                handleSuccess("succesfully imported.")
            })
        } catch {
            handleError("Error getting while importing data");
        }
    }




    const handlevalueChange = (name, value) => {
        if (name == 'month') {
            setState({ ...state, month: value })
        }
        if (name.target.name == 'file') {
            setState({ ...state, file: name.currentTarget.files[0] })
        }
    }
    const downloadSample = () => {
        try {
            GetBlobMethod('https://localhost:44323/api/Teacher/Sample').then((res) => {
                FileDownload(res.data, "TeachersSample.xlsx", res.headers['content-type']);
                handleSuccess("Succesful");
            })
        } catch {
            handleError("Error occured")
        }
    }
    return <Fragment>
        <PageHeader header='Import Teachers' />
        <Card>
            <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <InputBox label='Date' name='month' type='date' handleChange={(name, value) => handlevalueChange(name, value)} />
                        <p className="pt-5">Download <Link onClick={() => downloadSample()}>Sample</Link> file.</p></div>
                    <div>
                        <label>Upload File</label>
                        <input type='file' name='file' onChange={(name, value) => handlevalueChange(name, value)} className='form-control' />
                    </div>
                    <div className="pt-4">
                        <Button type="submit" className="btn btn-success" onClick={() => handleSubmit()}>Import</Button>
                    </div>
                    <div></div>
                </div>
            </CardBody>
        </Card>
    </Fragment>
}
export default ImportTeachers;