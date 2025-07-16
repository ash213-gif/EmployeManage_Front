import React, { useState } from 'react'
import Search from './Search'
import {GlobarRenderUrl } from '../../../../GlobalUrl'
import axios  from 'axios'
export default function Mssage() {

const [message,setnewmessage]=useState(null)
const userId=sessionStorage.getItem('Id')

const HandleSubmitMessage=async ()=>{
  try{
const response= await axios.post(`${GlobarRenderUrl}/sendMessage`, )
  console.log(response)
  }
  catch(e){ console.log(e) }
}

  return (
   <>
   <div className='flex space-x-5  h-screen ' >
    <div className='w-1/3  bg-amber-50 rounded-3xl ' > <Search/></div>
    <div className='w-full bg-amber-400 flex  rounded-3xl ' > message
      <input
      className='  self-end'
      type="text"
      onChange={(e)=>setnewmessage(e.target.value)}
      value={message}
      placeholder='enetr you message ' />
      <button
      onClick={HandleSubmitMessage}
      className='self-end' >submit </button>
       </div>
   </div>
   </>
  )
}
