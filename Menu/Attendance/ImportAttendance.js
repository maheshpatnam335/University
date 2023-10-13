import axios from "axios";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import InputBox from "../../Components/InputBox";
import PageHeader from "../../Components/PageHeader";
import { FileDownload } from "../../DataImports/FileDownload";
import { GetBlobMethod } from "../../Services/MainService";
import SweetAlert, { handleError, handleSuccess } from "../../utils/Sweetalert";

const ImportAttendance = () => {
  const [formData, setFormData] = useState({ month: "", file: "" });
  const handlevalueChnage = (name, value) => {
    if (name == "month") {
      setFormData({ ...formData, month: value });
    }
    if (name.target.name == "file") {
      setFormData({ ...formData, file: name.currentTarget.files[0] });
    }
  };
  const handeSubmit = () => {
    var data = new FormData();
    data.append("file", formData.file);
    data.append("month", formData.month);
    try {
      axios.post("https://localhost:44323/api/Attendance/Attendance", data).then((res) => {
        handleSuccess("SuccessFul");
      });
    } catch {
      handleError("Getting error");
    }
  };
  const downloadSample = () => {
    try {
     GetBlobMethod("https://localhost:44323/api/Attendance/Sample", {
        responseType: 'blob',
      }).then((r) => {
        FileDownload(r.data, `Sample.xlsx`, r.headers['content-type']);
      });
    } catch {
      handleError("Getting error");
    }
  }
  return (
    <Fragment>
      <PageHeader header={"Import Attendance"} />
      <Card>
        <CardBody>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <InputBox
                type="date"
                name="month"
                label="Select Month"
                handleChange={(name, value) => handlevalueChnage(name, value)}
              />
              <p className="pt-5"> Download a <Link onClick={() => downloadSample()}>Sample</Link> file.</p>
            </div>
            <div>
              <label>Upload Sheet</label>
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={(name, value) => handlevalueChnage(name, value)}
              />
            </div>
            <div className="pt-3">
              <Button type="submit" className="btn btn-success" onClick={() => { handeSubmit() }}>
                Upload
              </Button>
            </div>
            <div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default ImportAttendance;
