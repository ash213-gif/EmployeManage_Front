import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context/Context';

const ProjectCard = () => {
  const { data } = useContext(Context);
  const [datas, setdata] = useState([]);

  useEffect(() => {
    setdata(Array.isArray(data) ? data : []);
  }, [data]);

  return (
    <div className='groupofcards'>
      {datas.length === 0 && <p>No projects found.</p>}
      {datas.map((tasks, i) => (
        <div
          key={i}
          className="project-card">
          <h3>{tasks.title}</h3>
          <p>{tasks.description}</p>
          <p>{tasks.daysLeft ? `${tasks.daysLeft} Days Left` : ''}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;