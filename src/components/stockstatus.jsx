
const stockLevels = [
  { label: "In stock", count: 128, tone: "in-stock" },
  { label: "Low stock", count: 24, tone: "low-stock" },
  { label: "Out of stock", count: 8, tone: "out-of-stock" },
];

function StockStatus() {
  const total = stockLevels.reduce(
    (sum, level) => sum + level.count,
    0
  );

  return (
    <section className="stock-status-card">
      <div className="stock-status-heading">
        <div>
          <h1>Stock status</h1>
          <p>Inventory levels across your products</p>
        </div>

        <span className="stock-total">{total} products</span>
      </div>

      <div className="stock-status-list">
        {stockLevels.map((level) => {
          const percentage = Math.round(
            (level.count / total) * 100
          );

          return (
            <div className="stock-status-row" key={level.tone}>
              <div className="stock-status-labels">
                <span className="stock-status-label">
                  <span className={`stock-dot ${level.tone}`} />
                  {level.label}
                </span>

                <span className="stock-status-count">
                  {level.count} ({percentage}%)
                </span>
              </div>

              <div className="stock-bar-track">
                <span
                  className={`stock-bar-fill ${level.tone}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StockStatus;
