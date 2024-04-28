import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const DisputeForm = ({ data, user, toggle }) => {
  const [issue, setIssue] = useState('');
  const [isImportant, setIsImportant] = useState(false);

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
        raisedBy,
        isImportant // Include isImportant in the document
      });
      alert('Dispute submitted successfully!');
      setIssue('');
      setIsImportant(false); // Reset isImportant state
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
          <span>Mark as Important</span>
        </label>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Submit
          </button>
          <button type="button" onClick={() => toggle(false)} className="ml-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DisputeForm;
