
import React, { Fragment } from 'react';
import { useSortBy, useTable } from 'react-table';
import { Table } from 'reactstrap';

const UseMyTable = ({ columns, data }) => {
    const { headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

    const generateOrder = j => {
        return j.isSorted ? (j.isSortedDesc ? " 🔽" : " 🔼") : ""
    }
    return <Fragment>
        <Table bordered hover>
            <thead>
                {
                    headerGroups.map((i) => (
                        <tr >
                            {i.headers.map((j) => (

                                <th {...j.getSortByToggleProps()}>
                                    {j.Header}
                                    {generateOrder(j)}
                                </th>
                            ))}
                        </tr>
                    ))}
            </thead>
            <tbody>
                {
                    rows.map((i) => {
                        prepareRow(i)
                        return <tr>
                            {
                                i.cells.map((j) => (
                                    <td> {j.render("Cell")}</td>
                                ))
                            }

                        </tr>
                    })
                }
            </tbody>
        </Table>
    </Fragment>
}
export default UseMyTable;