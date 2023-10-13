import { Fragment, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Label } from "reactstrap";
import InputBox from "../../Components/InputBox";
import PageHeader from "../../Components/PageHeader";
import { FileDownload } from "../../DataImports/FileDownload";
import { GetBlobMethod, PostMethod } from "../../Services/MainService";
import { handleSuccess } from "../../utils/Sweetalert";

const ImportBooks = () => {
    const [state, setState] = useState({ date: '', file: '' })

    const handleValueChange = (name, value) => {
        if (name == 'date') {
            setState({ ...state, date: value })
        }
        if (name.target.name == 'file') {
            setState({ ...state, file: name.currentTarget.files[0] })
        }
    }

    const Sample = () => {
        GetBlobMethod('https://localhost:44323/api/Library/Sample').then((res) => {
            FileDownload(res.data, "Sample", res.headers["content-type"])
        })
    }

    const Import = () => {
        var formData= new FormData();
        formData.append('month', state.date)
        formData.append('file', state.file)
        PostMethod('https://localhost:44323/api/Library/Import', formData).then((res)=>{
            if(res.status==200){
                handleSuccess("Uploaded succesfully")
            }
        })
    }
    return <Fragment>
        <PageHeader header="Import Books" />
        <Card>
            <div className="div-space-around pt-3">
                <div><InputBox label="Select Date" name='date' type='date' handleChange={(name, value) => handleValueChange(name, value)} /></div>
                <div><Label>Import File</Label>
                    <input type='file' name="file" onChange={(e) => handleValueChange(e)} className='form-control' /> </div>
                <div><Button className="btn btn-success" type="success" onClick={() => Import()}>Import</Button> </div>
            </div>
            <div className="pt-3 pl-1">Download <Link onClick={() => Sample()}>Sample </Link> file.</div>
        </Card>
    </Fragment>
}
export default ImportBooks;