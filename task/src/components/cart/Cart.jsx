import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navigation from '../navigation/Navigation';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/groceryapp/get-cart-products/');

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

  const handleDeleteItem = (id) => {
    setCartProducts((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = () => {
    console.log('Placing Order with the following items:');
    cartProducts.forEach((item) => {
      console.log(`Product: ${item.product.name}, Quantity: ${item.quantity}, Price: ₹${item.product.price}`);
    });

    

    // Navigate to the /orders page
    navigate('/orders');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Left Section: Navigation */}
      <div style={{ flex: '0 0 20%', backgroundColor: '#f7f7f7', borderRight: '1px solid #ddd' }}>
        <Navigation />
      </div>

      {/* Right Section: Cart */}
      <div style={{ flex: '1', padding: '20px' }}>
        {loading ? (
          <h2 style={{ textAlign: 'center', padding: '20px' }}>Loading...</h2>
        ) : error ? (
          <h2 style={{ textAlign: 'center', padding: '20px' }}>Error: {error}</h2>
        ) : cartProducts?.length === 0 ? (
          <h2 style={{ textAlign: 'center', padding: '20px' }}>Cart is Empty</h2>
        ) : (
          <div>
            <h2>Your Cart</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartProducts.map((item) => (
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
                    <h4>{item.product.name}</h4>
                    <p>Price: ₹{item.product.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  {/* <div>
                    <button
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#ff4d4d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                      }}
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button
                onClick={handlePlaceOrder}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
