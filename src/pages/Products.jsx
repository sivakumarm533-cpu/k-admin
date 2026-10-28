import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest, getApiOrigin } from '../lib/api'
import useAuth from '../context/useAuth'

function Products() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    let isMounted = true

    apiRequest('/products')
      .then((result) => {
        if (isMounted) setProducts(result.products)
      })
      .catch((loadError) => {
        if (isMounted) setError(loadError.message)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function deleteProduct(productId) {
    if (!window.confirm('Delete this product?')) return

    try {
      await apiRequest(`/products/${productId}`, { method: 'DELETE' })
      setProducts((currentProducts) => currentProducts.filter((product) => product._id !== productId))
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  return (
    <section className="dashboard-page" aria-labelledby="products-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1 id="products-title">Products</h1>
          <p className="page-description">Products stored in the database.</p>
        </div>
        {isAdmin && <Link className="button-link" to="/products/new">Add product</Link>}
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      {isLoading ? <p>Loading products...</p> : null}
      {!isLoading && !error && products.length === 0 ? (
        <div className="dashboard-card"><p>No products have been added yet.</p></div>
      ) : null}

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product._id}>
            {product.image ? (
              <img alt={product.name} className="product-card-image" src={`${getApiOrigin()}${product.image}`} />
            ) : (
              <div aria-hidden="true" className="product-card-placeholder">No image</div>
            )}
            <div className="product-card-details">
              <h2>{product.name}</h2>
              <p>{product.category} · ₹{Number(product.price).toFixed(2)} / {product.unit}</p>
              <p>Stock: {product.currentQty} / {product.targetQty}</p>
              {isAdmin && (
                <div className="product-card-actions">
                  <Link className="button-link button-link-secondary" to={`/products/${product._id}/edit`}>Edit</Link>
                  <button className="delete-button" onClick={() => deleteProduct(product._id)} type="button">Delete</button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Products
