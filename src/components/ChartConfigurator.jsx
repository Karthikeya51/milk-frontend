export default function ChartConfigurator({
    xAxis,
    setXAxis,
    yAxes,
    setYAxes,
    colors,
    setColors
  }) {
    const allParams = ["qty", "amount", "fat", "snf", "clr", "rate_per_litre"];
  
    const toggleYAxis = (param) => {
      setYAxes(prev =>
        prev.includes(param)
          ? prev.filter(p => p !== param)
          : [...prev, param]
      );
    };
  
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h6 className="card-title">Chart Builder</h6>
  
          {/* X AXIS */}
          <label className="form-label">X Axis</label>
          <select
            className="form-select mb-3"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
          >
            <option value="">Select X Axis</option>
            <option value="date">Date</option>
            <option value="shift">Shift</option>
          </select>
  
          {/* Y AXIS */}
          <label className="form-label">Y Axis Parameters</label>
  
          {allParams.map(p => (
            <div key={p} className="d-flex align-items-center mb-2">
              <input
                type="checkbox"
                checked={yAxes.includes(p)}
                onChange={() => toggleYAxis(p)}
                className="form-check-input me-2"
              />
  
              <span className="me-2">{p.toUpperCase()}</span>
  
              {yAxes.includes(p) && (
                <input
                  type="color"
                  value={colors[p]}
                  onChange={(e) =>
                    setColors({ ...colors, [p]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  