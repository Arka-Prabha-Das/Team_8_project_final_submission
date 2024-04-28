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
    return (
        <>
            <main className='text-gray-800'>
                <div >
                    <div className="bg-cover bg-center w-[100vw] h-[100vh] items-center flex flex-col"
                    >
                        <div className="bg-[rgba(250,250,250,0.7)] h-[20vh] mb-5 flex flex-col justify-between w-full">
                            <Header />
                        </div>
                        <div className="flex flex-col w-[45%] absolute top-0 right-0 -z-10">
                            <img src="/src/assets/hero-bg.png" alt="" />
                        </div>
                        <div className='w-[60%] absolute -z-10 right-24 top-[25%]'>
                            <img src="/src/assets/main-car.png" alt="" />
                        </div>

                        <div className='w-[30%] px-24 py-20 mx-auto border-2 border-gray-100 shadow-lg rounded-md bg-white'>
                            <h1 className='text-3xl font-bold'>{isLogin ? "SignIn" : "SignUp"}</h1>
                            <span>{isLogin ? "Login to access the application" : "Register yourself to access the application"}</span>
                            <form onSubmit={onLogin}>
                                {
                                    !isLogin &&
                                    <div className='flex flex-col mt-6'>
                                        <label htmlFor="full-name">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            label="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="Full Name"
                                            className='bg-transparent border-gray-200 rounded-sm border-2 p-2'
                                        />
                                        {errors.fullName && <span className='text-red-700'>{errors.fullName}</span>}
                                    </div>
                                }
                                <div className='flex flex-col mt-6'>
                                    <label htmlFor="email-address">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        label="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Email address"
                                        className='bg-transparent border-gray-200 rounded-sm border-2 p-2'
                                    />
                                    {errors.email && <span className='text-red-700'>{errors.email}</span>}
                                </div>

                                <div className='flex flex-col mt-6'>
                                    <label htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        label="Create password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Password"
                                        className='bg-transparent border-gray-200 rounded-sm border-2 p-2'
                                    />
                                    {errors.password && <span className='text-red-700'>{errors.password}</span>}
                                </div>
                                {!isLogin && (
                                    <div className='flex flex-col mt-6'>
                                        <label htmlFor="confirm-password">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            placeholder="Confirm Password"
                                            className='bg-transparent border-gray-200 rounded-sm border-2 p-2'
                                        />
                                        {errors.confirmPassword && <span className='text-red-700'>{errors.confirmPassword}</span>}
                                    </div>
                                )}
                                {
                                    !isLogin && <div className="flex flex-col mt-6">
                                        <label htmlFor="password">Role</label>
                                        <select
                                            name="role"
                                            id="role"
                                            className="bg-transparent p-2 border-2 border-gray-200"

                                            onChange={handleRoleChange}
                                        >
                                            <option className="bg-transparent" value="">Select Role</option>
                                            <option className="bg-transparent" value="owner">Car Owner</option>
                                            <option className="bg-transparent" value="customer">Customer</option>
                                        </select>
                                        {errors.role && <span className='text-red-700'>{errors.role}</span>}
                                    </div>
                                }
                                <button
                                    type="submit"
                                    className='mt-8 bg-[#1247e6] text-white px-5 py-2 rounded-sm w-full'
                                >
                                    {isLogin ? "SignIn" : "SignUp"}
                                </button>

                            </form>
                            {errors.firebase && <span className='text-red-700'>{errors.firebase}</span>}
                            <p className='mt-4'>
                                {isLogin ? "Don't have an account" : "Already have an account "} {" "}
                                <span className='border-b-2 border-gray-300' onClick={() => toggleSignIn()}>
                                    {isLogin ? "Sign Up" : "Sign In"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login