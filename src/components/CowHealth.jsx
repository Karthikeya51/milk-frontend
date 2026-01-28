import { useEffect, useState } from "react";
import api from "../services/api";

const initialState = {
  id: null,
  date: "",
  shift: "morning",
  cow_name: "",
  cow_temperature: "",
  milk_given: "",
  medicine_given: "",
  note: ""
};

export default function CowHealthForm({ editData, setEditData }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  /* ================= LOAD EDIT DATA ================= */
  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        cow_temperature: String(editData.cow_temperature),
        milk_given: String(editData.milk_given)
      });
    }
  }, [editData]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(initialState);
    setEditData?.(null);
  };

  /* ================= SUBMIT ================= */
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      date: form.date,
      shift: form.shift,
      cow_name: form.cow_name,
      cow_temperature: parseFloat(form.cow_temperature),
      milk_given: parseFloat(form.milk_given),
      medicine_given: form.medicine_given,
      note: form.note
    };

    try {
      if (form.id) {
        // UPDATE
        await api.put(`/cow-health/${form.id}`, payload);
        setMessageType("success");
        setMessage("✅ Cow health entry updated");
      } else {
        // CREATE
        await api.post("/cow-health", payload);
        setMessageType("success");
        setMessage("✅ Cow health entry saved");
      }

      // ⏳ SAME DELAY AS MILK ENTRY
      setTimeout(() => {
        resetForm();
        setMessage("");
      }, 2000);

    } catch (err) {
      console.error(err);
      setMessageType("danger");
      setMessage("❌ Failed to save cow health entry");
      setTimeout(() => setMessage(""), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="text-center mb-3">
            🐄 {form.id ? "Edit Cow Health Entry" : "Cow Health Entry"}
          </h5>

          {/* MESSAGE */}
          {message && (
            <div className={`alert alert-${messageType} text-center`}>
              {message}
            </div>
          )}

          <form onSubmit={submitForm}>
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
                /> Morning
              </label>

              <label>
                <input
                  type="radio"
                  name="shift"
                  value="evening"
                  checked={form.shift === "evening"}
                  onChange={handleChange}
                /> Evening
              </label>
            </div>

            {/* Cow Name */}
            <input
              type="text"
              name="cow_name"
              className="form-control mb-2"
              placeholder="Cow Name"
              value={form.cow_name}
              onChange={handleChange}
              required
            />

            {/* Temperature */}
            <input
              type="number"
              step="0.1"
              name="cow_temperature"
              className="form-control mb-2"
              placeholder="Cow Temperature (°C)"
              value={form.cow_temperature}
              onChange={handleChange}
              required
            />

            {/* Milk Given */}
            <input
              type="number"
              step="0.1"
              name="milk_given"
              className="form-control mb-2"
              placeholder="Milk Given (litres)"
              value={form.milk_given}
              onChange={handleChange}
              required
            />

            {/* Medicine */}
            <div className="mb-2 d-flex justify-content-around">
              <label>
                <input
                  type="radio"
                  name="medicine_given"
                  value="yes"
                  checked={form.medicine_given === "yes"}
                  onChange={handleChange}
                  required
                /> Medicine Given
              </label>

              <label>
                <input
                  type="radio"
                  name="medicine_given"
                  value="no"
                  checked={form.medicine_given === "no"}
                  onChange={handleChange}
                /> No Medicine
              </label>
            </div>

            {/* Note (optional) */}
            <textarea
              name="note"
              rows="3"
              className="form-control mb-3"
              placeholder="Medicine note (optional)"
              value={form.note}
              onChange={handleChange}
            />

            {/* ACTIONS */}
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary"
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
        </div>
      </div>
    </div>
  );
}
