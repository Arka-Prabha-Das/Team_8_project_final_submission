/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { parseISO, differenceInHours } from "date-fns";
import getCheckoutURL from "../utils/payment";

const RentalForm = ({car,user,owner}) => {
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [pickUpDate, setPickUpDate] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [dropOffDate, setDropOffDate] = useState('');
  const [dropOffTime, setDropOffTime] = useState('');
  const [total, setTotal] = useState(car.pph);
  const [isLoading,setisLoading] = useState(false);

  // Simple validation states
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  

  const calculateTotalFare = (dtime) => {
    // Combine date and time into a single ISO string for pickup and drop-off
    const pickupDateTime = `${pickUpDate}T${pickUpTime}:00`; // Assuming pickUpTime is in HH:MM format
    const dropOffDateTime = `${dropOffDate}T${dtime}:00`; // Assuming dropOffTime is in HH:MM format

    // Parse ISO strings to Date objects
    const start = parseISO(pickupDateTime);
    const end = parseISO(dropOffDateTime);

    // Calculate the difference in hours
    const hours = differenceInHours(end, start);

    // Calculate total fare
    const totalFare = hours * car.pph;
    setTotal(totalFare);
  };

    const generateOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
          for (let minute = 0; minute < 60; minute += 60) {
            // Format hour and minute with leading zeros
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            // Concatenate hour and minute to form time string
            const time = `${formattedHour}:${formattedMinute}`;
            // Push time as option
            options.push(
              <option key={time} value={time}>
                {time}
              </option>
            );
          }
        }
        return options;
      };

      const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
      };
    
      // Phone number validation (simple example, adjust regex as needed)
      const validatePhoneNumber = (number) => {
        const re = /^\d{10}$/;
        return re.test(number);
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from actually submitting
    
        // Reset validation errors
        setEmailError('');
        setPhoneError('');
    
        // Validate email
        if (!validateEmail(email)) {
          setEmailError('Invalid email format');
          return;
        }
    
        // Validate phone number
        if (!validatePhoneNumber(phoneNumber)) {
          setPhoneError('Invalid phone number, must be 10 digits');
          return;
        }

        const carID = car.id;
        const oid = car.oid;
        const cid = user.uid;
        const oemail = owner.email;
        console.log(oemail);
        const status = "pending";
        setisLoading(true);
        localStorage.setItem("booking",JSON.stringify({ fullName, email, phoneNumber, pickUpAddress, pickUpDate, pickUpTime, dropOffAddress, dropOffDate, dropOffTime,carID,oid,cid,total,status,oemail }));
        const checkouturl = await getCheckoutURL(total,user);
        setisLoading(false);
        window.location.href=checkouturl;
      };


    return (
        <form onSubmit={handleSubmit} className="w-full rounded-md -mt-40">
            <div className="p-7 bg-[rgb(0,0,0,0.9)] text-white text-center">
                <h1 className="text-4xl">{car.pph}</h1>
                <span>Per hour</span>
            </div>
            <div className="px-6 border-l-2 border-r-2 border-b-2 border-gray-100">
                <div className="flex flex-col mt-6">
                    <label htmlFor="Full Name">Full Name</label>
                    <input
                        type="text"
                        label="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="Full Name"
                        className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                        readOnly
                    />
                </div>
                <div className="flex flex-col mt-6">
                    <label htmlFor="Full Name">Email Address</label>
                    <input
                        type="email"
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email Address"
                        className="border-gray-100 rounded-sm border-2 p-2"
                        readOnly
                    />
                    {emailError}
                </div>
                <div className="flex flex-col mt-6">
                    <label htmlFor="Full Name">Phone Number</label>
                    <input
                        type="text"
                        label="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        placeholder="Phone Number"
                        className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                    />
                    {phoneError}
                </div>
                <div className="flex flex-col mt-6">
                    <label htmlFor="Full Name">Pick Up Address</label>
                    <input
                        type="text"
                        label="address"
                        id="pick-up-address"
                        value={pickUpAddress.address}
                        onChange={(e) => setPickUpAddress(e.target.value)}
                        required
                        placeholder="Pick Up Address"
                        className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                    />
                </div>
                <div className="flex flex-col mt-6">
                    <label htmlFor="Full Name">Pick Up Date</label>
                    <input
                        type="date"
                        label="pickup-date"
                        value={pickUpDate}
                        onChange={(e) => setPickUpDate(e.target.value)}
                        required
                        placeholder="Pick Up Date"
                        className="bg-transparent text-gray-400 border-gray-100 rounded-sm border-2 p-2"
                    />
                </div>
                <div className="flex flex-col mt-6">
                    <label htmlFor="Full Name">Pick Up Time</label>
                    <select name="pickup-time" id="pick-time" className="text-gray-400 p-2 border-gray-100 rounded-sm border-2"
                    onChange={(e) => setPickUpTime(e.target.value)}>
                        {generateOptions()}
                    </select>
                </div>
                <div className="flex flex-col mt-6">
                    <label htmlFor="Full Name">Drop Off Address</label>
                    <input
                        type="text"
                        label="address"
                        value={dropOffAddress}
                        onChange={(e) => setDropOffAddress(e.target.value)
                      }
                        required
                        placeholder="Pick Up Address"
                        className="bg-transparent border-gray-100 rounded-sm border-2 p-2"
                    />
                </div>
                <div className="flex flex-col mt-6">
                    <label htmlFor="Full Name">Drop Off Date</label>
                    <input
                        type="date"
                        label="pickup-date"
                        value={dropOffDate}
                        onChange={(e) => setDropOffDate(e.target.value)}
                        required
                        placeholder="Pick Up Date"
                        className="bg-transparent text-gray-400 border-gray-100 rounded-sm border-2 p-2"
                    />
                </div>
                <div className="flex flex-col mt-6">
                    <label htmlFor="Full Name">Drop Off Time</label>
                    <select name="pickup-time" id="pick-time" className="text-gray-400 p-2 border-gray-100 rounded-sm border-2"
                    onChange={(e) => {setDropOffTime(e.target.value); calculateTotalFare(e.target.value);}}>
                        {generateOptions()}
                    </select>
                </div>
                <div className="mt-6">
                    Total: {total}
                </div>
                <div className="mx-auto w-[50%]"><button className="p-3 bg-green-600 rounded-md mx-auto my-6 w-full">{ !isLoading ? "Book Now" :"redirecting to payment"}</button></div>
            </div>
        </form>
    );
}

export default RentalForm;