import React from 'react'
import UseMyTable from "./Table"

const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Branch", accessor: "branch" },
    { Header: "College", accessor: "college" },
    { Header: "Addrress", accessor: "address" }
]
var data = [
    { name: "Mahesh1", branch: "Civil", college: "HITS", address: "Hyd" },
    { name: "Mahesh2", branch: "Civil", college: "HITS", address: "Hyd" },
    { name: "Mahesh3", branch: "Civil", college: "HITS", address: "Hyd" },
    { name: "Mahesh4", branch: "Civil", college: "HITS", address: "Hyd" }
]
const GetTableData = () => {
    return <UseMyTable columns={columns} data={data} />
}
export default GetTableData;