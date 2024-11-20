import React, { useState } from 'react';

const Cart = () => {
  
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 100, quantity: 1 },
    { id: 2, name: 'Product 2', price: 200, quantity: 2 },
  ]);

  
  const handleUpdateQuantity = (id, delta) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
            : item
        )
        .filter((item) => item.quantity > 0) 
    );
  };

 
  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: 'center', padding: '20px' }}>Cart is Empty</h2>;
  }

 
  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ddd',
              padding: '10px 0',
            }}
          >
            <div>
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div>
              <button
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '5px',
                }}
                onClick={() => handleUpdateQuantity(item.id, -1)}
              >
                -
              </button>
              <button
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                }}
                onClick={() => handleUpdateQuantity(item.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
