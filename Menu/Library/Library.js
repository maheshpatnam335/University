import { Fragment, useState } from "react";
import { Button, Card, Col, Input, Label, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledCarousel } from "reactstrap";
import PageHeader from "../../Components/PageHeader";
import { GetMethod, PutMethod } from "../../Services/MainService";
import { handleError, handleSuccess } from "../../utils/Sweetalert";
import { BRANCH, CLASS } from "../domain/BranchConstants";
import { items } from "./CAROUSELITEMS";

const Library = () => {
    const [state, setState] = useState({ branch: '', class: '', books: [], selected: {}, returnBooks: [] })
    const [table, setTable] = useState(false)
    const [modal, setModal] = useState(false)
    const [books, setBooks] = useState(false)
    const handleChange = (e) => {
        if (e.target.name == 'branch') {
            setState({ ...state, branch: e.target.value })
        }
        if (e.target.name == 'class') {
            setState({ ...state, class: e.target.value })
        }
    }

    const GetBooks = () => {
        GetMethod(`https://localhost:44323/api/Library/Books?branch=${state.branch}&classId=${state.class}`).then((res) => {
            if (res.status === 200) {
                setState({ ...state, books: res.data })
                setTable(true)
            }
            else {
                handleError(res.status)
            }
        })
    }
    const toggle = () => setModal(!modal)
    const returnBooksToggle = () => setBooks(!books)

    const RegisterBook = (selected) => {

        setState({ ...state, selected: selected })
        setModal(!modal);
    }

    const RegisteredBooks = () => {
        const data = {
            bookCode: state.selected.bookCode,
            quantity: 1
        }
        PutMethod('https://localhost:44323/api/Library/RegisterBook', data).then((res) => {
            if (res.status == 200) {
                handleSuccess("Successfully registered")
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            }
        })
    }

    const ReturnBooks = () => {
        GetMethod('https://localhost:44323/api/Library/ReturnBooks').then((res) => {
            if (res.status == 200) {
                setState({ ...state, returnBooks: res.data })
            }
        })
        setBooks(true)
    }

    const ReturnedBook = (selected) => {
        const data = {
            bookCode: selected.bookCode,
            quantity: 1
        }
        PutMethod('https://localhost:44323/api/Library/ReturnBook', data).then((res) => {
            if (res.status == 200) {
                handleSuccess("Successfully returned your book.")
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            }
        })
    }
    return <Fragment>
        <PageHeader header={'Library'} />
        <Card>
            <Row md='12'>
                <Col className="h-5 lib-col-1 card-overFlow " md='4'>
                    <UncontrolledCarousel items={items} />
                    <p>a place set apart to contain books, periodicals, and other material for reading,
                        viewing, listening, study, or reference, as a room, set of rooms, or building
                        where books may be read or borrowed. a public body organizing and maintaining
                        such an establishment.</p>
                </Col>
                <Col className="lib-col-2 h-5" md='8'>
                    <Row>
                        <Col><Label>Select Branch</Label>
                            <Input type='select' name='branch' onChange={(e) => handleChange(e)} >
                                <option>Select</option>
                                {BRANCH.map((i, j) => {
                                    return <option value={i.id}>{i.name}</option>
                                })}
                            </Input>
                        </Col>
                        <Col>
                            <Label>Select Class</Label>
                            <Input type='select' name='class' onChange={(e) => handleChange(e)}>
                                <option>Select</option>
                                {
                                    CLASS.map((i, j) => {
                                        return <option value={i.id}>{i.name}</option>
                                    })
                                }
                            </Input>
                        </Col>
                        <Col className="pt-4"><Button className="btn btn-info" onClick={(i) => GetBooks(i)}>Get Books</Button></Col>
                        <Col className="pt-4"><Button className="btn btn-info" onClick={() => ReturnBooks()}>Return Books</Button></Col>
                    </Row>
                    <Row className="card-overFlow1">
                        {table ? <div>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Book Name </th>
                                        <th>Author Name </th>
                                        <th>Quantity of Books </th>
                                        <th>Branch Name </th>
                                        <th>Class </th>
                                        <th>Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.books.map((i, j) => {
                                        return <tr>
                                            <td>{i.bookName}</td>
                                            <td>{i.authorName}</td>
                                            <td>{i.quantity}</td>
                                            <td>{i.branch}</td>
                                            <td>{i.class}</td>
                                            <td><Button className="btn btn-info" onClick={() => RegisterBook(i)}>Register</Button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </div>
                            : ''}
                    </Row>
                </Col>
            </Row>
        </Card>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader className="text-center">Register a book</ModalHeader>
            <ModalBody>

                <div>
                    <p> Book Name : <strong>{state.selected.bookName}</strong></p>
                    <p> Author Name : <strong>{state.selected.authorName}</strong></p>
                    <p> Return date : <strong>{new Date().getDate() + 15 + "-" + new Date().getMonth() + 1 + "-" + new Date().getFullYear()}</strong></p>
                    <p> <strong className="red">Note* : </strong>
                        This book is registered only for 15 days from the date of registration.
                        So submit it back within fifteen days. otherWise you have to be pay penalty.
                    </p>
                    <Button className="btn btn-success" onClick={() => RegisteredBooks()}>Register now</Button>
                </div>
            </ModalBody>
        </Modal>
        <Modal isOpen={books} toggle={returnBooksToggle}>
            <ModalHeader className="text-center">Return a book</ModalHeader>
            <ModalBody>
                <Table bordered hover>
                    <thead>
                        <th> Book Name </th>
                        <th> Book Code </th>
                        <th> Return Date </th>
                        <th> Action </th>
                    </thead>
                    <tbody>
                        {state.returnBooks.map((i, j) => {
                            return <tr>
                                <td>{i.bookName}</td>
                                <td>{i.bookCode}</td>
                                <td>{i.returnDate}</td>
                                <td><Button className="btn btn-info" onClick={() => ReturnedBook(i)}>Return</Button></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <div>

                </div>
            </ModalBody>
        </Modal>
    </Fragment>
}
export default Library;