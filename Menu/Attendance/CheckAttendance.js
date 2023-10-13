import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Button, Card, CardBody, Modal, ModalBody, ModalHeader } from "reactstrap";
import InputBox from "../../Components/InputBox";
import PageHeader from "../../Components/PageHeader";
import { GetMethod } from "../../Services/MainService";
import { handleError } from "../../utils/Sweetalert";
import { BRANCH, CLASS, getFullMonth, getTextFromArray, SECTION } from "../domain/BranchConstants";
import Loading from "../domain/Loading";

const CheckAttendance = () => {
    const [students, setStudents] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({ rollnumber: '', month: '', studentDetails: [] })
    const handleValueChange = (name, value) => {
        if (name == 'month') {
            setState({ ...state, month: value })
        } else {
            setState({ ...state, rollnumber: name.length > 0 ? name[0].rollNumber : '' })
        }
    }
    useEffect(() => {
        setLoading(true)
        GetMethod('https://localhost:44323/api/Student/List').then((res) => {
            setStudents(res.data)
        })
        setLoading(false)
    }, [])

    const handleSubmit = () => {
        setLoading(true)
        if (state.rollnumber != '' && state.month != '') {
            GetMethod('https://localhost:44323/api/Attendance/AttendanceList').then((res) => {
                var studentdetail = res.data.filter(x => x.rollNumber == state.rollnumber && getFullMonth(x.month) == getFullMonth(state.month))
                setState({ ...state, studentDetails: studentdetail })
                setModal(!modal)
            })
        } else {
            handleError("Roll number or Month is required.")
        }
        setLoading(false)
    }
    const toggle = () => setModal(!modal)
    return <Fragment>
        <PageHeader header='Check Attendance' />
        {loading ? <Loading /> :
            <Card>
                <CardBody>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div>
                            <label>Roll Number</label>
                            <Typeahead
                                name='rollNumber'
                                placeholder="Enter the RollNumber"
                                labelKey={'rollNumber'}
                                onChange={(name, value) => handleValueChange(name, value)}
                                options={students ? students : []}
                            />
                        </div>
                        <div>
                            <InputBox type='month' name='month' label='Select Date' handleChange={(name, value) => handleValueChange(name, value)} />
                        </div>
                        <div className="pt-3">
                            <Button className="btn btn-info" onClick={() => handleSubmit()}>Check</Button>
                        </div>
                        <div />
                    </div>
                    <Modal isOpen={modal} toggle={toggle} className="div-margin-top">
                        {state.studentDetails.map((i) => {
                            return <>
                                <ModalHeader >
                                    <h5 className="div-text-bold">Attendance of <strong>{" :  " + moment(i.month).format(moment.HTML5_FMT.MONTH)}</strong></h5>
                                </ModalHeader>
                                <ModalBody >
                                    <tr >
                                        <td style={{ paddingRight: '100px' }}>Name<strong>{" : " + i.student.name}</strong></td>
                                        <td>Branch<strong>{" : " + getTextFromArray(BRANCH, i.student.branchId)}</strong></td>
                                        <td />
                                    </tr>
                                    <tr >
                                        <td style={{ paddingRight: '100px' }}>Class<strong>{" : " + getTextFromArray(CLASS, i.student.class)}</strong></td>
                                        <td>Section<strong>{" : " + getTextFromArray(SECTION, i.student.sectionId)}</strong></td>
                                        <td />
                                    </tr>
                                    <tr >
                                        <td style={{ paddingRight: '100px' }}>Roll Number<strong>{" : " + i.student.rollNumber}</strong></td>
                                        <td>Attendance Percentage<strong>{" : " + i.attendancePercentage + "%"}</strong></td>
                                        <td />
                                    </tr>
                                </ModalBody>
                            </>
                        })}
                    </Modal>

                </CardBody>
            </Card>
        }
    </Fragment>
}
export default CheckAttendance;