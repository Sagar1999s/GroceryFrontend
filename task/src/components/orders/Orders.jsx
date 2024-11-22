import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../navigation/Navigation';

const Orders = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [address, setAddress] = useState({
    homeAddress: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/groceryapp/get-cart-products/');
        if (!response.ok) {
          throw new Error('Failed to fetch cart products');
        }
        const data = await response.json();
        setCartProducts(data);
        const total = data.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();

    const orderData = {
      selectedCustomer,
      cartProducts,
      address,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/groceryapp/create-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create the order');
      }

      await response.json();
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleCustomerSelect = (e) => {
    setSelectedCustomer(e.target.value);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/groceryapp/get_all_customers/');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (orderPlaced) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Your order has been successfully placed!</h1>
        <h3>Delivery Address:</h3>
        <p><strong>Home Address:</strong> {address.homeAddress}</p>
        <p><strong>City:</strong> {address.city}</p>
        <p><strong>State:</strong> {address.state}</p>
        <p><strong>Pincode:</strong> {address.pincode}</p>
        <button
          onClick={() => navigate('/ViewOrders')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          View Orders
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 250px', backgroundColor: '#f4f4f4', padding: '20px' }}>
          <Navigation />
        </div>
        <div style={{ flex: '1', padding: '20px' }}>
          <h2>Order Summary</h2>
          <div style={{ marginTop: '20px' }}>
            <h3>Select Customer</h3>
            <select
              value={selectedCustomer || ''}
              onChange={handleCustomerSelect}
              style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            >
              <option value="">Select Customer</option>
              {customers?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} ({customer.email})
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cartProducts?.map((item) => (
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
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div>
                  <p>Total: ₹{item.product.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <h3>Total Price: ₹{totalPrice}</h3>
          </div>
          <h3 style={{ marginTop: '40px' }}>Address for Delivery</h3>
          <form onSubmit={handleSubmitAddress} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
              Home Address:
              <input
                type="text"
                name="homeAddress"
                value={address.homeAddress}
                onChange={handleAddressChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </label>
            <label>
              Pincode:
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleAddressChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </label>
            <button
              type="submit"
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Orders;
