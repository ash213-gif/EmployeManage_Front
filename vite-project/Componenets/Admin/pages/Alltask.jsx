import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context';
import { FaEdit, FaTrashAlt, FaSync } from 'react-icons/fa';
import axios from 'axios'
import { GlobarRenderUrl } from '../../../GlobalUrl';
// Dummy handlers to avoid reference errors
const HandleEdit = () => { };



export default function Alltask() {
  const { data } = useContext(Context);

  const [error, seterror] = useState(null)
  const [success, setsucess] = useState(null)
  const [show, setshow] = useState(false)

// const getId = sessionStorage.getItem('UserId')
//   const HandleDelete = async () => {
//     try {

//       const response = await axios.delete(`${GlobarRenderUrl}/deleteTask/${getId}`)
//       if (response.data.status === 200 || response.data.status === true) {
//         setshow(false)
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   const UpdateTask =async ()=>{
//     try{
// const response = await axios.post( `${GlobarRenderUrl}/updateTask/${getId}` )
//     }catch(error){
//       console.log(error);
//     }
//   }
  return (
    <div className="task-container">
      {data && data.map(task => (
        <div className="task-card" key={index}>
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <div className="task-actions">
            <button className="action-btn" >
              <FaEdit /> Edit
            </button>
            <button className="action-btn" >
              <FaSync /> Update
            </button>
            <button className="action-btn" >
              <FaTrashAlt /> Delete
            </button>
            {/* {show && (
              <div className="confirmation-dialog">
                <p>Are you sure you want to delete this task?</p>
                <button onClick={HandleDelete} className="delete-btn">Delete Task</button>
                <button onClick={() => setshow(false)} className="cancel-btn">Cancel</button>
              </div>
            )} */}

          
          </div>
        </div>
      ))
      }
    </div >
  );
}