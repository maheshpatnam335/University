import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Button, Col, Row } from 'reactstrap'

function Timesheet() {
  var loggedId = localStorage.getItem('login');
  const [min, setMin] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [time, setTime] = useState((new Date()).getDate())
  useEffect(() => {
    axios.get(`https://localhost:44323/api/Register/LoginTime?id=${loggedId}`).then((res) => {
      var timer = new Date(res.data);
      debugger
      setTime(timer.getDate())
      setMin(timer.getMinutes())
    })
  }, [])



  const punchIn = () => {
    const data = {
      isPunchInOrOut: 1,
      logId: loggedId
    }
    axios.post('https://localhost:44323/api/Register/Timesheet', data)
  }
  const punchOut = () => {
    const data = {
      isPunchInOrOut: 2,
      logId: localStorage.getItem('login')
    }
    setIsCompleted(true)
    axios.post('https://localhost:44323/api/Register/Timesheet', data)
  }


  const series = [(min * 100) / 480, 100 - ((min * 100) / 480)];
  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['completed Time', 'Required Time'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }


  console.log(time)
  console.log(time == (new Date().getDate()))
  return (
    <div >


      <h1 className='text-center bg-success '>Timesheet</h1>
      {/* <div className='d-flex mt-5'>
        <Row>
          <Col>
            <label> From Date : </label>
            <input type='date' name='date' className='form-control' /><br />
          </Col>
          <Col>
            <label className='ms-3'>From Time : </label>
            <input type='time' className='form-control'></input>
          </Col>
        </Row>
      </div> */}


      <div className='d-flex mt-5'>
        {/* <Row>

          <Col>
            <label> To Date : </label >
            <input type='date' className='form-control' /><br />
          </Col>
          <Col> <label className='ms-4'>To Time : </label>
            <input type='time' className='form-control'></input>
          </Col>
        </Row> */}
        <Row>
          <Col>
            <Button className='bg-info' disabled={(time == (new Date().getDate())) || isCompleted} onClick={() => punchIn()}>Punch In</Button>
          </Col>
          <Col>
            <Button className='bg-info' disabled={(time != (new Date().getDate())) || isCompleted} style={{ width: '90px' }} onClick={() => punchOut()}>Punch Out</Button>
          </Col>
        </Row>
        <div className='ms-5 mt-5'>
          <ReactApexChart className='ms-5' options={options} series={series} type="pie" width={580} />

        </div>
      </div>
    </div>




  )
}

export default Timesheet
