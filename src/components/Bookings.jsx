
import { useEffect, useState } from "react";
import heading from "../assets/heading.jpeg";
import BookingCard from "./BookingCard";
import Header from "./Header";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { useSelector } from "react-redux";
import { ShimmerPostList } from "react-shimmer-effects";
import { toast } from "react-toastify";

const Bookings = () => {
    const [bookings, setBookings] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // Add state for selected filter
    const user = useSelector(store => store.user);

    useEffect(() => {
        if (!user) return; // Exit if user is not defined

        const bookingsRef = collection(firestore, "bookings");
        const userQuery = user.role === 2
            ? query(bookingsRef, where("cid", "==", user.uid))
            : query(bookingsRef, where("oid", "==", user.uid));

        const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
            const updatedBookings = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            if( bookings && updatedBookings.length > bookings.length) {
                toast.success("New Booking Added");
            }
            setLoading(false);
            setBookings(updatedBookings);
        }, (error) => {
            console.error("Error fetching bookings: ", error);
        });

        return () => unsubscribe();
    }, []);

    // Filter bookings based on the selected status
    const filteredBookings = bookings?.filter(booking => 
        filter === 'all' || booking.status === filter
    );

    return (
        <div>
            <div className="bg-cover bg-center w-[100%] h-[30vh]  text-center"
                style={{ backgroundImage: `url(${heading})` }}>
                     <div className="bg-[rgba(250,250,250,0.7)] h-[30vh] flex flex-col justify-between">
                    <Header />
                <div className="mb-5">
                    <h1 className="text-4xl font-bold">List of your Bookings</h1>
                    <p>Check the details of your Bookings</p>
                </div>
                </div>
            </div>
            <div className="w-[80%] mx-auto p-4 border-2 border-gray-300 rounded-lg mt-10">
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded p-2"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
            {isLoading ? <div className="w-[60%] ml-[10%] mt-4"><ShimmerPostList col={2} row={2} gap={30} /></div> :
            <div className="w-[80%] justify-between flex flex-wrap  mx-auto mt-10">
                {filteredBookings?.map((booking, index) => (
                    <BookingCard key={index} data={booking} user={user} />
                )) || <div>No bookings found.</div>}
            </div>}
        </div>
    );
}
export default Bookings;