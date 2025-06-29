import React from 'react';

const ProjectCard = ({ title, date, progress, daysLeft }) => {
  return (
    <div className='groupofcards' >
      <div className="project-card">
        <h3>dfghjkl;'</h3>
        <p>fghjkl;'</p>
        <progress value={progress} max="100"></progress>
        <p>{daysLeft} Days Left</p>
      </div>
      <div className="project-card">
        <h3>dfghjkl;'</h3>
        <p>fghjkl;'</p>
        <progress value={progress} max="100"></progress>
        <p>{daysLeft} Days Left</p>
      </div>
      <div className="project-card">
        <h3>dfghjkl;'</h3>
        <p>fghjkl;'</p>
        <progress value={progress} max="100"></progress>
        <p>{daysLeft} Days Left</p>
      </div>
    </div>
  );
};

export default ProjectCard;