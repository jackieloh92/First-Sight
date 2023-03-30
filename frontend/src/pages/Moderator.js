import React from 'react'
import { useEffect, useState } from 'react'
import ReportShow from '../components/ReportShow'
import axios from 'axios'

function Moderator() {
  const [reports, setReports] = useState([])
  useEffect(() => {
    async function getReport() {
      const response = await axios.get('http://localhost:8000/reports')
      setReports(response.data)
    }
    getReport()
  }, [])
  let reportToShow = []
  reportToShow = reports.map((item) => {
    return <ReportShow data={item} />
  })

  return (
    <div className='moderator'>
      <h1>List of report</h1>
      <div>{reportToShow}</div>
    </div>
  )
}

export default Moderator
