import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const DisputeForm = ({ data, user, toggle }) => {
  const [issue, setIssue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { cid, oid, id: bid } = data;
    const raisedBy = user.uid;

    try {
      await addDoc(collection(firestore, "disputes"), {
        uid: cid,
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
        <h2 className="text-xl font-semibold mb-2">Submit a Dispute</h2>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="p-2 border rounded"
          placeholder="Describe the issue"
          rows="6"
          required
        />
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Submit
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default DisputeForm;
