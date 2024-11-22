import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/groceryapp/get-orders/');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error loading orders: {error}</p>;
  }

  if (orders.length === 0) {
    return <p>No orders available.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Sidebar Navigation */}
      <div style={{ width: '20%', borderRight: '1px solid #ddd', padding: '20px' }}>
        <Navigation />
      </div>

      {/* Main Content */}
      <div style={{ width: '80%', padding: '20px', overflowY: 'auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>All Orders</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '20px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h2>Order ID: {"2024" + order.id}</h2>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>

              <h3>Customer Details:</h3>
              <p><strong>Name:</strong> {order.customer.name}</p>
              <p><strong>Email:</strong> {order.customer.email}</p>
              <p><strong>Phone:</strong> {order.customer.phone}</p>

              <h3>Delivery Address:</h3>
              <p>{order.address.home_address}</p>
              <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>

              <h3>Cart Products:</h3>
              <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                {order.cartproduct.map((product) => (
                  <li key={product.id}>
                    Product ID: {product.product} - Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
