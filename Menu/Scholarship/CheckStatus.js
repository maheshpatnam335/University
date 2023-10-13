import axios from "axios";
import { Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Button, Card, CardBody, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import PageHeader from "../../Components/PageHeader";
import { GetMethod } from "../../Services/MainService";
import * as utils from '../../utils/DisplayError'
import { handleError } from "../../utils/Sweetalert";
import { CASTE, CLASS, getTextFromArray, SCOLARSHIPSTATUS } from "../domain/BranchConstants";

const CheckStatus = () => {

    const [state, setState] = useState({ rollNumber: '', year: '' })
    const [students, setStudents] = useState([]);
    const [modal, setModal] = useState(false)
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetMethod('https://localhost:44323/api/Student/List').then((res) => {
            setStudents(res.data)
        })
    }, [])

    const handleValueChange = (e) => {
        if (e.target) {
            if (e.target.name == 'year') {
                setState({ ...state, year: e.target.value })
                return;
            }
        }
        setState({ ...state, rollNumber: e.length > 0 ? e[0].rollNumber : '' })
    }

    const handleSubmit = () => {
        let joiningYear = parseInt("20" + state.rollNumber[0] + state.rollNumber[1])
        var academicYear = parseInt(state.year.split('-')[0])
        if (academicYear > joiningYear + 3 || academicYear < joiningYear || state.year == '') {
            if (state.rollNumber == '') {
                handleError("Roll number required.")
            }
            else {
                handleError("Please select valid academic year");
            }

            return;
        }
        setLoading(true)
        GetMethod(`https://localhost:44323/api/Scholarship/Status?rollNumber=${state.rollNumber}&academicYear=${state.year}`).then((res) => {
            setDetails(res.data)
        }).catch((er) => {
            utils.displayBackendError(er)
        })
        setLoading(false);
        setModal(!modal);
    }
    const toggle = () => setModal(!modal);
    return <Fragment>
        <PageHeader header='Check Scholatship Status' />
        <Card>
            <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <label>Roll number</label>
                        <AsyncTypeahead options={students ? students : []} labelKey='rollNumber' onChange={(e) => handleValueChange(e)} />
                    </div>
                    <div>
                        <label>Select Year</label>
                        <Input type='select' name='year' onChange={(e) => handleValueChange(e)} className="div-width">
                            <option>Select Year</option>
                            <option>2016-2017</option>
                            <option>2017-2018</option>
                            <option>2018-2019</option>
                            <option>2019-2020</option>
                            <option>2020-2021</option>
                            <option>2021-2022</option>
                            <option>2022-2023</option>
                            <option>2023-2024</option>
                        </Input>
                    </div>
                    <div className="pt-4">
                        <Button disabled={loading ? true : false} type="submit" onClick={() => handleSubmit()} className="btn btn-success">{loading ? "Please wait" : "Get Status"}</Button>
                    </div>
                    <div></div>
                </div>
            </CardBody>
            <Modal isOpen={modal} toggle={toggle} size='lg' className="div-padding-center-modal-lg">
                <ModalHeader className="div-center">
                    <h5 className="div-text-bold">Scholarship status of : {" " + details.academicYear}</h5>
                </ModalHeader>
                <ModalBody>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div >
                            <p> Name :<strong>{details ? (details.student ? details.student.name : '') : ''}</strong> </p>
                            <p>Academic Year:<strong>{details ?? details.academicYear ? details.academicYear : ''}</strong></p>
                            <p>Status:<strong>{details ?? details.status ? getTextFromArray(SCOLARSHIPSTATUS, details.status) : ''}</strong></p>
                            <p>Pending At:<strong>{details ?? details.pendingAt ? details.pendingAt : ''}</strong></p>
                            <p>IsPending:<strong>{details ?? details.isPending ? details.isPending : ''}</strong></p>
                            <p>Remmited Date:<strong>{details ?? details.remmittedDate ? details.remmittedDate : ''}</strong></p>
                            <p>Caste:<strong>{details ? (details.student ? getTextFromArray(CASTE, details.student.caste) : '') : ''}</strong></p>
                        </div>
                        <div >
                            <p> Application Number :<strong>{details ? (details.applicationNumber ? details.applicationNumber : '') : ''}</strong> </p>
                            <p> Date Of Birth:<strong>{details ? (details.student ? details.student.dateOfBirth : '') : ''}</strong> </p>
                            <p> Class:<strong>{details ? (details.student ? getTextFromArray(CLASS, details.student.class) : '') : ''}</strong> </p>
                            <p>Roll Number:<strong>{details ?? details.rollNumber ? details.rollNumber : ''}</strong></p>
                            <p>Tution Fee Released : <strong>{details ?? details.tutionFee ? details.tutionFee : ''}</strong></p>
                            <p>Mess Fee Released : <strong>{details ?? details.messFee ? details.messFee : ''}</strong></p>
                            <p>Exam Fee Released : <strong>{details ?? details.examFee ? details.examFee : ''}</strong></p>

                        </div>
                        <div />
                    </div>
                </ModalBody>
            </Modal>
        </Card>
    </Fragment>
}
export default CheckStatus;