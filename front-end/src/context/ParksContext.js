import React, { useState, createContext } from "react";

export const ParksContext = createContext();

export const ParksContextProvider = (props) => {
  const [parks, setParks] = useState([]);
  const [selectedPark, setSelectedPark]=useState(null)

  //everytime a park is added, it will be displayed without refreshing the page
  const addParks =(park)=>{
    setParks([...parks, park])
  }

  return (
      //this will wrap the entire <App/> component
    <ParksContext.Provider value={{ parks, setParks, addParks, selectedPark, setSelectedPark }}> 
      {props.children}
    </ParksContext.Provider>
  );
};

