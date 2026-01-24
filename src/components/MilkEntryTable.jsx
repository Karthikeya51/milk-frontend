
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MilkEntryTable({ onEdit }) {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const res = await api.get("/milk-entry");
    setEntries(res.data);
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await api.delete(`/milk-entry/${id}`);
    fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Milk Reports</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm">
          <thead className="table-dark">
            <tr>
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
                <td colSpan="9" className="text-center">
                  No entries found
                </td>
              </tr>
            ) : (
              entries.map((e) => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{e.shift}</td>
                  <td>{e.qty}</td>
                  <td>{e.fat}</td>
                  <td>{e.snf}</td>
                  <td>{e.clr}</td>
                  <td>{e.rate_per_litre}</td>
                  <td>₹{e.amount}</td>
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

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteEntry(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
