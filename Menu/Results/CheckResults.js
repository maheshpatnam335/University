import queryString from 'query-string';
import { Fragment, useEffect, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Button, Card, CardBody, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import InputBox from "../../Components/InputBox";
import PageHeader from "../../Components/PageHeader";
import { FileDownload } from "../../DataImports/FileDownload";
import Excel from '../../Images/download.jpg';
import { GetBlobMethod, GetMethod } from "../../Services/MainService";
import { displayBackendError } from "../../utils/DisplayError";
import { BRANCH, CLASS, GENDER, getTextFromArray } from "../domain/BranchConstants";

const CheckResults = () => {debugger
    const [students, setStudents] = useState([]);
    const [results, setResults] = useState([])
    const [modal, setModal] = useState(false)
    const [state, setState] = useState({ rollNumber: '', date: '', class: '', semester: '' })
    useEffect(() => {
        GetMethod('https://localhost:44323/api/Student/List').then((res) => {
            setStudents(res.data);
        })
    }, [])

    const handleValueChange = (name, value) => {
        if (name == 'dob') {
            setState({ ...state, date: value })
        }
        if (name.target.name == 'class') {
            setState({ ...state, class: name.target.value })
        }
        if (name.target.name == 'semester') {
            setState({ ...state, semester: name.target.value })
        }
    }
    const handleSubmit = () => {
        const data = {
            rollNumber: state.rollNumber,
            dob: state.date,
            semester: state.semester,
            class: state.class
        }
        GetMethod(`https://localhost:44323/api/Results/CheckResults?${queryString.stringify(data)}`).then((res) => {
          if (res.data.hasError) {
                return displayBackendError(res.data.messages[0].messageContent)
            } else {
                setResults(res.data);
                setModal(!modal)
            }
        }).catch((err) => {
            displayBackendError(err);
        })
    }
    const handleChange = (selected) => {
        setState({ ...state, rollNumber: selected.length>0?selected[0].rollNumber :[]})
    }

    const toggle = () => setModal(!modal);

    const handleExport = () => {
        GetBlobMethod('https://localhost:44323/api/Results/ExportResults').then((res) => {
            FileDownload(res.data, 'Results', res.headers['content-type'])
        })
    }
    console.log(results);
    debugger
    return <Fragment>
        <PageHeader header={'Check Results'} />
        <Card>
            <CardBody>
                <div className="div-flex-center">
                    <div>
                        <label>Roll Number</label>
                        <AsyncTypeahead
                            name='rollNumber'
                            labelKey={'rollNumber'}
                            options={students}
                            onChange={(selected) => handleChange(selected)}
                            selected={students.rollNumber}
                        />
                    </div>
                    <div>
                        <InputBox type='date' label='Select DOB' name='dob' handleChange={(name, value) => handleValueChange(name, value)} />
                    </div>
                    <div>
                        <img src={Excel} onClick={() => handleExport()} className='Export-to-Excel-size' title="Export Results To Excel" />
                    </div>
                </div>
                <div className="div-flex-center pt-3">
                    <div>
                        <label>Select Class</label>
                        <Input type="select" name="class" onChange={(name, value) => handleValueChange(name, value)} className="div-width">
                            <option>Select</option>
                            {CLASS.map((i, j) => {
                                return <option value={i.id}>{i.name}</option>
                            })
                            }
                        </Input>
                    </div>
                    <div>
                        <label>Select Semester</label>
                        <Input type="select" name="semester" onChange={(name, value) => handleValueChange(name, value)} className="div-width">
                            <option>Select</option>
                            <option>1</option>
                            <option>2</option>
                        </Input>
                    </div>
                    <div className="pt-4">
                        <Button onClick={() => handleSubmit()} className="btn btn-success">Check</Button>
                    </div>
                </div>
            </CardBody>
          {results.returnValue &&  <Modal isOpen={modal} toggle={toggle} centered={true} size='lg'>
                <ModalHeader className="div-center">
                    <h5 className="div-text-bold"> Results of {getTextFromArray(CLASS, results.student ? results.student.class : '') + ' ' + "Semester " + results.semester}</h5>
                </ModalHeader>
                <ModalBody>
                    <div className="div-space-around">
                        <div>
                            <p>Student Roll Number :<strong>{"  " + results.returnValue.rollNumber}</strong> </p>
                            <p>Student  Name :<strong>{results.returnValue.student ? results.returnValue.student.name : ''}</strong> </p>
                            <p>Father  Name :<strong>{results.student ? results.student.fatherName : ''}</strong> </p>
                            <p>Gender :<strong>{getTextFromArray(GENDER, results.returnValue.student ? results.returnValue.student.gender : '')}</strong> </p>
                            <p>Grade :<strong>{results.returnValue.totalMarks > 500 ? "A" :
                                (results.returnValue.totalMarks < 500 & results.returnValue.totalMarks > 400 ? "B" : "C")}</strong> </p>
                        </div>
                        <div>
                            <p>Class :<strong>{"  " + getTextFromArray(CLASS, results.returnValue.student ? results.returnValue.student.class : '')}</strong></p>
                            <p>Branch :<strong>{"  " + getTextFromArray(BRANCH, results.returnValue.student ? results.returnValue.student.branchId : '')}</strong></p>
                            <p>Semester :<strong>{"  " + results.returnValue.semester}</strong></p>
                            <p>Total Marks :<strong>{"  " + results.returnValue.totalMarks}</strong></p>
                            <p>Percentage :<strong>{"  " + ((results.returnValue.totalMarks * 100) / 600) + "%"}</strong></p>
                        </div>
                        <div>
                            <Button onClick={()=>window.location.print()} color='info'> Print</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>}
        </Card>
    </Fragment>
}
export default CheckResults;