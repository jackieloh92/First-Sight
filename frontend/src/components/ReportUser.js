import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

import axios from 'axios'
const ReportUser = ({ userId, onClose }) => {
  const [category, setCategory] = useState('')
  const [explanation, setExplanation] = useState('')
  const [evidence, setEvidence] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const handleSubmit = async (event) => {
    // e.preventDefault()
    // try {
    //   const formData = new FormData()
    //   formData.append('reportedUserId', userId)
    //   formData.append('complainedUserId', cookies.UserId)
    //   formData.append('category', category)
    //   formData.append('explanation', explanation)
    //   evidence.forEach((file) => {
    //     formData.append('evidence', file)
    //   })
    //   console.log(formData)
    //   await axios.post('http://localhost:8000/report', formData)
    //   // display a confirmation message
    //   // onClose()
    // } catch (error) {
    //   console.error(error)
    //   // handle error
    // }
    event.preventDefault()
    // try{
    //   const [formData, setFormData] = useState({
    //       user_id: cookies.UserId, // userGetsReportedId
    //       first_name: cookies.first_name, // userGetsReportedName
    //       url: "",
    //       about: "",
    //       matches: []

    //   })
    // }
  }
  return (
    <div>
      <h2>Report User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='category'>Select a category:</label>
          <select
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>--Select a category--</option>
            <option value='inappropriate'>Inappropriate behavior</option>
            <option value='fake'>Fake profile</option>
            <option value='offensive'>Offensive content</option>
            <option value='harassment'>Harassment</option>
            <option value='spam'>Spam</option>
          </select>
        </div>
        <div>
          <label htmlFor='explanation'>Provide an explanation:</label>
          <textarea
            id='explanation'
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            maxLength={500}
            required
          />
        </div>
        <div>
          <label htmlFor='evidence'>Upload evidence:</label>
          <input
            id='evidence'
            type='file'
            accept='image/*, video/*'
            multiple
            onChange={(e) => setEvidence(Array.from(e.target.files))}
          />
        </div>
        <button type='submit'>Submit Report</button>
        <button type='button' onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  )
}
export default ReportUser
