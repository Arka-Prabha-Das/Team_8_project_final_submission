
import { useEffect, useState } from "react";
import { collection, query, getDocs, where, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { toast } from "react-toastify";


const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [carsList, setCarsList] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedLicense, setselectedLicense] = useState(null);
  const [activeTab, setActiveTab] = useState('Customers'); // Track the active tab

  const [disputesList, setDisputesList] = useState([]);
  const [selectedDispute, setSelectedDispute] = useState(null);

  const fetchDisputes = async () => {
    setSelectedDispute(null);
    setSelectedCar(null);
    setSelectedDriver(null);
    const q = query(collection(firestore, "disputes"));
    const querySnapshot = await getDocs(q);
    setDisputesList(querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  }

  const handleDisputeClick = (dispute) => {
    setSelectedDispute(dispute);
  };

  const handleAdminResponse = async (response) => {
    if (selectedDispute && selectedDispute.id) {
      const disputeDocRef = doc(firestore, "disputes", selectedDispute.id);
      try {
        await updateDoc(disputeDocRef, {
          adminResponse: response,
          status: 'resolved'
        });
        toast.success("Response sent and dispute marked as resolved");
        fetchDisputes(); // Refresh the list of disputes
      } catch (error) {
        console.error("Error updating dispute: ", error);
        toast.error("Failed to send response");
      }
    }
  };

  const fetchUsers = async () => {
    const q = query(collection(firestore, "users"));
    const querySnapshot = await getDocs(q);
    setUserList(querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  }
  const fetchLicenseDetails = async (driver) => {
    setselectedLicense(null);
    const q = query(collection(firestore, "license"), where("uid", "==", driver.id));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const licenses = querySnapshot.docs.map(doc => doc.data()); // assuming there can be more than one license per UID
        // If you are sure there will only be one, you can directly access it with querySnapshot.docs[0].data()
        setselectedLicense(licenses[0]); // setting the first license found
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }
  const filterOwners = () => {
    setSelectedCar(null);
    setSelectedDriver(null);
    setSelectedDispute(null);
    setFilterUsers(userList.filter(user => user.role === 1));
  }

  const filterCustomers = () => {
    setSelectedDriver(null);
    setselectedLicense(null);
    setSelectedDispute(null);
    setFilterUsers(userList.filter(user => user.role === 2));
  }

  const fetchCarsList = async (driver) => {
    setSelectedCar(null);
    setSelectedDispute(null);
    const q = query(collection(firestore, "cars"), where("oid", "==", driver.id));
    const querySnapshot = await getDocs(q);
    setCarsList(querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  }

  const updateUserStatus = async (newStatus) => {
    const userDocRef = doc(firestore, "users", selectedDriver.id); // Reference to the specific booking document

    try {
      await updateDoc(userDocRef, {
        status: newStatus, // Update the status field with the new status
      });
      toast.success(`User status updated to: ${newStatus}`);
      fetchUsers();
      if(activeTab === "Customers"){
        filterCustomers();
      }
      else if(activeTab === "Car Owners"){
        filterOwners()
      }
    } catch (error) {
      console.error("Error updating user status: ", error);
    }
  }
  const updateCarStatus = async (newStatus) => {
    const carDocRef = doc(firestore, "cars", selectedCar.id); // Reference to the specific booking document

    try {
      await updateDoc(carDocRef, {
        status: newStatus, // Update the status field with the new status
      });
      toast.success(`Car status updated to: ${newStatus}`);
      fetchCarsList();
    } catch (error) {
      console.error("Error updating user status: ", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (activeTab === 'Car Owners') {
      filterOwners();
    } else if (activeTab === "Customers") {
      filterCustomers();
    }
    else{
      fetchDisputes();
    }

  }, [userList, activeTab]); // Added activeTab as a dependency

  const navigation = [
    { name: 'Customers', current: activeTab === 'Customers', fun: () => setActiveTab('Customers') },
    { name: 'Car Owners', current: activeTab === 'Car Owners', fun: () => setActiveTab('Car Owners') },
    { name: 'Manage Disputes', current: activeTab === 'Manage Disputes', fun: () => setActiveTab('Manage Disputes') }
  ];

  return (
    <div className="flex bg-gray-200">
      <div className="w-64" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded h-[100vh] dark:bg-gray-800">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  onClick={item.fun}
                  className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${item.current ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                >
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-[20%] m-7">
        {/* User List */}
        <div className="bg-white shadow rounded-md p-4 h-[94vh]">
          {/* Dynamic Header based on Active Tab */}
          <div className="pb-2 border-b mb-3">
            <h3 className="text-lg font-semibold text-gray-700">{activeTab === 'Car Owners' && 'All Owners' }{activeTab === 'Customers' && 'All Customers'} {activeTab=== 'Manage Disputes' && "All Disputes"}</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {/* Users */}
            { (activeTab === 'Car Owners' || activeTab === 'Customers') &&  filterUsers.map((user) => (
              <li key={user.id} className="py-3 flex justify-between items-center" onClick={() => { setSelectedDriver(user); activeTab === 'Car Owners' ? fetchCarsList(user) : fetchLicenseDetails(user); }}>
                <div className="flex items-center">
                  <div className="ml-3">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {user.status}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </li>
            ))}
            {
              activeTab === 'Manage Disputes' && disputesList.map((dispute) => (
                <li key={dispute.id} className="py-3" onClick={() => handleDisputeClick(dispute)}>
                  <div className="flex justify-between items-center">
                    <span>{dispute.userEmail} - {dispute.issue}</span>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${dispute.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {dispute.status}
                    </span>
                  </div>
                </li>
              ))}
            
          </ul>
        </div>
      </div>

      <div className="w-[60%] p-4 bg-gray-50">
        {/* Conditional Rendering based on Active Tab */}
        <div className="bg-white shadow-lg rounded-md p-4 w-full">
          <div className="pb-2 border-b mb-3">
            <h3 className="text-lg font-semibold text-gray-700">{activeTab === 'Car Owners' && 'Owner Information' }{activeTab === 'Customers' && 'Customer Information'} {activeTab=== 'Manage Disputes' && "Dispute Information"}</h3>
          </div>
          {selectedDriver && (
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <h4 className="text-md font-medium text-gray-900">{selectedDriver?.name}</h4>
                <p className="text-sm text-gray-500">ID: {selectedDriver?.id}</p>
              </div>
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedDriver?.status === 'Approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}
              >
                {selectedDriver?.status}
              </span>
            </div>
          )}
          

            {selectedDispute && (
              <>
                <h4 className="text-md font-medium text-gray-900">Dispute Details</h4>
                <p><strong>Issue:</strong> {selectedDispute.issue}</p>
                {selectedDispute.status === 'pending' ? (
                  <>
                    <textarea className="mt-2 p-2 w-full" placeholder="Type your response..." />
                    <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAdminResponse(document.querySelector('textarea').value)}>Send Response</button>
                  </>
                ) : (
                  <p><strong>Admin Response:</strong> {selectedDispute.adminResponse}</p>
                )}
              </>
            
          
        )}


        </div>
        {activeTab === 'Car Owners' && (
          <>
            {/* Car Owners Information & Cars List */}

            <div className="bg-white shadow-lg rounded-md p-4 w-full mt-5">
              <div className="pb-2 border-b mb-3">
                <h3 className="text-lg font-semibold text-gray-700">Cars</h3>
              </div>
              <div className="flex ">
                <div className="w-1/3">
                  {carsList && carsList.map((car) => (
                    <div key={car.id} className="md:w-1/2 lg:w-1/3 flex  items-center mb-3" onClick={() => setSelectedCar(car)}>

                      <img src={car.imageUrl} alt={car.carName} className="w-24 h-24 h-auto object-cover" />
                      <div className="text-center mb-2 pl-2"><span>{car.carName}</span><br />
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${car.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {car.status}
                      </span>
                      </div>


                    </div>
                  ))}
                </div>
                <div className="boredr-l-2 border-black w-2/3">
                  <div className="w-[100%]">
                    {selectedCar &&
                      <>
                        <div className="p-5 flex flex-col gap-3">
                          <div className="flex justify-between">
                            <div>
                              <h1 className="text-2xl font-semibold">{selectedCar.carName}</h1>
                              <div className="flex text-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path></svg>
                                <span className="text-sm">{selectedCar.rating}</span>
                              </div>
                            </div>
                            <div className="flex">
                              <span>$</span>
                              <div className="flex flex-col">
                                <span className="text-3xl font-bold">{selectedCar.pph}</span>
                                <span>Per Hour</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex w-[50%] gap-[10%] text-gray-600">
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
                              <span>{selectedCar.passengers}</span>
                            </div>
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M15 3C15.5523 3 16 3.44772 16 4V6H21C21.5523 6 22 6.44772 22 7V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7C2 6.44772 2.44772 6 3 6H8V4C8 3.44772 8.44772 3 9 3H15ZM16 8H8V19H16V8ZM4 8V19H6V8H4ZM14 5H10V6H14V5ZM18 8V19H20V8H18Z"></path></svg>
                              <span>{selectedCar.luggage}</span>
                            </div>
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21 18V21H19V18H17V15H23V18H21ZM5 18V21H3V18H1V15H7V18H5ZM11 6V3H13V6H15V9H9V6H11ZM11 11H13V21H11V11ZM3 13V3H5V13H3ZM19 13V3H21V13H19Z"></path></svg>
                              <span>{selectedCar.gear}</span>
                            </div>
                          </div>
                        </div>
                        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                          <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Insurance Details</div>
                            <p className="block mt-1 text-lg leading-tight font-medium text-black">Policy Number: {selectedCar.policyNumber}</p>
                            <p className="mt-2 text-gray-500">Company: {selectedCar.insuranceCompany}</p>
                            <p className="mt-2 text-gray-500">Policy Start Date: {selectedCar.policyStartDate}</p>
                            <p className="mt-2 text-gray-500">Policy End Date: {selectedCar.policyEndDate}</p>
                            <p className="mt-2 text-gray-500">Coverage Limits: {selectedCar.coverageLimits}</p>
                            {selectedCar.insuranceImageUrl && (
                              <div className="mt-4">
                                <img className="w-full h-auto" src={selectedCar.insuranceImageUrl} alt="Insurance Certificate" />
                              </div>
                            )}
                            {selectedCar && selectedCar.status === "Pending" &&
                              <div><button className="bg-green-300  mx-auto p-2 rounded-md mt-5" onClick={() => { updateCarStatus("Approved") }}>Approve</button> <button className="bg-red-300  mx-auto p-2 rounded-md mt-5" onClick={() => updateCarStatus("Rejected")}>Reject</button></div>
                            }
                          </div>
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Customers' && (
          <div className="bg-white shadow-lg rounded-md p-4 w-full mt-5">
            <h3 className="text-lg font-semibold text-gray-700 pb-2 border-b mb-3">License Details</h3>
            {selectedLicense && <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 w-full">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">License Details</div>
                <p className="text-gray-700 text-base">
                  <strong>Full Name:</strong> {selectedLicense.fullName}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>License Number:</strong> {selectedLicense.licenseNumber}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Date of Birth:</strong> {selectedLicense.dateOfBirth}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>State/Country of Issue:</strong> {selectedLicense.stateOfIssue}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Address:</strong> {selectedLicense.address}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>License Class:</strong> {selectedLicense.licenseClass}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {selectedLicense.imageUrl && (
                  <img
                    src={selectedLicense.imageUrl}
                    alt="License"
                    className="w-full h-auto"
                  />
                )}
              </div>
            </div>}
            {selectedDriver && selectedDriver.status === "Pending" &&
              <div><button className="bg-green-300  mx-auto p-2 rounded-md mt-5" onClick={() => { updateUserStatus("Approved") }}>Approve</button> <button className="bg-red-300  mx-auto p-2 rounded-md mt-5" onClick={() => updateUserStatus("Rejected")}>Reject</button></div>
            }
          </div>
        )}
        

      </div>
    </div>
  );
}

export default Admin;