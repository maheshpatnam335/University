import { ATTENDANCELIST } from "./Urls";

const AttendanceList = {
    "name": "AttendanceList",
    "label": "Attendance List",
    "url": ATTENDANCELIST,
    "columns": [
        {
            "name": "name",
            "type": "string",
            "label": "Student Name"
        },
        {
            "name": "branchId",
            "type": "string",
            "label": "Branch"
        },
        {
            "name": "sectionId",
            "type": "string",
            "label": "Section"
        },
        {
            "name": "class",
            "type": "string",
            "label": "Class"
        },
        {
            "name": "rollNumber",
            "type": "string",
            "label": "Roll Number"
        },
        {
            "name": "gender",
            "type": "string",
            "label": "Gender"
        },
        {
            "name": "fatherName",
            "type": "string",
            "label": "Father Name"
        }, {
            "name": "month",
            "type": "string",
            "label": "Month"
        }
        ,
        {
            "name": "attendancePercentage",
            "type": "Int32",
            "label": "Attendance Percentage"
        }
    ]
}
export default AttendanceList;