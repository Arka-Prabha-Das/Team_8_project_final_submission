/* eslint-disable react/prop-types */
/*
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const DisputeDetails = ({ bid , user }) => {
  const [dispute, setDispute] = useState(null);

  const fetchDisputeDetails = async () => {
    const q = query(collection(firestore, "disputes"), where("bid", "==", bid));
    const querySnapshot = await getDocs(q);
    const disputes = [];
    querySnapshot.forEach((doc) => {
      disputes.push(doc.data());
    });
    // Assuming there's only one dispute per booking for simplicity
    setDispute(disputes[0]);
  };

  useEffect(() => {
    fetchDisputeDetails();
  }, [bid]);

  if (!dispute) {
    return <p>No disputes found for this booking.</p>;
  }

  return (
    <div className="border-t-2 border-gray-300 p-4">
      <h2 className="font-bold text-lg">Dispute Details</h2>
      <p><strong>Issue:</strong> {dispute.issue}</p>
      <p><strong>Status:</strong> {dispute.status}</p>
      <p><strong>Raised By:</strong> {user.uid === dispute.raisedBy ? "You" : (user.role === 2 ? "Customer" : "Owner" )}</p>
      <p><strong>Admin Response:</strong> {dispute.adminResponse || "Awaiting response"}</p>
    </div>
  );
};

export default DisputeDetails;*/

/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const DisputeDetails = ({ bid , user }) => {
  const [disputes, setDisputes] = useState(null);

  const fetchDisputeDetails = async () => {
    const q = query(collection(firestore, "disputes"), where("bid", "==", bid));
    const querySnapshot = await getDocs(q);
    const disputeList = [];
    querySnapshot.forEach((doc) => {
      disputeList.push(doc.data());
    });
    // Assuming there's only one dispute per booking for simplicity
    setDisputes(disputeList);
    console.log(disputeList)
    console.log(user);

  };

  useEffect(() => {
    fetchDisputeDetails();
  }, [bid]);

  if (!disputes) {
    return <p>No disputes found for this booking.</p>;
  }

  return (
    <div className="border-t-2 border-gray-300 p-4">
      <h2 className="font-bold text-lg">Dispute Details</h2>
      {disputes.map((dispute) => (
      <div className="border-b-2 border-gray-400" key={dispute.id}> {/* Ensure each child in a list has a unique "key" prop. */}
        <p><strong>Issue:</strong> {dispute.issue}</p>
        <p><strong>Status:</strong> {dispute.status}</p>
        <p><strong>Raised By:</strong> {user.uid === dispute.raisedBy ? "You" : (user.role === 2 ? "Owner" : "Customer")}</p>
        <p><strong>Admin Response:</strong> {dispute.adminResponse || "Awaiting response"}</p>
      </div>
    ))}
    </div>
  );
};

export default DisputeDetails;

