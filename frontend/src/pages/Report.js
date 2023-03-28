import React from 'react'

function Report() {
  const submitReport = async (event) => {
    event.preventDefault()
    console.log('clickedUserId :', clickedUserId)
    try {
      const response = await axios.post('http://localhost:8000/report', {
        reportedUserId: clickedUserId,
        problem: 'hahahah',
      })
      // setUsersMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return <div></div>
}

export default Report
