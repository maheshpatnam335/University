import { Fragment, useEffect, useState } from "react";
import { BsCalendarDate, BsFillPersonFill } from 'react-icons/bs';
import { FcRating } from 'react-icons/fc';
import { Card, CardBody, Col, Row } from "reactstrap";
import { GetMethod } from "../../Services/MainService";
import { getFullDate } from "../domain/BranchConstants";

const LiteraryEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GetMethod('https://localhost:44323/api/Events/Literary').then((res) => {
            if (res.status == 200) {
                setEvents(res.data)
            }
        })
        setLoading(false);
    }, [])
    return <Fragment>
        {loading ? <h1><center>Loading...</center></h1> :
            events.map((i, j) => {
                return <Card className="serif">
                    <CardBody>
                        <Row md='12'>
                            <Col md='3'>
                                <img src={`data:image/jpeg;base64,${i.imageData}`} className="w3-left w3-circle w3-margin-right" width="110px" height="130px" />
                            </Col>
                            <Col md='5'>
                                <h3>{i.name}</h3>
                                <h5><BsCalendarDate />{"  " + getFullDate(i.date)}</h5>
                                <h5><BsFillPersonFill />{" " + i.hostName}</h5>
                                <h5 className="pt-3"><FcRating /> Rating {i.rating}</h5>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            })
        }
    </Fragment>
}
export default LiteraryEvents;