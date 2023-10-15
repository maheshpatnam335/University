import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Button, Col, Row } from 'reactstrap'

function Timesheet() {
  var loggedId = localStorage.getItem('login');
  const[list, setList]=useState([])
  useEffect(() => {
    axios.get(`https://localhost:44323/api/Register/LoginTime?id=${loggedId}`).then((res) => {
      setList(res.data)
    })
  }, [])
var isPunchedIn= list.filter(c=>c.punchIn!=null);
var isPunchedOut= list.filter(c=>c.punchOut!=null);
if(isPunchedIn.length>0){
  var completedTimeInHours=(new Date()).getHours()- (new Date(isPunchedIn[0].punchIn)).getHours();
  var completedTimeInMinutes=(new Date()).getMinutes()- (new Date(isPunchedIn[0].punchIn)).getMinutes();
  
}
// var hours=completedTime.getHours

var totalMins = (completedTimeInHours*60+completedTimeInMinutes);
console.log(totalMins)
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
    
    axios.post('https://localhost:44323/api/Register/Timesheet', data)
  }


  const series = [(totalMins * 100) / 480, 100 - ((totalMins * 100) / 480)];
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


  return (
    <div >


      <h1 className='text-center bg-success '>Timesheet</h1>

      <div className='d-flex mt-5'>
        <Row>
          <Col>
            <Button className='bg-info' disabled={isPunchedIn.length !=0} onClick={() => punchIn()}>Punch In</Button>
          </Col>
          <Col>
            <Button className='bg-info' disabled={(isPunchedIn.length ==0) ||(isPunchedOut.length !=0)} style={{ width: '90px' }} onClick={() => punchOut()}>Punch Out</Button>
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
