/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import BookingDetails from "./BookingDetails";
import { doc,getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const BookingCard = ({data, user}) =>{
    const [showDetails, setShowDetails] = useState();
    const [car, setCar] = useState();
    useEffect(() =>{
        const fetchCarDetails = async () => {
            try {
                const docRef = doc(firestore, "cars", data.carID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCar({
                        id: docSnap.id,
                        ...docSnap.data()
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching cars data: ", error);
            }
        };
        fetchCarDetails();
    })
    return (
        <div className="flex h-60 border-2 border-gray-100 rounded-md w-[600px] mt-4">
            <div className="w-[50%]"><img src={car?.imageUrl}  alt="" className="object-fill h-full" /></div>
            <div className="p-4">
                <h1 className="lg:text-3xl font-bold">{data.fullName}</h1>
                <div className="flex flex-col mt-2">
                <span>{data.dropOffDate}</span>
                <span>{data.dropOffTime}</span>
                <span>{data.status}</span>
                <span>Total : {data.total}</span>
                <button className="p-2 bg-slate-500 text-white mt-4" onClick={() => setShowDetails(!showDetails)}>View Details</button>
                </div>
            </div>
            {showDetails && <BookingDetails toggle={setShowDetails} data={data} user={user} car={car}/>}
        </div>
    );
}

export default BookingCard;