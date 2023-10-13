import React, { Fragment, useEffect, useState } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { Button, Card, CardBody, Col, Input, Row } from 'reactstrap'
import PageHeader from '../../Components/PageHeader'
import { GetMethod, PostMethod } from '../../Services/MainService'
import { BRANCH, getTextFromArray, SPORT, SPORT_TYPE } from '../domain/BranchConstants';
import { CiCircleRemove } from 'react-icons/ci'

const imgs = [];
function AddSports() {
    const [state, setState] = useState({
        type: 0, sport: 0, students: [], studentName: '', tournamentName: '', tournamentDate: '', tournamentPlace: '',
        branch: '', rollNumber: '', images: [], reward: '', description: '', rank: 0, files: []
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        setLoading(true)
        GetMethod('https://localhost:44323/api/Student/List').then((res) => {
            setState({ ...state, students: res.data })
        })
        setLoading(false)
    }, [])
    const SelectedRoll = (selected) => {
        if (selected.length > 0) {
            setState({
                ...state, name: selected[0].name, rollNumber: selected[0].rollNumber,
                branch: getTextFromArray(BRANCH, selected[0].branchId)
            })
        }
    }

    const selectedImages = (e) => {
        setLoading(true)
        state.files.push(e.currentTarget.files[0])
        imgs.push(URL.createObjectURL(e.currentTarget.files[0]));
        setState({ ...state, images: imgs })
        setLoading(false)
    }

    const RemovePhoto = (val) => {
        state.images.map((i, j) => {
            if (val == j) { state.images[j] = '' }
        })
        setState({ ...state })
    }
    const image = state.images.map(
        (element, index) => {
            return (element && <Fragment>
                <img src={element} alt='img_1' width={'100px'} height={'120px'} />
                <CiCircleRemove size='35' onClick={() => RemovePhoto(index)} /></Fragment>
            )
        }
    )
    var formData = new FormData();
    const handleSubmit = () => {
        formData.append('sportType', state.type)
        formData.append('sport', state.sport)
        formData.append('rollNumber', state.rollNumber)
        formData.append('rank', state.rank)
        formData.append('reward', state.reward)
        formData.append('description', state.description)
        formData.append('tournamentName', state.tournamentName)
        formData.append('tournamentDate', state.tournamentDate)
        formData.append('tournamentPlace', state.tournamentPlace)
        // formData.append('files', JSON.stringify(state.files))
        // formData.append('file', state.files[0])
        formData.append('filesName', state.images)
        PostMethod('https://localhost:44323/api/Sports/AddSports', formData).then((res) => {
        })

    }
    return (
        <Fragment>
            <PageHeader header="Add Sports" />
            {loading ? <h1><center>Loading...</center></h1> : <Card>
                <CardBody>      <Row>
                    <Col>
                        <Input type='select' onChange={(e) => handleChange(e)} name='type'>
                            <option>Select Type</option>
                            {
                                SPORT_TYPE.map((i, j) => {
                                    return <option value={i.id}>{i.value}</option>
                                })
                            }
                        </Input>
                    </Col>
                    <Col>
                        <Input type='select' name='sport' onChange={(e) => handleChange(e)} disabled={state.type == 0}>
                            <option>Select Sport</option>
                            {
                                SPORT.filter(x => x.sportId == state.type).map((i, j) => {
                                    return <option value={i.id}>{i.value}</option>
                                })
                            }
                        </Input>
                    </Col>
                </Row>
                    {state.sport && <> <Row className='pt-5'>
                        <Col>
                            <label>Search Student</label>
                            <AsyncTypeahead
                                type='select'
                                name='student'
                                labelKey={'rollNumber'}
                                options={state.students}
                                onChange={(selected) => SelectedRoll(selected)}
                            />

                        </Col>
                        <Col>
                            <label>Name</label>
                            <Input value={state.name} disabled={true} />
                        </Col>
                        <Col>
                            <label>Branch</label>
                            <Input value={state.branch} disabled={true} />
                        </Col>
                    </Row>
                        <Row className='pt-3'>
                            <Col>
                                <label>Tournament Name</label>
                                <Input name='tournamentName' onChange={(e) => handleChange(e)} />
                            </Col>
                            <Col>
                                <label>Date of Tournament</label>
                                <Input type='date' name='tournamentDate' onChange={(e) => handleChange(e)} />
                            </Col>
                            <Col>
                                <label>Tournament Place</label>
                                <Input name='tournamentPlace' onChange={(e) => handleChange(e)} />
                            </Col>
                        </Row>
                        <Row className='pt-3'>
                            <Col>
                                <label>Reward</label>
                                <Input name='reward' onChange={(e) => handleChange(e)} />
                            </Col>
                            <Col>
                                <label>Rank Position</label>
                                <Input type='number' name='rank' onChange={(e) => handleChange(e)} />
                            </Col>
                            <Col>
                                <label>Description</label>
                                <Input name='description' onChange={(e) => handleChange(e)} />
                            </Col>
                        </Row>
                        <Row className='pt-4'>
                            <Col md='3'>
                                <label>    Upload Images </label>
                                <Input type='file' multiple name='images'
                                    onChange={(e) => selectedImages(e)}
                                    accept="image/*" />
                            </Col>
                            <Col md='7'>{image}</Col>
                             <Col className='pt-3' md='2'><Button color='success' onClick={() => handleSubmit()}>Submit</Button></Col>
                        </Row>
                    </>
                    }
                </CardBody>
            </Card>}

        </Fragment>
    )
}

export default AddSports