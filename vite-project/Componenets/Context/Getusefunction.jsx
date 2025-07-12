import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { GlobarRenderUrl } from "../../GlobalUrl";

const Getusers=createContext()

const  Getusefunction =({children})=> {

    const [ getusers,setgetusers]=useState([])

  useEffect(() => {
    const getusers = async () => {
      try {
        const response = await axios.get(`${GlobarRenderUrl}/getusers`);
        setgetusers(response.data.getusers)
        
      } catch (err) {
        console.log(err);
      }
    };
    getusers();
  }, []);

  return (

    <Getusers.Provider value={{getusers,setgetusers}} >
        {children}
    </Getusers.Provider>
  );
}


export { Getusers ,Getusefunction}