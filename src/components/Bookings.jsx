
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

