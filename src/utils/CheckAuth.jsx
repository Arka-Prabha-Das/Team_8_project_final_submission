import { auth, firestore } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { addUser, removeUser } from "./userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const userStatus = userData.status; // Assuming status is stored in Firestore

                    dispatch(addUser({
                        email: user.email,
                        name: userData.name, // Assuming name is stored in Firestore
                        role: userData.role,
                        uid: user.uid,
                        status: userStatus
                    }));

                    // Check the user status and redirect based on the role
                    if (userStatus !== "Approved") {
                        navigate("/license");
                    } else if (location.pathname === "/login") {
                        navigate("/"); // Redirect to home if they are on the login page
                    } else if (location.pathname === "/admin" && userData.role !== "0") {
                        navigate("/");
                    } else {
                        navigate(location.pathname); // Stay on the current path or go to the specified one
                    }
                } else {
                    if(location.pathname === "/team"){
                        navigate("/team");
                    }
                    navigate("/login"); // Navigate to login if no user data found
                }
            } else {
                dispatch(removeUser());
                if(location.pathname === "/team"){
                    navigate("/team");
                }
                else{
                navigate("/login"); // User not logged in, redirect to login
                }
            }
        });

        return () => unsubscribe(); // Clean up the subscription
    }, [navigate, dispatch, location.pathname]);

    return null; // This component does not render anything
};

export default CheckAuth;