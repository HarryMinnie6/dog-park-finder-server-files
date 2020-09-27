import React, { useState } from "react";
import "./AddReview.css";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ParkFinder from "../apis/ParkFinder";

const AddReview = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  //<><><>---------submitting review to server-----------<><><>
  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const result = await ParkFinder.post(`${id}/addReview`, {
        name: name,
        review: reviewText,
        rating: rating,
      });
      history.push("/"); //<- these 2 'history.push' redirects us to homepage and then back to current page, lets us refresh the page to show new reviews that are added.
      history.push(location.pathname);
      console.log(result);
    } catch (err) {}
  };
  //<><><>-----------------------------------------------<><><>

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="Rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled> Rating </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={submitReview}
          className="btn btn-primary"
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
