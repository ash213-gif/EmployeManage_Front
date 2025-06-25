import React from 'react'
import { useState } from 'react'

export default function Login() {

    const [ data,setdata]=useState({
        email: "",  
    password:""})

    const form=[
        { label: "Email", type: "email", name: "email", placeholder: "Enter your email" },
        { label: "Password", type: "password", name: "password", placeholder: "Enter your password" }
    ]

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
