import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star text-warning mr-1"></i>); // <- key={i} to remove console error, their is no value to pass as the key, so use 'i'
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <i key={i} className="fas fa-star-half-alt text-warning mr-1"></i>
      );
    } else {
      stars.push(<i key={i} className="far fa-star text-warning mr-1"></i>);
    }
  }
  return <> {stars} </>;
};

export default StarRating;
