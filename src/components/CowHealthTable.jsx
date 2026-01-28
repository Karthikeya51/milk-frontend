import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CowHealthTable({ entries = [], onEdit, onRefresh }) {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [bulkConfirm, setBulkConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  /* ---------- helpers ---------- */
  const autoClear = () => setTimeout(() => setMessage(""), 2500);

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSelectAll = (checked) =>
    setSelected(checked ? entries.map((e) => e.id) : []);

  /* ---------- single delete ---------- */
  const deleteEntry = async (id) => {
    try {
      await api.delete(`/cow-health/${id}`);
      setMessageType("success");
      setMessage("🗑️ Entry deleted");
      setConfirmId(null);
      onRefresh?.();
    } catch {
      setMessageType("danger");
      setMessage("❌ Delete failed");
    }
    autoClear();
  };

  /* ---------- bulk delete ---------- */
  const bulkDelete = async () => {
    try {
      await api.post("/cow-health/bulk-delete", selected);
      setMessageType("success");
      setMessage(`🗑️ ${selected.length} entries deleted`);
      setSelected([]);
      setBulkConfirm(false);
      onRefresh?.();
    } catch {
      setMessageType("danger");
      setMessage("❌ Bulk delete failed");
    }
    autoClear();
  };

  const groupedByDate = entries.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});
  


  return (
    <div className="table-responsive mt-3">
      {/* Floating alert */}
      {message && (
        <div
          className={`alert alert-${messageType} position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-2`}
          style={{ zIndex: 1050, borderRadius: 20 }}
        >
          {message}
        </div>
      )}

      {/* Selection warning */}
      {selected.length > 0 && (
        <div className="alert alert-warning text-center">
          ⚠️ {selected.length} selected
        </div>
      )}

      <table className="table table-bordered table-striped table-sm align-middle">
        <thead className="table-dark">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={entries.length > 0 && selected.length === entries.length}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </th>
            <th>Date</th>
            <th>Shift</th>
            <th>Cow</th>
            <th>Temp (°C)</th>
            <th>Milk (L)</th>
            <th>Medicine</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center text-muted">
                No records found
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

                    {/* Date column unchanged */}
                    <td>{e.date}</td>
                    <td>{e.shift}</td>
                    <td>{e.cow_name}</td>

                    <td
                      className={
                        e.cow_temperature > 39 ? "text-danger fw-bold" : ""
                      }
                    >
                      {e.cow_temperature}°
                    </td>

                    <td>{e.milk_given}</td>

                    <td>{e.medicine_given ? "💊 Yes" : "❌ No"}</td>

                    <td style={{ maxWidth: 200, whiteSpace: "pre-wrap" }}>
                      {e.note || "-"}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-warning me-1"
                        onClick={() => {
                          onEdit(e);                 // ✅ set edit data
                          navigate("/cow-health");  // ✅ go to form
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


      </table>

      {/* Bulk delete */}
      {selected.length > 0 && (
        <div className="text-center mt-3">
          {!bulkConfirm ? (
            <button
              className="btn btn-danger"
              onClick={() => setBulkConfirm(true)}
            >
              Delete Selected ({selected.length})
            </button>
          ) : (
            <div className="d-flex justify-content-center gap-2 flex-wrap">
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
  );
}
