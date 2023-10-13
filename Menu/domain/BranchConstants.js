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
export const SCOLARSHIPSTATUS = [{ id: 1, name: 'Pending' }, { id: 2, name: 'Ready to credit' }, { id: 3, name: 'Credited' }]
export const getTextFromArray = (array = [], value) => {
    let d = array.find(x => x.id == value);
    if (d) {
        return d.name
    }
    return '-'
}

export const SPORT_TYPE = [{ id: 1, value: 'Indoor' }, { id: 2, value: 'Outdoor' }]

export const SPORT = [{ id: 1, value: 'Cricket', sportId: 2 }, { id: 2, value: 'Badminton', sportId: 2 },
{ id: 3, value: 'Kho-Kho', sportId: 2 }, { id: 4, value: 'VolleyBall', sportId: 2 },
{ id: 5, value: 'Khabaddi', sportId: 2 }, { id: 6, value: 'FootBall', sportId: 2 },
{ id: 7, value: 'Hockey', sportId: 2 }, { id: 8, value: 'BasketBall', sportId: 2 },
{ id: 9, value: 'Base Ball', sportId: 2 }, { id: 10, value: 'Carroms', sportId: 1 },
{ id: 11, value: 'Chess', sportId: 1 }, { id: 12, value: 'Hide and Seek', sportId: 1 },
{ id: 13, value: 'Table Tenis', sportId: 1 }, { id: 14, value: 'Ludo', sportId: 1 },
{ id: 14, value: 'Musical Chairs', sportId: 1 }]

export const getFullDate = (date) => {

    return moment(date).format(moment.HTML5_FMT.DATE).replace('T', '')
    //HTML5_FMT.DATETIME_LOCAL;

}
export const getFullMonth = (date) => {

    return moment(date).format(moment.HTML5_FMT.MONTH).replace('T', '')
    //HTML5_FMT.DATETIME_LOCAL;

}