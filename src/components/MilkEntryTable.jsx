import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MilkEntryTable({ entries = [], onEdit, onRefresh }) {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [confirmId, setConfirmId] = useState(null);
  const [bulkConfirm, setBulkConfirm] = useState(false);

  /* ================= HELPERS ================= */
  const autoClearMessage = () => {
    setTimeout(() => setMessage(""), 2500);
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (checked) => {
    setSelected(checked ? entries.map((e) => e.id) : []);
  };

  /* ================= DELETE ================= */
  const deleteEntry = async (id) => {
    try {
      await api.delete(`/milk-entry/${id}`);
      setMessageType("success");
      setMessage("🗑️ Entry deleted successfully");
      setConfirmId(null);
      onRefresh?.();
    } catch {
      setMessageType("danger");
      setMessage("❌ Failed to delete entry");
    }
    autoClearMessage();
  };

  const bulkDelete = async () => {
    try {
      await Promise.all(selected.map((id) => api.delete(`/milk-entry/${id}`)));
      setMessageType("success");
      setMessage(`🗑️ ${selected.length} entries deleted`);
      setSelected([]);
      setBulkConfirm(false);
      onRefresh?.();
    } catch {
      setMessageType("danger");
      setMessage("❌ Bulk delete failed");
    }
    autoClearMessage();
  };

  const groupedByDate = entries.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});
  

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Milk Reports</h4>

      {/* FLOATING ALERT */}
      {message && (
        <div
          className={`alert alert-${messageType} position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-2`}
          style={{ zIndex: 1050, borderRadius: 20 }}
        >
          {message}
        </div>
      )}

      {selected.length > 0 && (
        <div className="alert alert-warning text-center">
          ⚠️ {selected.length} entries selected
        </div>
      )}

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm align-middle">
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
      <td colSpan="11" className="text-center text-muted">
        No entries found
      </td>
    </tr>
  ) : (
    Object.entries(
      entries.reduce((acc, curr) => {
        acc[curr.date] = acc[curr.date] || [];
        acc[curr.date].push(curr);
        return acc;
      }, {})
    )
      // ✅ latest date first
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .map(([date, rows]) =>
        rows.map((e) => (
          <tr key={e.id}>
            <td>
              <input
                type="checkbox"
                checked={selected.includes(e.id)}
                onChange={() => toggleSelect(e.id)}
              />
            </td>

            {/* date column stays SAME */}
            <td>{e.date}</td>
            <td>{e.shift}</td>
            <td>{e.qty}</td>
            <td>{e.fat}</td>
            <td>{e.snf}</td>
            <td>{e.clr}</td>
            <td>{e.rate_per_litre}</td>
            <td>₹{Number(e.amount).toFixed(2)}</td>
            <td style={{ maxWidth: 200, whiteSpace: "pre-wrap" }}>
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
      )
  )}
</tbody>


          {/* <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center text-muted">
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
                  <td style={{ maxWidth: 200, whiteSpace: "pre-wrap" }}>
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
          </tbody> */}
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
                <button className="btn btn-danger" onClick={bulkDelete}>
                  Confirm Delete
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
