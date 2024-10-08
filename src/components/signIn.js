import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Modal } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

// Gradient background with light greenish tones

const GradientBackground = styled(Box)({
  background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)', // Light greenish background
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  animation: `${fadeIn} 1.5s ease-in-out`,
});

// Form container styling with a greenish theme
const FormContainer = styled(Container)(() => ({
  backgroundColor: '#FFFFFF',
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  width: '450px',
  animation: `${fadeIn} 1s ease-in-out`,
}));

// Styled button for Admin with light green tones
const AdminButton = styled(Button)(() => ({
  marginTop: '10px',
  backgroundColor: '#81C784', // Light green for Admin button
  color: '#fff',
  '&:hover': {
    backgroundColor: '#66BB6A', // Darker green on hover
  },
}));

// Styled sign-in button with greenish tones
const StyledButton = styled(Button)(() => ({
  padding: '12px 20px',
  backgroundColor: '#4CAF50', // Medium green for Sign In button
  color: '#fff',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#388E3C', // Darker green on hover
    transform: 'scale(1.02)',
    transition: 'all 0.3s ease',
  },
}));

// Modal component for Forgot Password
const ForgotPasswordModal = ({ open, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    onSubmit(email);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Reset Password
        </Typography>
        <TextField
          fullWidth
          label="Enter Email ID"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Main SignIn component
const SignIn = () => {
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [openForgotPassword, setOpenForgotPassword] = useState(false); // Modal state
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!customerId || !password) {
      alert("Please enter both Customer ID and Password.");
      return;
    }

    // Authentication logic here
    try {
      const firestoreQueryURL = "https://firestore.googleapis.com/v1/projects/bankmanagement-136e1/databases/(default)/documents:runQuery";

      const queryPayload = {
        structuredQuery: {
          from: [{ collectionId: "customer" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "customerId" },
              op: "EQUAL",
              value: { integerValue: customerId },
            },
          },
        },
      };

      const customerResponse = await axios.post(firestoreQueryURL, queryPayload);

      if (customerResponse.data.length > 0 && customerResponse.data[0].document) {
        const emailId = customerResponse.data[0].document.fields.email.stringValue;

        const authURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCv2HxtlZ1LWj6DOQpth331Nb1tv1QmV7Q";
        const authResponse = await axios.post(authURL, {
          email: emailId,
          password: password,
          returnSecureToken: true,
        });

        if (authResponse.data.idToken) {
          sessionStorage.setItem('customerId', customerId);
          navigate('/customerDashboard'); // Redirect to dashboard
        }
      } else {
        alert("Invalid Customer ID.");
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert("An error occurred during sign in. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    try {
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCv2HxtlZ1LWj6DOQpth331Nb1tv1QmV7Q",
        {
          requestType: 'PASSWORD_RESET',
          email: email,
        }
      );
      alert('Password reset email sent!');
      setOpenForgotPassword(false);
    } catch (error) {
      console.error('Error sending reset email:', error);
      alert('Failed to send reset email.');
    }
  };

  return (
    <GradientBackground>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#388E3C' }}>
          Sign In
        </Typography>
        <TextField
          fullWidth
          label="Customer ID"
          variant="outlined"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
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
          onClick={handleSignIn}
          fullWidth
        >
          Sign In
        </StyledButton>

        <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
          <Link href="#" onClick={() => setOpenForgotPassword(true)} style={{ color: '#4CAF50', fontWeight: 'bold' }}>
            Forgot Password?
          </Link>
        </Typography>

        <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link href="#" onClick={() => navigate('signUp')} style={{ color: '#4CAF50', fontWeight: 'bold' }}>
            Register
          </Link>
        </Typography>

        <AdminButton
          variant="contained"
          onClick={() => navigate('/adminLogin')}
          fullWidth
        >
          Admin Login
        </AdminButton>
        
      </FormContainer>
       {/* Forgot Password Modal */}
       <ForgotPasswordModal
        open={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
        onSubmit={handleForgotPassword}
      />
    </GradientBackground>
  );
};

export default SignIn;
