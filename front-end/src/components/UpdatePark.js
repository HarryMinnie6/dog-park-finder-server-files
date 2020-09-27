import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ParkFinder from "../apis/ParkFinder";
import "./UpdatePark.css";

//>>>---updating the parks details when the submit button is clicked----<<<<<
const UpdatePark = (props) => {
  const { id } = useParams(); //<--example of react-hooks...
  let history = useHistory();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [park_size, setPark_Size] = useState("");
  //>>>-------------------------------------------------------------------<<<<<
  //****--for displaying the current parks name, location, size in the input fields where it is going to be changed--****
  useEffect(() => {
    const fetchData = async () => {
      const result = await ParkFinder.get(`/${id}`);
      console.log(result.data.data);
      setName(result.data.data.parks.name);
      setLocation(result.data.data.parks.location);
      setPark_Size(result.data.data.parks.park_size);
    };
    fetchData();
  }, []);
  //****------------------------------------------------------------------****
  //<><>---------what happens when the submit button is clicked---------------<><>
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPark = await ParkFinder.put(`${id}`, {
      name: name,
      location: location,
      park_size: park_size,
    });
    history.push("/"); //<-once the park submit button has been clicked, we will get taken back to the home page
    console.log(updatedPark);
  };
  //<><>------------------------------------------------------------------<><>
  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="park_size">Park Size</label>
          <select
            value={park_size}
            onChange={(e) => setPark_Size(e.target.value)}
            className="custom-select my-1 mr-sm-2"
          >
            <option disabled> Park size </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdatePark;
