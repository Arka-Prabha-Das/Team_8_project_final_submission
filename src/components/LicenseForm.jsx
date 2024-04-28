import { useState,useEffect } from 'react';
import heading from "../assets/heading.jpeg";
import { collection, addDoc,query,where,getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, firestore } from "../firebase";
import { toast } from "react-toastify";
import Header from "./Header";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
function LicenseForm() {
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [licenseImage, setLicenseImage] = useState(null);
    const [licenseData, setLicenseData] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        licenseNumber: '',
        dateOfBirth: '',
        stateOfIssue: '',
        address: '',
        licenseClass: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'licenseImage') {
            setLicenseImage(files[0]); // Directly set the file to licenseImage state
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const processImageUpload = async () => {
            const storageRef = ref(storage, `license/${licenseImage.name}`);
            const uploadTask = uploadBytesResumable(storageRef, licenseImage);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => {
                        console.error("Upload failed:", error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        };

        console.log(formData);
        const imageUrl = await processImageUpload();
        const uid = user.uid;
        const formJson = { ...formData, imageUrl, uid };
        await addDoc(collection(firestore, "license"), formJson);
        toast.success("License added successfully!");
        setFormData({
            fullName: '',
            licenseNumber: '',
            dateOfBirth: '',
            stateOfIssue: '',
            address: '',
            licenseClass: '',
        });
        setLicenseImage(null);
        setUploadProgress(0);
        navigate("/");

    };

    useEffect(() => {
        const checkForLicense = async () => {
            const licenseRef = collection(firestore, "license");
            const q = query(licenseRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    setLicenseData(doc.data()); // assuming there's only one license per user
                });
            }
        };

        if (user) {
            checkForLicense();
        }
    }, [user]);

    if(licenseData){
        return (
            <>
            <div className="bg-cover bg-center w-[100%] h-[30vh]  text-center "
                style={{ backgroundImage: `url(${heading})` }}>
                <div className="bg-[rgba(250,250,250,0.7)] h-[30vh] flex flex-col justify-between">
                    <Header />
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-md p-4  mt-5">
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 w-full mx-auto">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">License Details</div>
                <p className="text-gray-700 text-base">
                  <strong>Full Name:</strong> {licenseData.fullName}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>License Number:</strong> {licenseData.licenseNumber}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Date of Birth:</strong> {licenseData.dateOfBirth}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>State/Country of Issue:</strong> {licenseData.stateOfIssue}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Address:</strong> {licenseData.address}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>License Class:</strong> {licenseData.licenseClass}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {licenseData.imageUrl && (
                  <img
                    src={licenseData.imageUrl}
                    alt="License"
                    className="w-full h-auto"
                  />
                )}
              </div>
            </div>
            </div>
            </>
        )
    }
    return (
        <>
            <div className="bg-cover bg-center w-[100%] h-[30vh]  text-center "
                style={{ backgroundImage: `url(${heading})` }}>
                <div className="bg-[rgba(250,250,250,0.7)] h-[30vh] flex flex-col justify-between">
                    <Header />
                    <div className="mb-5">
                        <h1 className="text-4xl font-bold">List of Cars</h1>
                        <p>Choose your Car from wide range of our cars</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-7 mt-10 shadow-md">
                <h1 className='text-center font-semibold text-xl text-black mb-5'>License Form</h1>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <label className="flex items-center text-sm font-medium text-gray-700 justify-end mr-2">Full Name:</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="col-span-1 border-gray-300 border-b-2 rounded-md shadow-sm" />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <label className="flex items-center text-sm font-medium text-gray-700 justify-end mr-2">License Number:</label>
                    <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required className="col-span-1 border-gray-300 border-b-2 rounded-md shadow-sm" />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <label className="flex items-center text-sm font-medium text-gray-700 justify-end mr-2">Date of Birth:</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="col-span-1 border-gray-300 border-b-2 rounded-md shadow-sm" />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <label className="flex items-center text-sm font-medium text-gray-700 justify-end mr-2">State/Country of Issue:</label>
                    <input type="text" name="stateOfIssue" value={formData.stateOfIssue} onChange={handleChange} required className="col-span-1 border-gray-300 border-b-2 rounded-md shadow-sm" />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <label className="flex items-center text-sm font-medium text-gray-700 justify-end mr-2">Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required className="col-span-1 border-gray-300 border-b-2 rounded-md shadow-sm" />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <label className="flex items-center text-sm font-medium text-gray-700 justify-end mr-2">License Class:</label>
                    <input type="text" name="licenseClass" value={formData.licenseClass} onChange={handleChange} required className="col-span-1 border-gray-300 border-b-2 rounded-md shadow-sm" />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <label className="flex items-center text-sm font-medium text-gray-700 justify-end mr-2">Upload Photo of License:</label>
                    <input type="file" name="licenseImage" onChange={handleChange} required className="col-span-1 border-gray-300 rounded-md shadow-sm file:bg-green-500 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:text-white file:cursor-pointer hover:file:bg-green-600" />
                </div>

                <div className="flex justify-center">
                    <input type="submit" value="Submit" className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded" />
                </div>
            </form>
            {uploadProgress > 0 && <div>Upload is {uploadProgress}% done</div>}
        </>

    );
}

export default LicenseForm;