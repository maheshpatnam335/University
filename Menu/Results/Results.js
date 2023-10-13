import axios from "axios";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Input } from "reactstrap";
import InputBox from "../../Components/InputBox";
import PageHeader from "../../Components/PageHeader";
import { FileDownload } from "../../DataImports/FileDownload";
import { GetBlobMethod, PostMethod } from "../../Services/MainService";
import * as utils from '../../utils/Sweetalert'
const ImportResults = () => {
    const [state, setState] = useState({ date: '', file: '' })
    const handleValueChange = (name, value) => {
        if (name == 'date') {
            setState({ ...state, date: value })
        }
        if (name.target.name = 'file') {
            setState({ ...state, file: name.currentTarget.files[0] })
        }
    }

    const handleSubmit = (name, value) => {
        var formData = new FormData();
        formData.append('month', state.date)
        formData.append('file', state.file)
       PostMethod('https://localhost:44323/api/Results/Import', formData).then((res) => {
            utils.handleSuccess("SAved Succesfully.")
        })
    }
    const sampleSownload = (name, value) => {
        GetBlobMethod('https://localhost:44323/api/Results/Sample').then((res) => {
            FileDownload(res.data, "ResultsSample", res.headers['content-type'])
        })
    }

    return <Fragment>
        <PageHeader header={'Import Results'} />
        <Card>
            <CardBody>
                <div className="div-flex-center">
                    <div>
                        <InputBox type='date' name='date' handleChange={(name, value) => handleValueChange(name, value)} label='Select date' />
                        <p className="pt-5">Download<Link onClick={() => sampleSownload()}>Sample</Link>file.</p>
                    </div>
                    <div>
                        <label>Upload file</label>
                        <Input type='file' name='file' onChange={(e) => handleValueChange(e)} />
                    </div>
                    <div className="pt-4">
                        <Button className="btn btn-success" onClick={() => handleSubmit()}>Import</Button>
                    </div>
                </div>

            </CardBody>
        </Card>
    </Fragment>
}
export default ImportResults;