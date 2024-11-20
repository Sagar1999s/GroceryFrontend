import React from 'react';
import { useOutletContext } from 'react-router-dom';

const productsData = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
];

 const Products = () => {
  const handleAddToCart = (values) =>{
    console.log(values)

  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {productsData.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '5px',
              width: '150px',
              textAlign: 'center',
            }}
          >
            <h4>{product.name}</h4>
            <p>Price: ₹{product.price}</p>
            <button
              style={{
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
