import { useEffect, useState } from 'react'
import { apiRequest, getApiOrigin } from '../lib/api'

function StockStatus() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    apiRequest('/products')
      .then((result) => setProducts(result.products))
      .catch((loadError) => setError(loadError.message))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className="stock-status-page">
      <div className="stock-page-heading">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Stock Status</h1>
          <p className="page-description">Track current stock quantities against target levels.</p>
        </div>
      </div>

      {isLoading && <p>Loading stock data...</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {!isLoading && !error && products.length === 0 && (
        <div className="dashboard-card"><p>No product stock data is available yet.</p></div>
      )}

      <div className="stock-items-list">
        {products.map((product) => {
          const percentage = product.targetQty > 0
            ? Math.round((product.currentQty / product.targetQty) * 100)
            : 0
          const barWidth = Math.min(percentage, 100)
          const status = percentage >= 100 ? 'Target reached' : percentage < 30 ? 'Low stock' : 'In stock'
          const tone = percentage >= 100 ? 'complete' : percentage < 30 ? 'low' : 'normal'

          return (
            <article className="stock-item-card" key={product._id}>
              <div className="stock-item-image">
                {product.image ? (
                  <img src={`${getApiOrigin()}${product.image}`} alt={product.name} />
                ) : (
                  <span aria-hidden="true">No image</span>
                )}
              </div>
              <div className="stock-item-content">
                <div className="stock-item-top">
                  <div className="stock-item-name">
                    <h2>{product.name}</h2>
                    <p>{product.category}</p>
                  </div>
                  <div className="stock-item-quantity">
                    <strong>{product.currentQty} {product.unit}</strong>
                    <span>Target: {product.targetQty} {product.unit}</span>
                  </div>
                </div>
                <div className="stock-progress-track">
                  <div className={`stock-progress-fill stock-${tone}`} style={{ width: `${barWidth}%` }} />
                </div>
                <div className="stock-progress-footer">
                  <span>{percentage}% of target</span>
                  <span className={`stock-status-badge badge-${tone}`}>{status}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default StockStatus
