import heading from "../assets/heading.jpeg";
import CarCard from "./CarCard";
import CarFilter from "./CarFilter";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { useSelector } from "react-redux";
import CarForm from "./CarForm";
import { ShimmerPostList } from "react-shimmer-effects";

const Car = () => {
    const user = useSelector(store => store.user);
    const [cars, setCars] = useState(null);
    const [filteredCars, setFilteredCars] = useState("-1");
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const location = useLocation();
    const fetchCarsData = async () => {
        setLoading(true);
        try {
            if (user) {
                let q = user.role === 2 ? query(collection(firestore, "cars")) : query(collection(firestore, "cars"), where("oid", "==", user.uid));
                if (onlyAvailable) {
                    q = query(q, where("bookingStatus", "==", "available"));
                }
                const querySnapshot = await getDocs(q);
                const carList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCars(carList);
            }
        } catch (error) {
            console.error("Error fetching cars data: ", error);
        } finally {
            setLoading(false);
        }
    };
    const filterCars = (brand,type,price,status) =>{
        console.log(brand,type,price,status);
        if (!cars) {
            setFilteredCars([]);
            setLoading(false);
            return;
        }
        if (type === "" && brand === "" && price ==="" && status ==="") {
            setFilteredCars("-1");
            setLoading(false);
            return;
        }
        let filtered = cars.filter(car => 
            car.carName.toLowerCase().includes(brand.toLowerCase()) && 
            car.type.toLowerCase().includes(type.toLowerCase()) && (price===""?"123456789".includes(car.pph):price.includes(car.pph))&&(car.status.toLowerCase().includes(status.toLowerCase()))
        );
        if (onlyAvailable) {
            filtered = filtered.filter(car => car.bookingStatus === "available");
        }
        setFilteredCars(filtered);
    }
    const toggleAvailability = () => {
        setOnlyAvailable(!onlyAvailable);
    };
    useEffect(() => {
        fetchCarsData();
    }, [user, onlyAvailable]); // Dependencies should ensure this only runs when necessary

    useEffect(() => {
        // This effect handles filtering and is separate from data fetching
        const brand = location.state?.brand || "";
        const type = location.state?.type || "";
        filterCars(brand,type,"","");
    }, [cars, location.state]); 
    return (
        <div>
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
            <div className="w-full flex justify-end p-4">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={onlyAvailable} onChange={toggleAvailability}/>
                    <span>Show only available cars</span>
                </label>
            </div>
            {isLoading ? <div className="w-[60%] ml-[10%] mt-4"><ShimmerPostList postStyle="STYLE_FOUR" col={2} row={2} gap={30} /></div> :
                <div>
                    {(user && user.role == 1) && <div className="w-[80%] mt-4 flex flex-col mx-auto">
                        <div className="flex justify-end">
                            <button className="bg-blue-950 text-white px-3 py-2 rounded-md" onClick={() => setShowForm(!showForm)}>{!showForm ? "Add Car" : "Cancel"}</button>
                        </div>
                        <div className="w-full">
                            {showForm && <CarForm user={user} toggle={setShowForm} fetch={fetchCarsData} />}
                        </div>
                    </div>}

                    <div className="flex w-[80%] mt-10 gap-10 mx-auto flex-col-reverse lg:flex-row">
                        <div className="flex  flex-wrap gap-10 w-full lg:w-[75%]">
                            {filteredCars === "-1" ? (cars.length === 0 ? <div>{user.role === 1 ? "Add a car to get started" : "Waiting for the owner to add cars"}</div> : cars?.map((car, index) => <CarCard key={index} car={car} />)) : filteredCars.length === 0 ? <div>No Cars Found for the specified filters</div> : filteredCars.map((car, index) => <CarCard key={index} car={car} />)}
                        </div>
                        <div className="w-full lg:w-[25%]">
                            <CarFilter filterCars={filterCars} />
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default Car;