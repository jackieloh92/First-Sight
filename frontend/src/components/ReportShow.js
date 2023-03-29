import React from 'react'

function ReportShow({ data }) {
  const handleApprove = (event) => {
    event.preventDefault()
    console.log('Approve')
  }
  const handleCancel = (event) => {
    event.preventDefault()
    console.log('Cancel')
  }
  return (
    <div className='report-card'>
      <div className='report-card-header'>
        <img
          className='reported-user-photo'
          src={data?.reported_user_url}
          alt='reported-photo'
        />
        <div>
          <h4>Person get Report: {data?.reported_user_first_name}</h4>
          <h4>{data?.reported_user_email}</h4>
        </div>
      </div>
      <div className='report-card-body'>
        <p>Category : {data?.category}</p>
        <p>Explaation: {data?.explanation}</p>
        <p> The person make Report: {data?.complained_user_email}</p>
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
