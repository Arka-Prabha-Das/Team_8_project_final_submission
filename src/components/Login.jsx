import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from "../firebase";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import validateForm from '../utils/util';
import Header from './Header';


const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setLogin] = useState(true);
    const [roleID, setRoleID] = useState("");
    const [errors, setErrors] = useState({});
    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        if (selectedRole === "owner") {
            setRoleID(1);
        } else if (selectedRole === "customer") {
            setRoleID(2);
        }
    };

    const toggleSignIn = () => {
        setLogin(!isLogin);
    }

    const onLogin = async (e) => {
        e.preventDefault();
        console.log(email, name, password, roleID);
        const validationErrors = validateForm({ email, name, password, roleID }, isLogin);
        if (!isLogin && password !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match.";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (isLogin) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const docRef = doc(collection(firestore, "users"), user.uid);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    const userRole = userData.role; // Assuming role is stored in Firestore
                    dispatch(addUser({
                        email: user.email,
                        name: userData.name, // Assuming name is stored in Firestore
                        role: userRole,
                        uid: docSnapshot.id
                    }));
                }
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrors({ firebase: `${errorCode}: ${errorMessage}` });
            }
        }
        else {
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            ).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrors({ firebase: `${errorCode}: ${errorMessage}` });
        
            });
            const status = roleID == 2 ? "Pending" : "Approved";
            await setDoc(doc(firestore, "users", userCred.user.uid), {
                role: roleID,
                email: email,
                name: name,
                status:status
            });
        }
    }