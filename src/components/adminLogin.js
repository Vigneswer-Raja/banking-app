import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API calls to Firebase REST API

// Animation keyframes for the form
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GradientBackground = styled(Box)({
  background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)', // Light greenish background
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  animation: `${fadeIn} 1.5s ease-in-out`,
});

const FormContainer = styled(Container)({
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  width: '450px',
  animation: `${fadeIn} 1s ease-in-out`,
});

const StyledButton = styled(Button)({
  padding: '12px 20px',
  backgroundColor: '#66bb6a', // Light green color for button
  color: '#fff',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#43a047', // Darker green on hover
    transform: 'scale(1.02)',
    transition: 'all 0.3s ease',
  },
});

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    if (!email || !password) {
      alert("Please enter both Email ID and Password.");
      return;
    }

    if(email !== "vigneswer@gmail.com"){
      alert("This is not a valid admin email ID!");
      return;
    }

    try {
      // Firebase REST API for email/password authentication
      const loginResponse = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCv2HxtlZ1LWj6DOQpth331Nb1tv1QmV7Q', {
        email,
        password,
        returnSecureToken: true,
      });

      if (loginResponse.data) {
        // Redirect to admin dashboard or admin home page
        navigate('/adminDashboard'); 
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error('Admin login error:', error);
      alert("An error occurred during admin login. Please try again.");
    }
  };

  return (
    <GradientBackground>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#43a047' }}>
          Admin Login
        </Typography>
        <TextField
          fullWidth
          label="Email ID"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
          style={{ marginBottom: '20px' }}
        />
        <StyledButton
          variant="contained"
          onClick={handleAdminLogin}
          fullWidth
        >
          Login
        </StyledButton>

        {/* Button to navigate back to SignIn page */}
        <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
          Not an admin?{' '}
          <Link href="#" onClick={() => navigate('/')} style={{ color: '#43a047', fontWeight: 'bold' }}>
            Go to User Login
          </Link>
        </Typography>
      </FormContainer>
    </GradientBackground>
  );
};

export default AdminLogin;
