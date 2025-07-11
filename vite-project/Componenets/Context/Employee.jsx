import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { GlobarRenderUrl } from "../../GlobalUrl";
import { ToastContainer, toast } from "react-toastify";

const Getusers=createContext()

export default function Employee() {

    const [ getusers,setgetusers]=useState()

  useEffect(() => {
    const getusers = async () => {
      try {
        const response = await axios.get(`${GlobarRenderUrl}/getusers`);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    getusers();
  }, []);

  return (

    <Getusers.Provider value={} >
        {children}
    </Getusers.Provider>
  );
}
