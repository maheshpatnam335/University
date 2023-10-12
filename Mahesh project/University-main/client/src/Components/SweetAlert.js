import React, { Fragment, useState } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import SweetAlert from 'sweetalert-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default function SweetAlerts() {
    const [state, setState] = useState({ show: false })
    return (
        <Fragment>
            <ReactCSSTransitionGroup
              component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
                > 
                <Row>
                    <Col md="3">
                        <Card className="mb-3 text-center">
                            <CardBody>
                                <CardTitle>Success</CardTitle>
                                <Button color="success" onClick={() => setState({ show: true })}>Show
                                    Alert</Button>
                                <SweetAlert
                                    title="Good job!"
                                    confirmButtonColor=""
                                    show={state.show}
                                    text="You clicked the button!"
                                    type="success"
                                    onConfirm={() => setState({ show: false })} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
}

