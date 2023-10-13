import axios from "axios"
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap"
import InputBox from "../../Components/InputBox"
import PageHeader from "../../Components/PageHeader"
import { FileDownload } from "../../DataImports/FileDownload"
import { GetBlobMethod, PostMethod } from "../../Services/MainService"
import * as utils from '../../utils/DisplayError'
import { handleError, handleSuccess } from "../../utils/Sweetalert"

const Import = () => {
    const [state, setState] = useState({ month: '', file: '' })
    const handlevaluechange = (name, value) => {
        if (name == 'month') {
            setState({ ...state, month: value })
        }
        if (name.target.name == 'file') {
            setState({ ...state, file: name.currentTarget.files[0] })
        }

    }
    const downloadSample = () => {
        GetBlobMethod('https://localhost:44323/api/Student/StudentSample').then((res) => {
            FileDownload(res.data, 'StudentsSample.xlsx', res.headers['content-type'])
        })
    }
    const handleSubmit = () => {
        console.log(state)
        var formData = new FormData();
        formData.append("file", state.file);
        formData.append("month", state.month);
        PostMethod('https://localhost:44323/api/Student/Import', formData).then((res) => {
            handleSuccess("Successful");
        }).catch((err) => {
            utils.displayBackendError(err)
        })
    }
    return <Fragment>
        <PageHeader header={'Import Students'} />
        <Card>
            <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>   <InputBox type='date' label='Select Date' name='month' handleChange={(name, value) => handlevaluechange(name, value)} />
                        <p className="pt-5">
                            Download <Link onClick={() => downloadSample()}>Sample</Link> file.
                        </p>
                    </div>
                    <div>
                        <label>Upload file</label>
                        <input type='file' name='file' onChange={(name, value) => handlevaluechange(name, value)} className='form-control' />
                    </div>
                    <div className="pt-4"><Button type="submit" onClick={() => handleSubmit()} className='btn btn-success'>Import</Button></div>
                    <div />
                </div>
            </CardBody>
        </Card>
    </Fragment>
}
export default Import;