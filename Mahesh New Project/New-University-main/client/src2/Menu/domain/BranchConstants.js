import { replace } from "formik"
import moment from "moment"

export const BRANCH = [{ id: 1, name: "Civil Engg" }, { id: 2, name: "Mechanical Engg" }
    , { id: 3, name: "Computer science Engg" }
    , { id: 4, name: "Electrical and electronics Engg" }
    , { id: 5, name: "Electrical and communication Engg" }
    , { id: 6, name: "Mining Engg" }
    , { id: 7, name: "Chemical Engg" }
]
export const GENDER = [{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }]

export const CASTE = [{ id: 1, name: 'BC-D' }]

export const QUALIFICATION = [{ id: 1, name: 'Phd' }, { id: 2, name: 'PG' }, { id: 2, name: 'UG' }]

export const MARITALSTATUS = [{ id: 1, name: 'Married' }, { id: 2, name: 'UnMarried' }]

export const CLASS = [{ id: 1, name: "Ist-year" }, { id: 2, name: "IInd-year" }
    , { id: 3, name: "IIIrd-year" }, { id: 4, name: "IVth-year" }]
export const SECTION = [{ id: 1, name: "A" }, { id: 2, name: "B" }, { id: 3, name: "C" }, { id: 4, name: "D" }]

export const getTextFromArray = (array = [], value) => {
    let d = array.find(x => x.id == value);
    if (d) {
        return d.name
    }
    return '-'
}

export const getFullDate = (date) => {
    
    return moment(date).format(moment.HTML5_FMT.DATE).replace('T', '')
    //HTML5_FMT.DATETIME_LOCAL;

}