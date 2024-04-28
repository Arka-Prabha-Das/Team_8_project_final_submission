// DisputeDetails.js
import { useEffect, useState } from 'react';
import { fetchDisputeDetails } from './disputeService';

const DisputeDetails = ({ bid , user }) => {
  const [disputes, setDisputes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const disputeList = await fetchDisputeDetails(bid);
      setDisputes(disputeList);
    };
    fetchData();
  }, [bid]);

  if (!disputes) {
    return <p>No disputes found for this booking.</p>;
  }

  return (
    <div className="border-t-2 border-gray-300 p-4">
      <h2 className="font-bold text-lg">Dispute Details</h2>
      {disputes.map((dispute) => (
        <div className="border-b-2 border-gray-400" key={dispute.id}>
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
