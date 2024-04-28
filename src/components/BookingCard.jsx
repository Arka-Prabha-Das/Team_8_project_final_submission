// BookingCard.js
import { useEffect, useState } from "react";
import BookingDetails from "./BookingDetails";
import { fetchCarDetails } from "./carService";

const BookingCard = ({ data, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const carData = await fetchCarDetails(data.carID);
      setCar(carData);
    };
    fetchData();
  }, [data.carID]);

  return (
    <div className="flex h-60 border-2 border-gray-100 rounded-md w-[600px] mt-4">
      <div className="w-[50%]">
        <img src={car?.imageUrl} alt="" className="object-fill h-full" />
      </div>
      <div className="p-4">
        <h1 className="lg:text-3xl font-bold">{data.fullName}</h1>
        <div className="flex flex-col mt-2">
          <span>{data.dropOffDate}</span>
          <span>{data.dropOffTime}</span>
          <span>{data.status}</span>
          <span>Total : {data.total}</span>
          <button
            className="p-2 bg-slate-500 text-white mt-4"
            onClick={() => setShowDetails(!showDetails)}
          >
            View Details
          </button>
        </div>
      </div>
      {showDetails && <BookingDetails toggle={setShowDetails} data={data} user={user} car={car} />}
    </div>
  );
};

export default BookingCard;