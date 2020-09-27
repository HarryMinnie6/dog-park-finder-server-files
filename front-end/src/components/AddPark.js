import React, { useContext, useState } from "react";
import ParkFinder from "../apis/ParkFinder";

import "./AddPark.css";
import PetsIcon from "@material-ui/icons/Pets";
import { ParksContext } from "../context/ParksContext";

function AddPark() {
  const { addParks } = useContext(ParksContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [park_size, setPark_Size] = useState("");

  //**--------adding park to list ad database--------------**
  const addToDataBase = async (e) => {
    e.preventDefault();
    try {
      const result = await ParkFinder.post("/", {
        name: name,
        location: location,
        park_size: park_size,
      });
      addParks(result.data.data.parks);
      console.log(result.data.data.parks);
    } catch (err) {}
  };
  //**---------------------------------------------------**

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col">
            <select
              value={park_size}
              onChange={(e) => setPark_Size(e.target.value)}
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled> Park size (rugby fields) </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button
            onClick={addToDataBase}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPark;
