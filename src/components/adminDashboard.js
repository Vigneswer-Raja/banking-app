import React from 'react';
import { Paper, Typography, Grid, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';

// Styled components with light greenish theme
const InfoSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  textAlign: 'center',
  background: 'linear-gradient(135deg, #e0f7fa 30%, #ffffff 100%)',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  borderRadius: theme.shape.borderRadius * 2.5,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)',
  },
}));

const StatsValue = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#004d40',
  marginBottom: theme.spacing(1),
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#00695c',
  },
}));

const StatsLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: '500',
  color: '#00796b',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#004d40',
  },
}));

// InfoCard component
const InfoCard = ({ value1, label1, value2, label2 }) => (
  <InfoSection>
    <StatsValue>{value1}</StatsValue>
    <StatsLabel>{label1}</StatsLabel>
    <Divider sx={{ my: 3, borderColor: '#26a69a', borderWidth: 2 }} />
    <StatsValue>{value2}</StatsValue>
    <StatsLabel>{label2}</StatsLabel>
  </InfoSection>
);

// AdminDashboard Component with adjusted button and layout
const AdminDashboard = () => (
  <Box
    sx={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '50px 20px',
      background: 'linear-gradient(145deg, #b2dfdb 0%, #ffffff 100%)',
      borderRadius: '25px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    }}
  >
    {/* Header Section */}
    <Header />

    {/* Info Section Grid */}
    <Grid container spacing={5} justifyContent="space-around">
      <Grid item xs={12} md={5}>
        <InfoCard
          value1="56"
          label1="Account Requests"
          value2="132"
          label2="Loan Requests"
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <InfoCard
          value1="128749"
          label1="Account Holders"
          value2="52,90,55865.52"
          label2="Funds Available"
        />
      </Grid>
    </Grid>
  </Box>
);

// Header Component
const Header = () => (
  <Box sx={{ textAlign: 'center', marginBottom: '50px' }}>
    <Typography
      variant="h2"
      sx={{
        fontWeight: 'bold',
        color: '#004d40',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}
    >
      VICKY BANK
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: '#004d40',
        fontSize: '1.2rem',
        lineHeight: '1.5',
      }}
    >
       Admin Dashboard.
    </Typography>
  </Box>
);

export default AdminDashboard;
