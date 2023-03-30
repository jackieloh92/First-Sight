import React from 'react'
import { useEffect, useState } from 'react'
import ReportShow from '../components/ReportShow'
import axios from 'axios'

function Moderator() {
  const [reports, setReports] = useState([])
  const [updateData, setUpdateData] = useState(new Date())
  useEffect(() => {
    async function getReport() {
      const response = await axios.get('http://localhost:8000/reports')
      setReports(response.data)
    }
    getReport()
    console.log('update Data from Moderaator Page:', updateData)
  }, [updateData])
  useEffect(() => {}, [reports])
  let reportToShow = []
  reportToShow = reports.map((item) => {
    return <ReportShow data={item} setUpdateData={setUpdateData} />
  })

  return (
    <div className='moderator'>
      <h1>List of report</h1>
      <div>{reportToShow}</div>
    </div>
  )
}

export default Moderator
