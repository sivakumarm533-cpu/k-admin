const stockLevels = [
  { label: 'In stock', count: 128, total: 160, tone: 'in-stock' },
  { label: 'Low stock', count: 24, total: 160, tone: 'low-stock' },
  { label: 'Out of stock', count: 8, total: 160, tone: 'out-of-stock' },
]

function StockStatus() {
  return (
    <section aria-labelledby="stock-status-title" className="stock-status-card" id="stock-status">
      <div className="stock-status-heading">
        <div>
          <h2 id="stock-status-title">Stock status</h2>
          <p>Inventory levels across your products</p>
        </div>
        <span className="stock-total">160 products</span>
      </div>

      <div className="stock-status-list">
        {stockLevels.map((level) => {
          const percentage = Math.round((level.count / level.total) * 100)

          return (
            <div className="stock-status-row" key={level.tone}>
              <div className="stock-status-labels">
                <span className="stock-status-label">
                  <span aria-hidden="true" className={`stock-dot ${level.tone}`} />
                  {level.label}
                </span>
                <span className="stock-status-count">{level.count} <span>({percentage}%)</span></span>
              </div>
              <div
                aria-label={`${level.label}: ${level.count} of ${level.total} products`}
                className="stock-bar-track"
                role="img"
              >
                <span
                  className={`stock-bar-fill ${level.tone}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default StockStatus
