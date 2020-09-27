import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ParkFinder from "../apis/ParkFinder";
import "./ParkList.css";
import { ParksContext } from "../context/ParksContext";
import StarRating from "./StarRating";

import PetsIcon from "@material-ui/icons/Pets";

function ParkList(props) {
  const { parks, setParks } = useContext(ParksContext);
  let history = useHistory(); // <-- represents history of our browser
  //------fetching data from our backend server---------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ParkFinder.get("/");
        console.log(result);
        setParks(result.data.data.parks);
        console.log(result.data.data);
      } catch (err) {}
    };
    fetchData();
  }, []);
  //----------------------------------------------------------------

  //***--- deleting a park from the list-------------------------***
  const deletePark = async (e, id) => {
    e.stopPropagation(); //<--stops propagation to the click event on the table row.
    try {
      const result = await ParkFinder.delete(`/${id}`);
      console.log(result);
      setParks(
        parks.filter((park) => {
          return park.id !== id;
        })
      );
    } catch (err) {}
  };
  //***---------------------------------------------------------***
  //<<<--tells react-router to navigate to /parks/:id/update "aka UpdatePark.js"------>>>
  const updatePark = (e, id) => {
    e.stopPropagation(); //<--stops propagation to the click event on the table row.
    history.push(`/parks/${id}/update`);
  };
  //<<<---------------------------------------------------------->>>
  //+++----tells react-router to navigate to /parks/:id "aka ParkDetailPage.js"-------+++
  const parkSelect = (id) => {
    history.push(`/parks/${id}`);
  };
  //+++-------------------------------------------------------------------------------+++
  //???-------geting the ratings for each park----------------------------------------???
  const renderRating = (park) => {
    if(!park.count){
      return <span className='text-warning'> 0 reviews </span>
    }
    return (
      <>
        <StarRating rating={park.average_rating} />
        <span className="text-warning ml-1"> ({park.count})</span>
      </>
    );
  };
  //???-------------------------------------------------------------------------------???
  return (
    <div className="list-group">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Park</th>
            <th scope="col">Location</th>
            <th scope="col">Park Size</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {parks &&
            parks.map((park) => {
              return (
                <tr onClick={() => parkSelect(park.id)} key={park.id}>
                  <td> {park.name} </td>
                  <td> {park.location} </td>
                  <td> ± {park.park_size} Rugby Fields </td>
                  <td> {renderRating(park)} </td>
                  <td>
                    <button
                      onClick={(e) => updatePark(e, park.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => deletePark(e, park.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ParkList;
