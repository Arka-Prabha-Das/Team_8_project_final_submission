import { useState } from "react";

/* eslint-disable react/prop-types */
const CarFilter = ({filterCars}) => {
    const [type,setType] = useState("");
    const [brand,setBrand] = useState("");
    const [price,setPrice] = useState("");
    const [status, setStatus] = useState("");
    return (
        <div className="border-2 border-gray-200 pb-10">
            <div className="bg-blue-950 p-6 text-white">Search a Car</div>
            <div className="w-[70%] mx-auto mt-4 ">
                <h2 className="font-semibold">BY MAKE</h2>
                <select
                    name="brand"
                    id="brand"
                    className="bg-white  rounded-sm p-2 mt-2 border-2 w-full border-gray-200"
                    onChange={(event) => { setBrand(event.target.value);filterCars(event.target.value,type,price,status)}}
                >
                    <option className="bg-transparent" value="">Select Car Brand</option>
                    <option className="bg-transparent" value="audi">Audi</option>
                    <option className="bg-transparent" value="porsche">Porsche</option>
                    <option className="bg-transparent" value="toyota">Toyota</option>
                </select>
            </div>
            <div className="w-[70%] mx-auto mt-4">
                <h2 className="font-semibold">PRICE RANGE</h2>
                <select
                    name="price"
                    id="price"
                    className="bg-white  rounded-sm p-2  mt-2 border-2 w-full border-gray-200"
                    onChange={(event) => {setPrice(event.target.value);filterCars(brand,type,event.target.value,status)}}
                >
                    <option className="bg-transparent" value="">Select price per hour</option>
                    <option className="bg-transparent" value="123">1$ - 3$</option>
                    <option className="bg-transparent" value="456">4$ - 6$</option>
                    <option className="bg-transparent" value="789">Above 6$</option>
                </select>
            </div>
            <div className="w-[70%] mx-auto mt-4">
                <h2 className="font-semibold">CAR TYPE</h2>
                <select
                    name="type"
                    id="type"
                    className="bg-white  rounded-sm p-2 mt-2 border-2 w-full border-gray-200"
                    onChange={(event) => {setType(event.target.value);filterCars(brand,event.target.value,price,status)}}
                >
                    <option className="bg-transparent" value="">Select Car Type</option>
                    <option className="bg-transparent" value="sedan">Sedan</option>
                    <option className="bg-transparent" value="coupe">Coupe</option>
                    <option className="bg-transparent" value="suv">SUV</option>
                </select>
            </div>
            <div className="w-[70%] mx-auto mt-4">
                <h2 className="font-semibold">CAR STATUS</h2>
                <select
                    name="status"
                    id="status"
                    className="bg-white  rounded-sm p-2 mt-2 border-2 w-full border-gray-200"
                    onChange={(event) => {setStatus(event.target.value);filterCars(brand,type,price, event.target.value)}}
                >
                    <option className="bg-transparent" value="">Select Car Status</option>
                    <option className="bg-transparent" value="approved">Approved</option>
                    <option className="bg-transparent" value="rejected">Rejected</option>
                    <option className="bg-transparent" value="pending">Pending</option>
                </select>
            </div>
            <div className="w-[70%] mx-auto mt-8"> 
            <button className="bg-blue-950 text-white w-full py-2 rounded-md"onClick={() => {setType("");setBrand("");setPrice("");setStatus("");filterCars("","","","")}} >Reset Filter</button>
            </div>
        </div>
    );
}

export default CarFilter;