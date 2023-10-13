import axios from "axios"
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, Input } from "reactstrap"
import InputBox from "../../Components/InputBox"
import PageHeader from "../../Components/PageHeader"
import { FileDownload } from "../../DataImports/FileDownload"
import { GetBlobMethod, PostMethod } from "../../Services/MainService"
import { handleError, handleSuccess } from "../../utils/Sweetalert"

const ImportScholarship = () => {
    const [state, setState] = useState({ date: '', file: '' })
    const handleValueChange = (name, value) => {
        if (name == 'date') {
            setState({ ...state, date: value })
        }
        if (name.target.name == 'file') {
            setState({ ...state, file: name.currentTarget.files[0] })
        }
    }
    const handleSubmit = () => {
        if (state.file != '') {
            var formData = new FormData();
            formData.append('file', state.file)
            formData.append('date', state.date)
            PostMethod('https://localhost:44323/api/Scholarship', formData).then((res) => {
                handleSuccess("Succesfully uploaded the data.")
            });
        } else {
            handleError("Excel sheet is required.")
        }
    }
    const downloadSample = () => {
        GetBlobMethod('https://localhost:44323/api/Scholarship/Sample').then((res) => {
            FileDownload(res.data, "ScholarshipSample", res.headers['content-type'])
        })
    }
    return <Fragment>
        <PageHeader header="Import Scholarship" />
        <Card>
            <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <InputBox type='date' label='Select date' name='date' handleChange={(name, value) => handleValueChange(name, value)} />
                        <p className="pt-5">Download <Link onClick={() => downloadSample()}>Sample</Link> file.</p>
                    </div>
                    <div><label>Upload Excel sheet</label><Input type='file' name='file' onChange={(e) => handleValueChange(e)} />
                    </div>
                    <div className="pt-4">
                        <Button type="submit" className="btn btn-success" onClick={() => handleSubmit()}>Import</Button>
                    </div>
                    <div />
                </div>
            </CardBody>
        </Card>
    </Fragment>
}
export default ImportScholarship;