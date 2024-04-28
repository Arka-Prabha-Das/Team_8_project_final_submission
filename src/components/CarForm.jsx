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