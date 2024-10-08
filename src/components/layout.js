import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PercentIcon from '@mui/icons-material/Percent';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

// Animation keyframes for fade-in effect
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const HeaderBar = styled(AppBar)(() => ({
  background: 'linear-gradient(135deg, #b2f2b2 0%, #006400 100%)', // Greenish gradient
  padding: '10px 20px',
  animation: `${fadeIn} 1s ease-in-out`,
  zIndex: 1201,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
}));

const ContentArea = styled(Box)(() => ({
  flexGrow: 1,
  background: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)', // Lighter green background
  padding: '20px',
  marginTop: '10%',
  animation: `${fadeIn} 1s ease-in-out`
}));

// Styled NavButton
const NavButton = styled(Button)(({ theme }) => ({
  margin: '0 10px',
  '&:hover': {
    backgroundColor: '#a8e6cf', // Lighter green on hover
    transform: 'scale(1.02)',
    transition: 'all 0.3s ease',
  },
}));

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/adminLogin'); // Redirect to Admin Login page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header Section */}
      <HeaderBar>
        {/* Welcome Message */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '20px' }}>
          Welcome Vigneswer Raja (Admin)
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NavButton onClick={() => navigate('/adminDashboard')} startIcon={<HomeIcon />}>
            Home
          </NavButton>
          <NavButton onClick={() => navigate('/accountOpening')} startIcon={<AccountCircleIcon />}>
            Account Opening Request
          </NavButton>
          <NavButton onClick={() => navigate('/loanRequest')} startIcon={<LocalAtmIcon />}>
            Loan Request
          </NavButton>
          <NavButton onClick={() => navigate('/interestRateManagement')} startIcon={<PercentIcon />}>
            Interest Rate Management
          </NavButton>
        </Box>

        {/* Logout Button */}
        <Button variant="contained" color="error" onClick={handleLogout} startIcon={<LogoutIcon />}>
          Logout
        </Button>
      </HeaderBar>

      {/* Main Content Area (Dynamic) */}
      <ContentArea>
        <Toolbar />
        <Outlet /> {/* Dynamically render the component based on the route */}
      </ContentArea>
    </Box>
  );
};

export default Layout;
