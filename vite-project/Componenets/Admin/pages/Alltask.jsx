import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context';
import { FaEdit, FaTrashAlt, FaSync } from 'react-icons/fa';
import axios from 'axios'

// Dummy handlers to avoid reference errors
const HandleEdit = () => { };
const HandleUpdate = () => { };


export default function Alltask() {
  const { data } = useContext(Context);

  const [error, seterror] = useState(null)
  const [success, setsucess] = useState(null)
  const [show, setshow] = useState(false)

const getId = sessionStorage.getItem('UserId')
  const HandleDelete = async () => {
    try {
      
      const response = await axios.delete(`http://localhost:4040/deleteTask/${getId}`)
      if (response.data.status === 200 || response.data.status === true) {
        setshow(false)
      }
    } catch (error) {
      console.log(error);
    }
  };


  const UpdateTask =async ()=>{
    try{
const response = await axios.post( `http://localhost:4040/updateTask${getId}` )
    }catch(error){
      console.log(object);
    }
  }
  return (
    <div className="task-container">
      {data && data.map(task => (
        <div className="task-card" key={task.id}>
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <div className="task-actions">
            <button className="action-btn" onClick={HandleEdit}>
              <FaEdit /> Edit
            </button>
            <button className="action-btn" onClick={() => setshow(true)}>
              <FaSync /> Update
            </button>
            <button className="action-btn" onClick={() => setshow(true)}>
              <FaTrashAlt /> Delete
            </button>
            {show && (
              <div className="confirmation-dialog">
                <p>Are you sure you want to delete this task?</p>
                <button onClick={HandleDelete} className="delete-btn">Delete Task</button>
                <button onClick={() => setshow(false)} className="cancel-btn">Cancel</button>
              </div>
            )}

            {
              show &&
              <div>
                <p>Are you sure you want to update  this task?</p>
                <button onClick={UpdateTask} className="delete-btn">Update  Task</button>
                <button onClick={() => setshow(false)} className="cancel-btn">Cancel</button>
              </div>

            }
          </div>
        </div>
      ))
      }
    </div >
  );
}