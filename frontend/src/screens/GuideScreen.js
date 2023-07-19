import React from 'react';
import { Typography, Container, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const GuidePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: '0px 3px 6px #00000029',
}));

const OrangeHeaderTypography = styled(Typography)(({ theme }) => ({
  color: '#FF8C00', 
  textAlign: 'center', // Center align the content
//   fontWeight: 'bold',
  fontFamily: 'Roboto', 
}));

// const OrangeTextTypography = styled(Typography)(({ theme }) => ({
//     color: '',
//     display: 'inline', 
//   }));
  

const GuideScreen = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <OrangeHeaderTypography variant="h3" gutterBottom>
          New Hawker's Guide
        </OrangeHeaderTypography>
        <GuidePaper elevation={0} variant="outlined">
          <OrangeHeaderTypography variant="body1" gutterBottom>
            Congratulations on becoming a new Hawker! Here are some essential tips and information to help you get started:
          </OrangeHeaderTypography>
          <Typography variant="h5" gutterBottom mt={2}>
            1. Register and Get Licensed
          </Typography>
          <Typography variant="body1" gutterBottom>
            Before you begin selling your delicious food, make sure to register your hawker stall with the local authorities
            and obtain the necessary licenses and permits. This will ensure that you're operating legally and can avoid any penalties.
          </Typography>
          <Typography variant="h5" gutterBottom mt={2}>
            2. Prepare Your Menu
          </Typography>
          <Typography variant="body1" gutterBottom>
            Create a diverse and appealing menu that showcases your best dishes. Consider offering signature dishes and daily specials
            to attract more customers. Ensure that your menu has a good balance of flavors and caters to different dietary preferences.
          </Typography>
          <Typography variant="h5" gutterBottom mt={2}>
            3. Maintain Hygiene and Cleanliness
          </Typography>
          <Typography variant="body1" gutterBottom>
            Food safety is of utmost importance. Keep your hawker stall clean and tidy at all times. Wash your hands frequently, use
            separate utensils for handling raw and cooked food, and ensure that all ingredients are fresh and stored properly.
          </Typography>
          <Typography variant="h5" gutterBottom mt={2}>
            4. Serve with a Smile
          </Typography>
          <Typography variant="body1" gutterBottom>
            Customer service matters! Greet your customers with a smile and provide them with a friendly and pleasant dining experience.
            A positive attitude goes a long way in building customer loyalty and attracting repeat business.
          </Typography>
          <Typography variant="h5" gutterBottom mt={2}>
            5. Promote Your Hawker Stall
          </Typography>
          <Typography variant="body1" gutterBottom>
            Use social media platforms and local advertising to promote your hawker stall. Consider offering discounts or special promotions
            to entice new customers. Word-of-mouth is also a powerful tool, so ensure that your food and service are top-notch to generate
            positive reviews.
          </Typography>
          <Typography variant="h5" gutterBottom mt={2}>
            6. Embrace the Journey
          </Typography>
          <Typography variant="body1" gutterBottom>
            Being a hawker is not just a job; it's a way of life. Embrace the challenges and joys that come with running your hawker stall.
            Every day is an opportunity to connect with your community through food. Remember, the journey is as important as the destination.
          </Typography>
          <Typography variant="h5" gutterBottom mt={2}>
            7. Engage with Customers
          </Typography>
          <Typography variant="body1" gutterBottom>
            Build a rapport with your customers. Ask for feedback and suggestions, and take them seriously. Engaging with your customers
            will not only help you improve your offerings but also create a loyal customer base who will keep coming back for more.
          </Typography>
          <Typography variant="h5" gutterBottom mt={2}>
            8. Adapt and Innovate
          </Typography>
          <Typography variant="body1" gutterBottom>
            Stay ahead of the competition by constantly adapting and innovating. You can begin doing so by using HawkHub! You can also introduce new dishes, explore different cuisines,
            and embrace culinary trends. Innovation will keep your hawker stall fresh and exciting for both new and regular customers.
          </Typography>
          <OrangeHeaderTypography variant="body1" gutterBottom mt={2}>
            Remember, success in the hawker business requires dedication, passion, and a genuine love for food. Wishing you great success
            in your hawker journey! Happy cooking!
          </OrangeHeaderTypography>
        </GuidePaper>
      </Box>
    </Container>
  );
};

export default GuideScreen;
