import { Fragment, useState } from "react";
import { Card, CardBody, Input } from "reactstrap";
import PageHeader from "../Components/PageHeader";
import { BRANCH, CLASS, GENDER, getTextFromArray, MARITALSTATUS, SECTION } from "../Menu/domain/BranchConstants";
import { GetMethod } from "../Services/MainService";
import ReportName from "./JSONFiles/ReportNames";
import { MODULES, REPORTS } from "./Modules";

const Reports = () => {
    const [reports, setReports] = useState({ List: [] })
    const [data, setData] = useState({ List: [] })
    const [jsonData, setJsonData] = useState({});
    const [jsonvalues, setJsonValues] = useState(false);

    const handleValueChange = (name, value) => {
        if (name === "module") {
            var reportNames = REPORTS.filter(x => x.moduleId == value)
            setReports({ ...reports, List: reportNames });

        }
        if (name === 'report') {
            let records = [];
            if (ReportName[value]) {
                const json = ReportName[value]
                setJsonData(json);
                setJsonValues(true);
                GetMethod(json.url).then((res) => {
                    records = res.data;
                    setData({ ...data, List: records })
                })

            }
        }
    }

    const GetNameFromId = (name, value) => {
        switch (name) {
            case 'Class':
                return getTextFromArray(CLASS, value)
            case 'Branch':
                return getTextFromArray(BRANCH, value)
            case 'Section':
                return getTextFromArray(SECTION, value)
            case 'Gender':
                return getTextFromArray(GENDER, value)
            case 'Marital Status':
                return getTextFromArray(MARITALSTATUS, value)
            default:
                return value;
        }
    }
    return <Fragment>
        <PageHeader header="Reports" />
        <Card>
            <div style={{ display: 'flex', justifyContent: 'space-around' }} className='pt-5 pb-2'>
                <div>
                    <Input type='select' name='module' onChange={(e) => handleValueChange(e.target.name, e.target.value)}>
                        <option>Select Module</option>
                        {MODULES.map((i, j) => {
                            return <option value={i.id}>{i.module}</option>
                        })}
                    </Input>
                </div>
                <div>
                    <Input type='select' name='report' onChange={(e) => handleValueChange(e.target.name, e.target.value)}>
                        <option>Select Report</option>
                        {reports.List.map((i, j) => {
                            return <option>{i.report}</option>
                        })}

                    </Input>
                </div>
                <div>
                </div>
            </div>
            <CardBody>
                <div>
                    <PageHeader header={jsonData.Label ? jsonData.Label : ""} />
                    <h4 style={{ display: 'flex', justifyContent: 'left' }}>Total records : {data.List.length}</h4>
                    <table className="table-bordered table table-success table-hover">
                        <thead> <tr>
                            <td>Sl No</td>
                            {jsonvalues ?
                                jsonData.columns.map((i) => {
                                    return <th>{i.label}</th>
                                }) : ''
                            }
                        </tr>
                        </thead>
                        <tbody>
                            {jsonvalues ? data.List.map((json, index) => {
                                return <tr>
                                    <td>{index + 1}</td>
                                    {jsonData.columns.length > 0 ? jsonData.columns.map((i, j) => (
                                        <>
                                            <td>{`${GetNameFromId(i.label, json[i.name])}`}</td>
                                        </>

                                    )) : ""
                                    }
                                </tr>
                            }) : ''}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    </Fragment>
}
export default Reports;