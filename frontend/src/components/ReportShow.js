import React from 'react'
import axios from 'axios'

function ReportShow({ data }) {
  const handleApprove = async (event) => {
    event.preventDefault()
    // console.log('Approve')

    try {
      //  delete that report
      await axios.delete(`http://localhost:8000/report`, {
        params: {
          reportId: data?.reportId,
        },
      })
      //  delete that user
      await axios.delete('http://localhost:8000/user', {
        params: { userId: data?.userGetsReportedId },
      })
    } catch (error) {}
  }
  const handleCancel = async (event) => {
    event.preventDefault()
    // console.log('Cancele')
    console.log(data?.reportId) // cancel request
    try {
      await axios.delete(`http://localhost:8000/report`, {
        params: {
          reportId: data?.reportId,
        },
      })
    } catch (error) {}
  }
  return (
    <div className='report-card'>
      <div className='report-card-header'>
        <img
          className='reported-user-photo'
          src={data?.userGetsReported_url}
          alt='reported-photo'
        />
        <div>
          <h4>Person get Report: {data?.userGetsReported_first_name}</h4>
          <h4>{data?.userGetsReported_email}</h4>
        </div>
      </div>
      <div className='report-card-body'>
        <p>Category : {data?.category}</p>
        <p>Explaation: {data?.explanation}</p>
        <p> The person make Report: {data?.userWantsReport_email}</p>
        <p> Evidence photo: </p>

        <img
          className='report-evidence'
          src={data?.evidenceURL}
          alt='reported-evidence'
          width='300px'
          height='300px'
        />
      </div>

      <div className='report-card-footer'>
        <button
          className='primary-button'
          type='submit'
          onClick={handleApprove}
        >
          Approve
        </button>
        <button className='primary-button' type='submit' onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ReportShow
