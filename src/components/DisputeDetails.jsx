import { useEffect, useState } from 'react';
import { fetchDisputeDetails } from './disputeService';

const DisputeDetails = ({ bid, user }) => {
  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disputeList = await fetchDisputeDetails(bid);
        setDisputes(disputeList);
      } catch (error) {
        console.error('Error fetching dispute details:', error);
        setDisputes([]);
      }
    };
    fetchData();
  }, [bid]);

  return (
    <div className="border-t-2 border-gray-300 p-4">
      <h2 className="font-bold text-lg">Dispute Details</h2>
      {disputes.length === 0 ? (
        <p>No disputes found for this booking.</p>
      ) : (
        disputes.map((dispute) => (
          <div className="border-b-2 border-gray-400" key={dispute.id}>
            <p><strong>Issue:</strong> {dispute.issue}</p>
            <p><strong>Status:</strong> {dispute.status}</p>
            <p><strong>Raised By:</strong> {getRaisedBy(dispute, user)}</p>
            <p><strong>Admin Response:</strong> {dispute.adminResponse || "Awaiting response"}</p>
          </div>
        ))
      )}
    </div>
  );
};

const getRaisedBy = (dispute, user) => {
  if (user.uid === dispute.raisedBy) {
    return "You";
  } else if (user.role === 2) {
    return "Owner";
  } else {
    return "Customer";
  }
};

export default DisputeDetails;
