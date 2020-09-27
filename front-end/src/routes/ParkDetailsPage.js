import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ParkFinder from "../apis/ParkFinder";
import AddPark from "../components/AddPark";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { ParksContext } from "../context/ParksContext";
import "./ParkDetailsPage.css";

function ParkDetailsPage() {
  const { id } = useParams();
  const { selectedPark, setSelectedPark } = useContext(ParksContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ParkFinder.get(`/${id}`);
        console.log(result);
        setSelectedPark(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card-holder">
      <div>
        {selectedPark && (
          <>
            <h1 className="text-center display-1">{selectedPark.parks.name}</h1>
            <div className="text-center">
              <StarRating rating={selectedPark.parks.average_rating} />
              <span className="text-warning ml-1">
                {selectedPark.reviews.count ? `${selectedPark.count}` : "(0)"}
              </span>
            </div>
            <div>
              <div className="mt-3">
                <Reviews reviews={selectedPark.reviews} />
              </div>
              <AddReview />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ParkDetailsPage;
