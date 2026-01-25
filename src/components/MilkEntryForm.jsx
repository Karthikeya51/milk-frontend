
import { useEffect, useState } from "react";
import api from "../services/api";

const initialState = {
  id: null,
  date: "",
  shift: "morning",
  qty: "",
  fat: "",
  snf: "",
  clr: "",
  rate_per_litre: "",
  note: ""
};

export default function MilkEntryForm({ editData, setEditData }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  // Load edit data
  useEffect(() => {
    if (editData) {
      setForm({
        id: editData.id,
        date: editData.date,
        shift: editData.shift,
        qty: editData.qty,
        fat: editData.fat,
        snf: editData.snf,
        clr: editData.clr,
        rate_per_litre: editData.rate_per_litre,
        note: editData.note || ""
      });
    }
  }, [editData]);

  const amount =
    form.qty && form.rate_per_litre
      ? (form.qty * form.rate_per_litre).toFixed(2)
      : "0.00";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(initialState);
    setEditData(null);
  };

  const submitForm = async () => {
    setLoading(true);
    setMessage("");
  
    const payload = {
      date: form.date,
      shift: form.shift,
      qty: parseFloat(form.qty),
      fat: parseFloat(form.fat),
      snf: parseFloat(form.snf),
      clr: parseFloat(form.clr),
      rate_per_litre: parseFloat(form.rate_per_litre),
      note: form.note
    };
  
    try {
      if (form.id) {
        await api.put(`/milk-entry/${form.id}`, payload);
        setMessage("✅ Entry updated successfully");
      } else {
        await api.post("/milk-entry", payload);
        setMessage("✅ Entry saved successfully");
      }
  
      resetForm();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save entry");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 2500);
    }
  };
  

  return (
    <div className="container mt-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3 text-center">
            {form.id ? "Edit Milk Entry" : "Add Milk Entry"}
          </h5>

          {/* ✅ FORM START */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            {/* 👇 ADD MESSAGE HERE */}
              {message && (<div
                  className={`alert text-center mb-3 ${
                    message.startsWith("❌") ? "alert-danger" : "alert-success"
                  }`}
                >

                  {message}
                </div>
              )}
            {/* Date */}
            <input
              type="date"
              name="date"
              className="form-control mb-2"
              value={form.date}
              onChange={handleChange}
              required
            />

            {/* Shift */}
            <div className="mb-2 d-flex justify-content-around">
              <label>
                <input
                  type="radio"
                  name="shift"
                  value="morning"
                  checked={form.shift === "morning"}
                  onChange={handleChange}
                  required
                />{" "}
                Morning
              </label>

              <label>
                <input
                  type="radio"
                  name="shift"
                  value="evening"
                  checked={form.shift === "evening"}
                  onChange={handleChange}
                />{" "}
                Evening
              </label>
            </div>

            {/* Numeric Inputs */}
            {[
              { name: "qty", label: "Quantity (litres)" },
              { name: "fat", label: "Fat" },
              { name: "snf", label: "SNF" },
              { name: "clr", label: "CLR" },
              { name: "rate_per_litre", label: "Rate per litre" }
            ].map((f) => (
              <input
                key={f.name}
                type="number"
                inputMode="decimal"
                name={f.name}
                placeholder={f.label}
                className="form-control mb-2"
                value={form[f.name]}
                onChange={handleChange}
                required
              />
            ))}

            {/* Amount */}
            <input
              className="form-control mb-3"
              disabled
              value={`Amount: ₹${amount}`}
            />

            {/* Notes (Optional) */}
            <textarea
              name="note"
              className="form-control mb-3"
              rows="3"
              placeholder="Notes / Remarks (optional)"
              value={form.note}
              onChange={handleChange}
            />

            {/* Actions */}
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : form.id
                  ? "Update Entry"
                  : "Save Entry"}
              </button>

              {form.id && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
          {/* ✅ FORM END */}
        </div>
      </div>
    </div>
  );
}
