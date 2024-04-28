/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";


const DisputeForm = ({data, user, toggle}) => {
  const [issue, setIssue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uid = data.cid;
    const oid = data.oid;
    const bid = data.id;
    const raisedBy = user.uid;

    try {
      await await addDoc(collection(firestore, "disputes"), {
        uid,
        oid,
        bid,
        issue,
        status: 'pending',
        raisedBy
      });
      alert('Dispute submitted successfully!');
      setIssue('');
      toggle(false);
    } catch (error) {
      alert('Error submitting dispute: ', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="p-2 border rounded"
          placeholder="Describe the issue"
          rows="4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Submit Dispute
        </button>
      </form>
    </div>
  );
};

export default DisputeForm;