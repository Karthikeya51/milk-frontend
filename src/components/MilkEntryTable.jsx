import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MilkEntryTable({ onEdit }) {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [bulkConfirm, setBulkConfirm] = useState(false);

  const [messageType, setMessageType] = useState("success"); // success | danger


  // ---------------- FETCH ----------------
  const fetchEntries = async () => {
    const res = await api.get("/milk-entry");
    setEntries(res.data);
    setSelected([]);
  };

  // ---------------- SINGLE DELETE ----------------
    const deleteEntry = async (id) => {
      try {
        await api.delete(`/milk-entry/${id}`);
        setMessageType("success");
        setMessage("🗑️ Entry deleted successfully");
        setConfirmId(null);
        fetchEntries();
      } catch (err) {
        console.error(err);
        setMessageType("danger");
        setMessage("❌ Failed to delete entry");
      }
    
      setTimeout(() => setMessage(""), 2500);
    };
  

  // ---------------- BULK DELETE ----------------
  const bulkDelete = async () => {
    try {
      await Promise.all(
        selected.map((id) => api.delete(`/milk-entry/${id}`))
      );
  
      setMessageType("success");
      setMessage(`🗑️ ${selected.length} entries deleted successfully`);
      setSelected([]);
      setBulkConfirm(false);
      fetchEntries();
    } catch (err) {
      console.error(err);
      setMessageType("danger");
      setMessage("❌ Bulk delete failed");
    }
  
    setTimeout(() => setMessage(""), 2500);
  };
  
  
  // ---------------- SELECTION ----------------
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (checked) => {
    setSelected(checked ? entries.map((e) => e.id) : []);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Milk Reports</h4>

      {/* MESSAGE */}
      {message && (
        <div
          className={`alert alert-${messageType} position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-2`}
          style={{
            zIndex: 1050,
            borderRadius: "20px",
            minWidth: "260px",
            textAlign: "center"
          }}
        >
          {message}
        </div>
      )}

      {selected.length > 0 && (
        <div className="alert alert-warning text-center">
          ⚠️ {selected.length} entries selected. This action cannot be undone.
        </div>
      )}




      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm">
          <thead className="table-dark">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    entries.length > 0 && selected.length === entries.length
                  }
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>
              <th>Date</th>
              <th>Shift</th>
              <th>Qty</th>
              <th>Fat</th>
              <th>SNF</th>
              <th>CLR</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No entries found
                </td>
              </tr>
            ) : (
              entries.map((e) => (
                <tr key={e.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(e.id)}
                      onChange={() => toggleSelect(e.id)}
                    />
                  </td>
                  <td>{e.date}</td>
                  <td>{e.shift}</td>
                  <td>{e.qty}</td>
                  <td>{e.fat}</td>
                  <td>{e.snf}</td>
                  <td>{e.clr}</td>
                  <td>{e.rate_per_litre}</td>
                  <td>₹{Number(e.amount).toFixed(2)}</td>
                  <td style={{ maxWidth: "200px", whiteSpace: "pre-wrap" }}>
                    {e.note || "-"}
                  </td>
                  <td>
                      <button
                        className="btn btn-sm btn-warning me-1"
                        onClick={() => {
                          onEdit(e);
                          navigate("/");
                        }}
                      >
                        Edit
                      </button>

                      {confirmId === e.id ? (
                        <>
                          <button
                            className="btn btn-sm btn-danger me-1"
                            onClick={() => deleteEntry(e.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => setConfirmId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setConfirmId(e.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>

                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* BULK DELETE */}
        {selected.length > 0 && (
            <div className="mt-3 text-center">
              {!bulkConfirm ? (
                <button
                  className="btn btn-danger"
                  onClick={() => setBulkConfirm(true)}
                >
                  Delete Selected ({selected.length})
                </button>
              ) : (
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-danger"
                    onClick={bulkDelete}
                  >
                    Confirm Delete ({selected.length})
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setBulkConfirm(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

      </div>
    </div>
  );
}
