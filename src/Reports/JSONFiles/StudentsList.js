import { STUDENTLIST } from "./Urls";

export const StudentsList = {
    "name": "StudentsList",
    "url": STUDENTLIST,
    "Label":"Students List",
    "columns": [
        {
            "name": "name",
            "type": "string",
            "label": "Name"
        }
        ,
        {
            "name": "branchId",
            "type": "string",
            "label": "Branch"
        },
        {
            "name": "class",
            "type": "string",
            "label": "Class"
        },
        {
            "name": "sectionId",
            "type": "string",
            "label": "Section"
        },
        
        {
            "name": "rollNumber",
            "type": "string",
            "label": "Roll Number"
        },
        
        {
            "name": "admissionNumber",
            "type": "string",
            "label": "Admission Number"
        },
        {
            "name": "dateOfBirth",
            "type": "string",
            "label": "Date of Birth"
        },
        {
            "name": "fatherName",
            "type": "string",
            "label": "Father Name"
        },
        {
            "name": "gender",
            "type": "string",
            "label": "Gender"
        },
        {
            "name": "mobileNumber",
            "type": "string",
            "label": "Mobile Number"
        }
    ]
}