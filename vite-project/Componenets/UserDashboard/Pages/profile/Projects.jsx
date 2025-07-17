import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../../Context/Gettask';

const ProjectCard = () => {
  const { data } = useContext(Context);
  const [datas, setdata] = useState([]);

  useEffect(() => {
    setdata(Array.isArray(data) ? data : []);
  }, [data]);

  return (
    <div className="p-8">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-teal-800 tracking-wide">Project Dashboard</h2>
      <div className="flex overflow-x-auto hide-scrollbar gap-8">
        {datas.length === 0 ? (
          <p className="text-xl text-center text-teal-700 bg-white rounded-xl shadow-lg p-10 border-2 border-teal-200">
            No projects found. Start creating new projects!
          </p>
        ) : (
          datas.map((tasks, i) => (
            <div key={i} className="bg-white w-[460px] h-[200px] rounded-3xl shadow-xl transform transition duration-300 hover:scale-102 hover:shadow-2xl border-teal-200">
              <div className="bg-gradient-to-r rounded-t-3xl from-teal-400 to-cyan-500 p-3 overflow-hidden">
                <h3 className="text-2xl font-bold text-white truncate">{tasks.title}</h3>
              </div>
              <div className="h-full p-4 flex flex-col">
                <p className="text-gray-700 flex-1 overflow-hidden text-ellipsis">{tasks.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium text-teal-600">Project Status</span>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-teal-100 text-teal-800">
                    In Progress
                  </span>
                </div>
                {tasks.daysLeft && (
                  <div className="mt-6 bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                    <p className="text-cyan-700 font-bold text-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {tasks.daysLeft} Days Remaining
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
