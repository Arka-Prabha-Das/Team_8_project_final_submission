/* eslint-disable react/prop-types */
import { useState } from "react";

import { storage, firestore } from "../firebase"; // Assume this is your Firebase setup file
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CarForm = ({ user, toggle, fetch, isEditMode = false, editData }) => {
    const [carName, setCarName] = useState("");
    const [gear, setGear] = useState("");
    const [luggage, setLuggage] = useState("");
    const [passengers, setPassengers] = useState("");
    const [pph, setPPh] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState();
    const [insuranceCompany, setInsuranceCompany] = useState("");
    const [policyNumber, setPolicyNumber] = useState("");
    const [policyStartDate, setPolicyStartDate] = useState("");
    const [policyEndDate, setPolicyEndDate] = useState("");
    const [coverageLimits, setCoverageLimits] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [insuranceCertificate, setInsuranceCertificate] = useState(null);
    
 
    useEffect(() => {
        if (isEditMode) {
            setCarName(editData.carName || "");
            setGear(editData.gear || "");
            setLuggage(editData.luggage || "");
            setPassengers(editData.passengers || "");
            setPPh(editData.pph || "");
            setType(editData.type || "");
            setInsuranceCompany(editData.insuranceCompany || "");
            setPolicyNumber(editData.policyNumber || "");
            setPolicyStartDate(editData.policyStartDate || "");
            setPolicyEndDate(editData.policyEndDate || "");
            setCoverageLimits(editData.coverageLimits || "");
            // For image, you're only storing the reference as it's not editable
        }
    }, [editData, isEditMode]);

    const handleInsuranceCertificateUpload = async () => {
        if (!insuranceCertificate) return null;

        const storageRef = ref(storage, `insuranceCertificates/${insuranceCertificate.name}`);
        const uploadTask = uploadBytesResumable(storageRef, insuranceCertificate);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEditMode && !image) {
            alert("Please upload an image for the car.");
            return;
        }

        const processImageUpload = async () => {
            const storageRef = ref(storage, `cars/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

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

        const carData = {
            carName,
            gear,
            luggage,
            passengers: Number(passengers),
            pph: Number(pph),
            type,
        };

        try {
            if (!isEditMode) {
                const imageUrl = await processImageUpload();
                const insuranceImageUrl = await handleInsuranceCertificateUpload();
                const oid = user.uid;
                const status = "Pending";
                const bookingStatus="available";
                const carJson = {...carData,imageUrl,oid, insuranceImageUrl,insuranceCompany,policyNumber,policyStartDate,policyEndDate,coverageLimits,bookingStatus,status};
                await addDoc(collection(firestore, "cars"), carJson);
                toast.success("Car added successfully!");
            } else {
                // Assuming `editData` has an id field for the document to be updated
                const docRef = doc(firestore, "cars", editData.id);
                await updateDoc(docRef, carData);
                toast.success("Car updated successfully!");
            }
            fetch();
        } catch (error) {
            console.error("Error saving document: ", error);
            toast.error("Error saving car, please try again.");
        } finally {
            setCarName("");
            setGear("");
            setLuggage("");
            setPassengers("");
            setPPh("");
            setType("");
            setImage(null);
            setInsuranceCompany("");
            setPolicyNumber("");
            setPolicyStartDate("");
            setPolicyEndDate("");
            setCoverageLimits("");
            setInsuranceCertificate(null);
            if(!isEditMode){
            toggle();
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full rounded-md ">
                <div className="px-6 border-l-2 border-r-2 border-b-2 border-gray-100">
                    <div className="flex flex-col mt-6">
                        <label htmlFor="Full Name">Name of the car</label>
                        <input
                            type="text"
                            label="name"
                            value={carName}
                            onChange={(e) => setCarName(e.target.value)}
                            required
                            placeholder="Car Name"
                            className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="Full Name">No of Passengers</label>
                        <input
                            type="number"
                            label="email"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            required
                            placeholder="0"
                            className="border-gray-100 rounded-sm border-2 p-2"
                        />

                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="Full Name">Luggage Capacity</label>
                        <input
                            type="text"
                            label="phone"
                            value={luggage}
                            onChange={(e) => setLuggage(e.target.value)}
                            required
                            placeholder="0"
                            className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="carType">Type of the Car</label>
                        <select
                            id="carType"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                            className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                        >
                            <option value="">Select car type</option>
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="coupe">Coupe</option>
                        </select>
                    </div>

                    <div className="flex flex-col mt-6">
                        <label htmlFor="gearType">Type of Gear</label>
                        <select
                            id="gearType"
                            value={gear}
                            onChange={(e) => setGear(e.target.value)}
                            required
                            className="bg-transparent  border-gray-100 rounded-sm border-2 p-2"
                        >
                            <option value="">Select gear type</option>
                            <option value="automatic">Automatic</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="manual">Manual</option>
                        </select>
                    </div>

                    <div className="flex flex-col mt-6">
                        <label htmlFor="Full Name">Price Per Hour</label>
                        <input
                            type="number"
                            label="pickup-date"
                            value={pph}
                            onChange={(e) => setPPh(e.target.value)}
                            required
                            placeholder="$0"
                            className="bg-transparent  border-gray-100 rounded-sm border-2 p-2"
                        />
                    </div>
                    {!isEditMode && <div className="flex flex-col mt-6">
                        <label htmlFor="carImage">Car Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                            className="border-gray-100 rounded-sm border-2 p-2"
                        />
                    </div>}
                    <div className="flex flex-col mt-6">
                <label htmlFor="insuranceCompany">Insurance Company</label>
                <input
                    type="text"
                    id="insuranceCompany"
                    value={insuranceCompany}
                    onChange={(e) => setInsuranceCompany(e.target.value)}
                    required
                    placeholder="Insurance Company Name"
                    className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                />
            </div>

            <div className="flex flex-col mt-6">
                <label htmlFor="policyNumber">Policy Number</label>
                <input
                    type="text"
                    id="policyNumber"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    required
                    placeholder="Policy Number"
                    className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                />
            </div>

            <div className="flex flex-col mt-6">
                <label htmlFor="policyStartDate">Policy Start Date</label>
                <input
                    type="date"
                    id="policyStartDate"
                    value={policyStartDate}
                    onChange={(e) => setPolicyStartDate(e.target.value)}
                    required
                    className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                />
            </div>

            <div className="flex flex-col mt-6">
                <label htmlFor="policyEndDate">Policy End Date</label>
                <input
                    type="date"
                    id="policyEndDate"
                    value={policyEndDate}
                    onChange={(e) => setPolicyEndDate(e.target.value)}
                    required
                    className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                />
            </div>

            <div className="flex flex-col mt-6">
                <label htmlFor="coverageLimits">Coverage Limits</label>
                <input
                    type="text"
                    id="coverageLimits"
                    value={coverageLimits}
                    onChange={(e) => setCoverageLimits(e.target.value)}
                    required
                    placeholder="Coverage Limits"
                    className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                />
            </div>
            {!isEditMode && <div className="flex flex-col mt-6">
                <label htmlFor="insuranceCertificate">Insurance Certificate</label>
                <input
                    type="file"
                    id="insuranceCertificate"
                    onChange={(e) => setInsuranceCertificate(e.target.files[0])}
                    required={!isEditMode} // Only required if not in edit mode
                    className="border-gray-100 rounded-sm border-2 p-2"
                />
            </div>}


                    <div className="mx-auto w-[50%]"><button className="p-3 bg-green-600 rounded-md mx-auto my-6 w-full">{isEditMode?"Edit Car": "Add Car"}</button></div>
                </div>
            </form>
            {uploadProgress > 0 && <div>Upload is {uploadProgress}% done</div>}
        </div>
    );
}

export default CarForm;