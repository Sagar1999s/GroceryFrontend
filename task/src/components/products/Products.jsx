import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', price: '', sellerName: '', image: null });
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://15.207.99.18:8000/groceryapp/get-products/');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    // Set form values with the product details
    setFormValues({
      productId: product.id,
      name: product.name,
      price: product.price,
      sellerName: product.seller_name,
    });
  
    // Set the selected product to edit (including the product ID)
    setSelectedProduct(product); 
    
    // Open the modal for editing
    handleOpenModal();
  };
  
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('price', formValues.price);
    formData.append('seller_name', formValues.sellerName);
  
    // Get product ID from selectedProduct
    const productId = formValues.productId;
    console.log(productId)
  
    try {
      const response = await fetch(`http://15.207.99.18:8000/groceryapp/edit-product/${productId}/`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Product edited successfully:', data);
      handleCloseModal();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };
  

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    const confirmation = window.confirm("Are you sure you want to delete this product?");
    if (confirmation) {
      try {
        const response = await fetch(`http://15.207.99.18:8000/groceryapp/delete-product/${productId}/`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        // Remove deleted product from the list
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };


  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await fetch('http://15.207.99.18:8000/groceryapp/get-cart-products/');
        if (!response.ok) {
          throw new Error('Failed to fetch cart products');
        }
        const data = await response.json();
        setCartProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const payload = { product_id: product.id };

    try {
      const response = await fetch('http://15.207.99.18:8000/groceryapp/add-to-cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const data = await response.json();
      console.log('Product added to cart:', data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormValues({ name: '', price: '', sellerName: '', image: null });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormValues((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('price', formValues.price);
    formData.append('seller_name', formValues.sellerName);
    if (formValues.image) {
      formData.append('image', formValues.image);
    }

    try {
      const response = await fetch('http://15.207.99.18:8000/groceryapp/create-product/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Product created successfully:', data);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="products-container">
      <Navigation />
      <div className="products-content">
        <h2>Product</h2>
        
        <button className="add-product-button" onClick={handleOpenModal}>
          Add Product
        </button>
        <div className="products-list">
          {products?.map((product) => (
            <div key={product.id} className="product-card">
              <h4>{product.name}</h4>
              <p>Price: ₹{product.price}</p>
              <div className="product-buttons">
                <button onClick={() => handleAddToCart(product)}>Add</button>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>            
              </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Product</h3>
              <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formValues.price}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Seller Name</label>
                <input
                  type="text"
                  name="sellerName"
                  value={formValues.sellerName}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
