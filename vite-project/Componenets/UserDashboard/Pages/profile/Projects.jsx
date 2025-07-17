import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../../Context/Gettask';

const ProjectCard = () => {
  const { data } = useContext(Context);
  const [datas, setdata] = useState([]);

  useEffect(() => {
    setdata(Array.isArray(data) ? data : []);
  }, [data]);

  return (
    <div className="  ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Project Dashboard</h1>
          <p className="text-gray-600">Manage and track your projects</p>
        </div>
        
        {/* Projects Grid */}
        <div className=" flex  overflow-x-auto gap-4      ">
          {datas.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
                <p className="text-gray-600 mb-6">Start creating new projects to see them here!</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Create New Project
                </button>
              </div>
            </div>
          ) : (
            datas.map((tasks, i) => (
              <div key={i} className="bg-white h-[300px] rounded-4xl  overflow-clip  shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                      {tasks.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {tasks.description}
                  </p>
                </div>
                
                {/* Card Body */}
                <div className="p-6 pt-4">
                  {/* Status Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1.5"></div>
                        In Progress
                      </span>
                    </div>
                  </div>
                  
                  {/* Days Remaining */}
                  {tasks.daysLeft && (
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-gray-800">{tasks.daysLeft}</span>
                        <span>Days Remaining</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Floating Action Button */}
        {datas.length > 0 && (
          <div className="fixed bottom-8 right-8">
            <button className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;