import axios from "axios";
import { Formik } from "formik";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BiEdit } from 'react-icons/bi';
import { Card, CardBody } from "reactstrap";
import InputBox from "../../Components/InputBox";
import PageHeader from "../../Components/PageHeader";
import { FileDownload } from "../../DataImports/FileDownload";
import Excel from '../../Images/download.jpg';
import { ApiService, GetBlobMethod, GetMethod, PutMethod } from "../../Services/MainService";
import { BRANCH, CLASS, getTextFromArray, SECTION } from "../domain/BranchConstants";
// import MainService, { get } from '../../Services/MainService'
// import ApiService from "../../Services/MainService";

const AttendanceList = () => {
    const [list, setList] = useState([]);
    const [att, setAtt] = useState({ attendance: 0, id: 0 });
    var token = localStorage.getItem('jwtToken');
    useEffect(() => {
        GetMethod('https://localhost:44323/api/Attendance/AttendanceList').then((res) => {
            setList(res.data)
        })
    }, [])

    const handleEdit = (id) => {
        const data = {
            attendance: att.attendance,
            id: att.id
        }
        PutMethod(`https://localhost:44323/api/Attendance/EditAttendanceList`, data).then((res) => {
            console.log(res.data)
        })
    }

    const handleExport = () => {
       GetBlobMethod('https://localhost:44323/api/Attendance/ExcelExport').then((res) => {
            FileDownload(res.data, 'Attendance List', res.headers['content-type'])
        })
    }

    return <Fragment>
        <PageHeader header='Student Attendance List' />
        <Formik
            initialValues={{ att: '' }}
            onSubmit={(values) => handleEdit(values)}>
            {({ values, setFieldValue }) => {
                var att = ''
                const handleValueChange = (name, value, id) => {
                    setFieldValue(name, value)
                    att = value
                    setAtt({ ...att, id: id, attendance: value })
                }

                return <Card>
                    <CardBody>
                        <img src={Excel} onClick={() => handleExport()} className='ExportExcel' title="Export To Excel" />

                        <Table className="table-bordered">
                            <thead>
                                <tr>
                                    <th>Student Name </th>
                                    <th>Student Roll Number</th>
                                    <th>Student Branch</th>
                                    <th>Student Class</th>
                                    <th>Student Section</th>
                                    <th>Student Month</th>
                                    <th>Student Attendance</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((i, j) => {
                                    return <tr key={j}>
                                        <td>{i.student.name}</td>
                                        <td>{i.rollNumber}</td>
                                        <td>{getTextFromArray(BRANCH, i.student.branchId)}</td>
                                        <td>{getTextFromArray(CLASS, i.student.class)}</td>
                                        <td>{getTextFromArray(SECTION, i.student.sectionId)}</td>
                                        <td>{moment(i.month).format(moment.HTML5_FMT.MONTH)}</td>
                                        <td><InputBox value={values[`att${j}`] ? values[`att${j}`] : i.attendancePercentage} name={`att${j}`}
                                            handleChange={(name, value) => handleValueChange(name, value, i.student.id)} /></td>
                                        <td><BiEdit onClick={() => handleEdit(i.student.id)} size='30px ' /></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            }}
        </Formik>

    </Fragment>
}
export default AttendanceList;