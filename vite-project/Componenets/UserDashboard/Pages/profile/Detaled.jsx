import React from 'react';

const DetailedInformation = () => {
  return (
    <div className="detailed-information">
      <h2>Detailed Information</h2>
      <ul>
        <li>
          <span className="label">Full Name:</span>
          <span className="value">Robert Smith</span>
        </li>
        <li>
          <span className="label">Email Address:</span>
          <span className="value">robertsmith64@gmail.com</span>
        </li>
        <li>
          <span className="label">Contact Number:</span>
          <span className="value">(555) 555-5674</span>
        </li>
        <li>
          <span className="label">Designation:</span>
          <span className="value">Product Designer</span>
        </li>
        <li>
          <span className="label">Availability:</span>
          <span className="value">Schedule the time slot</span>
        </li>
      </ul>
    </div>
  );
};

export default DetailedInformation;