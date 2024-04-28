import { firestore } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { subscribeToBooking } from "../utils/actions/bookings";

const SuccessPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sessionId } = useParams();
    const [booking, setBooking] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        // Fetch booking details from localStorage or any other source
        const bookingString = localStorage.getItem("booking");
        const bookingJson = JSON.parse(bookingString);
        setBooking({ ...bookingJson, sessionId });
    }, [sessionId]);

    const sendEmailAndCreateBooking = async () => {
        try {
            if (!processing && booking) {
                setProcessing(true);

                // Send email
                emailjs.init('CfuTiz7bqd4jpYUug');
                const emailResponse = await emailjs.send('service_xvgnh3v', 'template_fuw9w7c', {
                    to_name: "TEst",
                    from_name: 'Car Rental Service',
                    message: `A booking for your car has been made.`,
                    reply_to: 'noreply@yourdomain.com',
                    to_email: booking.oemail,
                });
                console.log('Email sent successfully:', emailResponse);

                // Create booking
                const docRef = await addDoc(collection(firestore, "bookings"), booking);
                console.log("Booking added to Firestore with ID:", docRef.id);

                // Update car booking status
                const carRef = doc(firestore, "cars", booking.carID);
                await updateDoc(carRef, {
                    bookingStatus: "booked"
                });
                dispatch(subscribeToBooking(docRef.id));
                console.log("Booking added to Firestore with ID:", docRef.id);

                toast.success("Your booking is done. Email sent to the owner.");
                navigate("/bookings");
            }
        } catch (error) {
            console.error('Error processing booking:', error);
            toast.error("There was an error processing your booking. Please try again later.");
        }
    };

    return (
        <div className="w-[30%] mx-auto flex flex-col text-center justify-center border-2 border-gray-100 p-10 mt-20 shadow-md">
            <div>Payment processed successfully</div>
            <button className="bg-green-300 w-[30%] mx-auto p-2 rounded-md mt-5" onClick={() => sendEmailAndCreateBooking()}>Proceed</button>
        </div>
    );
};

export default SuccessPage;
