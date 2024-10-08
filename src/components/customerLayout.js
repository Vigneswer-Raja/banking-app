import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, ListItem, Drawer } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)', // Greenish gradient
  padding: '10px 20px',
  animation: `${fadeIn} 1s ease-in-out`,
  zIndex: 1201,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '5px solid #4caf50', // Green bottom border
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Soft shadow effect
}));

const Sidebar = styled(Drawer)(() => ({
  width: '275px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '240px',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #cfd9df 100%)',
    borderRight: 'none',
    marginTop: '24px',
    height: 'calc(100vh - 24px)',
    borderRadius: '10px', // Rounded corners for sidebar
  },
}));

const ContentArea = styled(Box)(() => ({
  flexGrow: 1,
  background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)',
  padding: '20px',
  marginTop: '50px',
  animation: `${fadeIn} 1s ease-in-out`,
  height: '100vh',
  border: '5px solid #4caf50', // Green border around content area
  borderRadius: '8px', // Rounded corners
  transition: 'background-color 0.5s ease', // Smooth transition for background color
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Soft shadow effect
}));

// Styled NavButton
const NavButton = styled(({ button, ...props }) => <ListItem {...props} />)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#b2fbc0',
    transform: 'scale(1.05)', // Slight scale on hover for a unique effect
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Shadow effect on hover
  },
  transition: 'transform 0.3s ease',
  border: '1px solid transparent', // Default border
  borderRadius: '5px', // Rounded corners for nav buttons
}));

const CustomerLayout = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const fetchCustomerName = async () => {
      const customerId = sessionStorage.getItem('customerId'); // Get customerId from session storage
      try {
        const response = await axios.post(
          'https://firestore.googleapis.com/v1/projects/bankmanagement-136e1/databases/(default)/documents:runQuery',
          {
            structuredQuery: {
              from: [{ collectionId: 'customer' }], // Targeting the 'documents' collection
              where: {
                fieldFilter: {
                  field: { fieldPath: 'customerId' },
                  op: 'EQUAL',
                  value: { integerValue: customerId }, // Assuming customerId is stored as a string in Firestore
                },
              },
            },
          }
        );

        setCustomerName(response.data[0].document.fields.name.stringValue); // Adjust based on your Firestore structure
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerName();
  }, []);

  const handleLogout = () => {
    sessionStorage.setItem('customerId', 0);
    navigate('/'); // Redirect to SignIn page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header Section */}
      <HeaderBar position="fixed">
        {/* Welcome Message */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '20px' }}>
          Welcome {customerName}
        </Typography>

        {/* Header Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NavButton button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/customerDashboard')} startIcon={<HomeIcon />} sx={{ marginRight: '10px' }}>
              Home
            </Button>
          </NavButton>
          <NavButton button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/manageAccounts')} startIcon={<AccountBalanceIcon />} sx={{ marginRight: '10px' }}>
              Manage Accounts
            </Button>
          </NavButton>
          <NavButton button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/loanApply')} startIcon={<AttachMoneyIcon />} sx={{ marginRight: '10px' }}>
              Apply Loan
            </Button>
          </NavButton>
          <NavButton button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/investment')} startIcon={<TrendingUpIcon />} sx={{ marginRight: '10px' }}>
              Investment
            </Button>
          </NavButton>
          <NavButton button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/transactionHistory')} startIcon={<HistoryIcon />} sx={{ marginRight: '10px' }}>
              Transaction History
            </Button>
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

export default CustomerLayout;
