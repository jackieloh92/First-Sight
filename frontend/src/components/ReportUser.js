import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios';

const ReportUser = ({ userId, onClose }) => {
  const [category, setCategory] = useState('');
  const [explanation, setExplanation] = useState('');
  const [evidence, setEvidence] = useState([]);
  const [cookies] = useCookies(['user']);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('reportedUserId', userId);
    formData.append('complainedUserId', cookies.UserId);
    formData.append('category', category);
    formData.append('explanation', explanation);
    evidence.forEach((file) => {
      formData.append('evidence', file);
    });

    try {
      await axios.post('http://localhost:8000/report', formData);
      alert('Report submitted successfully.');
      onClose();
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the report.');
    }
  };

  return (
    <div>
      <h2>Report User</h2>
      <form className="report-user-form" onSubmit={handleSubmit}>
    <div className="report-user-input">
    <label className="report-user-label" htmlFor="category">Select a category:</label>
    <select
      className="report-user-select"
      id="category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
            <option value="">--Select a category--</option>
            <option value="inappropriate">Inappropriate behavior</option>
            <option value="fake">Fake profile</option>
            <option value="offensive">Offensive content</option>
            <option value="harassment">Harassment</option>
            <option value="spam">Spam</option>
            </select>
  </div>
  <div className="report-user-input">
    <label className="report-user-label" htmlFor="explanation">Provide an explanation:</label>
    <textarea
      className="report-user-textarea"
      id="explanation"
      value={explanation}
      onChange={(e) => setExplanation(e.target.value)}
      maxLength={500}
      required
    />
  </div>

  <button className="report-user-submit" type="submit">Submit Report</button>
  <button className="report-user-cancel" type="button" onClick={onClose}>
    Cancel
  </button>
</form>
    </div>
  );
};
  

export default ReportUser;