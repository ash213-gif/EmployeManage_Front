import { createContext, useState, useEffect } from "react";
import axios from "axios";

const Context = createContext(null);

const ProvideMain = ({ children }) => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4040/tasks');
        setdata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Context.Provider value={{ data, setdata }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ProvideMain };