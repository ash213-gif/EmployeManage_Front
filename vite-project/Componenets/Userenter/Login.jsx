import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { GlobarRenderUrl } from '../../GlobalUrl'
import { Axios } from 'axios'


export default function Login() {

    const [ data,setdata]=useState({
        email: "",  
    password:""})

    const [ error ,setError]=useState(null)
    const [success, setSuccess]=useState(null)

    const form=[
        { label: "Email", type: "email", name: "email", placeholder: "Enter your email" },
        { label: "Password", type: "password", name: "password", placeholder: "Enter your password" }
    ]

const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
            const response = await axios.post(`${GlobarRenderUrl}/login` ,data )
            console.log(response );
            setdata(response.data.data)
sessionStorage.setItem('LoginId' , response.data.data._id )
            

    } catch(error){
        setError(error.response.msg)
        console.log(error);
    }
}

  return (
    <>
    <div  >

    
    <h1 >Login</h1>
    <form >
    {
     form.map((items,i)=>(
        <div>
            <input

                type={items.type}
                name={items.name}
                placeholder={items.placeholder}
                value={data[items.name]}
                onChange={(e) => setdata({ ...data, [items.name]: e.target.value })}
            />
        </div>
     ))}
     <button>Submit </button>
    </form>
    </div>
    </>
  )
}
