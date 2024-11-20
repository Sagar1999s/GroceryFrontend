import React, { useState } from 'react';

export const Login = () => {
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isOtpLogin) {
      console.log('Logging in with OTP:', formData.email, formData.otp);
    } else {
      console.log('Logging in with email/password:', formData.email, formData.password);
    }
  };

  const handleSendOtp = () => {
    console.log('Sending OTP to email:', formData.email);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Login</h2>
        <form onSubmit={handleLogin} style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter your email"
            />
          </div>

          {isOtpLogin ? (
            <>
              <div style={inputGroupStyle}>
                <label htmlFor="otp" style={labelStyle}>OTP:</label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter OTP"
                />
              </div>
              <button type="button" onClick={handleSendOtp} style={secondaryButtonStyle}>
                Send OTP
              </button>
            </>
          ) : (
            <div style={inputGroupStyle}>
              <label htmlFor="password" style={labelStyle}>Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter your password"
              />
            </div>
          )}

          <button type="submit" style={primaryButtonStyle}>
            Login
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          <button
            type="button"
            onClick={() => setIsOtpLogin(!isOtpLogin)}
            style={toggleButtonStyle}
          >
            {isOtpLogin ? 'Login with Password' : 'Login with OTP'}
          </button>
        </p>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f4f4f9',
};

const cardStyle = {
  padding: '30px',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  color: '#333',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputGroupStyle = {
  textAlign: 'left',
};

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  marginBottom: '5px',
  color: '#666',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '14px',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const primaryButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const secondaryButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const toggleButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  cursor: 'pointer',
  textDecoration: 'underline',
};

export default Login;
