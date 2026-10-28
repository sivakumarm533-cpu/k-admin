
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest, getApiOrigin } from "../lib/api";
import "./EditProduct.css";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    unit: "kg",
    currentQty: "",
    targetQty: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;

    const fetchProduct = async () => {
      try {
        const result = await apiRequest(`/products/${id}`);
        const product = result.product;

        setFormData({
          name: product.name || "",
          category: product.category || "",
          price: product.price ?? "",
          unit: product.unit || "kg",
          currentQty: product.currentQty ?? "",
          targetQty: product.targetQty ?? "",
        });

        if (product.image) {
          setPreview(
            product.image.startsWith("http")
              ? product.image
              : `${getApiOrigin()}${product.image}`
          );
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id, isEditing]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG, WebP, or GIF image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) {
        data.append("image", image);
      }

      await apiRequest(isEditing ? `/products/${id}` : "/products", {
        method: isEditing ? "PUT" : "POST",
        body: data,
      });

      navigate("/products");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-page">
      <div className="product-form-card">
        <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>
        <p className="form-description">
          Enter product details and upload an image.
        </p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="unit">Unit</label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="pcs">Pieces (pcs)</option>
                <option value="ton">Ton</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="currentQty">Current Quantity</label>
              <input
                id="currentQty"
                name="currentQty"
                type="number"
                min="0"
                step="0.01"
                value={formData.currentQty}
                onChange={handleChange}
                placeholder="Current stock"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="targetQty">Target Quantity</label>
              <input
                id="targetQty"
                name="targetQty"
                type="number"
                min="0"
                step="0.01"
                value={formData.targetQty}
                onChange={handleChange}
                placeholder="Target stock"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              id="image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
            />
            <small>JPG, PNG, WebP, or GIF — maximum 5 MB.</small>
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Product preview" />
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : isEditing
                  ? "Update Product"
                  : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
