import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate()
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

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      let payload;
  
      if (isOtpLogin && otpSent) {
        // Payload for OTP-based login
        payload = {
          email: formData.email,
          otp: formData.otp,
        };
        console.log("Verifying OTP with payload:", payload);
      } else if (!isOtpLogin) {
        // Payload for email/password login
        payload = {
          email: formData.email,
          password: formData.password,
        };
        console.log("Logging in with email/password with payload:", payload);
      } else {
        alert("Please request an OTP or provide valid login details.");
        return;
      }
  
      // Sending payload to server
      const response = await fetch("http://15.207.99.18:8000/groceryapp/login_user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Login successful:", data);
        alert("Login successful!");
  
        // Store the session data and user details in localStorage
        localStorage.setItem("session_id", data.session_id);
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // Navigate to home page or other page after successful login
        navigate("/home");
      } else {
        console.error("Login failed:", data);
        // alert(`Login failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      // alert("An error occurred while logging in.");
    }
  };
  
  

  const handleSendOtp = async () => {
    if (formData.email) {
      try {
        const response = await fetch('http://15.207.99.18:8000/groceryapp/send-otp/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('OTP sent successfully:', data.message);
          setOtpSent(true);
        } else {
          const errorData = await response.json();
          console.error('Error sending OTP:', errorData.error);
          alert(errorData.error || 'Failed to send OTP.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Something went wrong. Please try again later.');
      }
    } else {
      alert('Please enter your email before requesting an OTP.');
    }
  };
  
  const handleVerifyOtp = async () => {
    const payload = {
      email: formData.email, // Assuming formData contains the email
      otp: formData.otp, // Assuming formData contains the OTP
    };
  
    if (!payload.email || !payload.otp) {
      alert("Please provide both email and OTP.");
      return;
    }
  
    try {
      const response = await fetch("http://15.207.99.18:8000/groceryapp/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Verification successful:", data);
        navigate("/home");
  
        // Perform actions upon successful verification
        // Example: Save session or navigate to a different page
      } else {
        const errorData = await response.json();
        console.error("Verification failed:", errorData);
        alert(errorData.error || "Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      // alert("An error occurred while verifying OTP. Please try again later.");
    }
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
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={primaryButtonStyle}
                >
                  Send OTP
                </button>
              ) : (
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
                  <button type="submit" onClick={handleVerifyOtp} style={primaryButtonStyle}>
                    Verify
                    
                  </button>
                </>
              )}
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

          {!isOtpLogin && (
            <button type="submit" style={primaryButtonStyle}>
              Login
            </button>
          )}
        </form>

        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          <button
            type="button"
            onClick={() => {
              setIsOtpLogin(!isOtpLogin);
              setOtpSent(false);
              setFormData({ email: '', password: '', otp: '' });
            }}
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

const toggleButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  cursor: 'pointer',
  textDecoration: 'underline',
};

export default Login;
