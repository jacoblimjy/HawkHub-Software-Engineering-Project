import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import hawkhubplus from "../assets/hawkhubplus.png";
import star from "../assets/Star.png";
import hawker from "../assets/hawker.webp";

function HomeScreen() {
  const CustomButton = ({
    backgroundColor,
    color,
    buttonText,
    heroBtn,
    guideBtn,
    getStartedBtn,
  }) => {
    const CustomButton = styled(Button)(({ theme }) => ({
      backgroundColor: backgroundColor,
      color: color,
      fontWeight: "700",
      fontSize: "14px",
      cursor: "pointer",
      padding: "0.5rem 1.25rem",
      borderRadius: "7px",
      textTransform: "none",
      display: "block",
      border: "2px solid transparent",
      "&:hover": {
        backgroundColor: color,
        color: backgroundColor,
        borderColor: backgroundColor,
      },
      [theme.breakpoints.down("md")]: {
        margin:
          (heroBtn || getStartedBtn) && theme.spacing(0, "auto", 3, "auto"),
        width: (heroBtn || getStartedBtn) && "90%",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: guideBtn && theme.spacing(3),
        width: guideBtn && "90%",
      },
    }));

    return <CustomButton>{buttonText}</CustomButton>;
  };

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(1),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#ffaa00",
    fontWeight: "bold",
    lineHeight: "1.2",
    margin: theme.spacing(1, 0, 1, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <>
      <Box sx={{ backgroundColor: "#faf6f0", minHeight: "80vh" }}>
        <Container>
          <CustomBox>
            <Box sx={{ flex: "1" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  color: "#687690",
                  fontWeight: "500",
                  mt: 10,
                  mb: 4,
                }}
              >
                Welcome to HawkHub
              </Typography>
              <Title>Empowering Hawkers. Connecting Communities.</Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                Making life easier for Hawkers and Suppliers. Our web
                application provides a one-stop solution for hawkers to manage
                their inventory and finances, as well as make business purchases
                with ease.
              </Typography>
              <CustomButton
                backgroundColor="#000000"
                color="#fff"
                buttonText="More About Us"
                heroBtn={true}
              />
            </Box>

            <Box sx={{ flex: "1.25" }}>
              <img
                src={hawkhubplus}
                alt="hawkhubplus"
                style={{ maxWidth: "100%", marginBottom: "2rem" }}
              />
            </Box>
          </CustomBox>
        </Container>
      </Box>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#7D8589",
            fontSize: "16px",
            fontWeight: "bold",
            mt: 2,
          }}
        >
          More than 20,000 trust HawkHub
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <img src={star} alt="stars" style={{ maxWidth: "100%" }} />
          <Typography
            variant="body2"
            sx={{
              color: "#7D8589",
              fontSize: "16px",
              fontWeight: "bold",
              mt: 1,
              ml: 1,
            }}
          >
            5-Star Rating (2k+ Reviews)
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Our Story
        </Typography>

        <img src={hawker} alt="hawkhubplus" style={{ maxWidth: "50%" }} />
        <CustomBox>
          <Typography
            variant="body2"
            sx={{
              fontSize: "20px",
              fontWeight: "100",
              color: "#5A6473",
            }}
          >
            <p>  Managing finances and inventory can be a cumbersome task for Hawkers, who frequently rely on manual processes to keep track of their business operations. We acknowledge the vital role that Hawkers play in our communities. Oftentimes, they are small business owners who contribute to the local economy, and they provide delicious and affordable food options. By supporting hawkers with our web application, we hope to help them succeed in their businesses and encourage a new generation of Hawkers. </p>
            <p>  By making it easier for Hawkers to manage their businesses and locate supplies, they can concentrate on perfecting their culinary skills. This can indirectly benefit customers who enjoy affordable, high-quality food options. In addition, our web application will help suppliers expand their customer base and grow their businesses. Ultimately, supporting hawkers is about contributing to the local economy and creating vibrant and diverse communities. By developing a platform that supports the entire food culture ecosystem, we hope to contribute to the preservation of local food and the development of stronger communities. </p>
          </Typography>
        </CustomBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Main Features
        </Typography>
        <Typography
            variant="body2"
            sx={{
              fontSize: "18px",
              fontWeight: "100",
              color: "#5A6473",
              textAlign: "center",
            }}
          >
            New here? <br/>
            Our platform features 3 Main Features: Namely StockTracker, FinanceTracker & Multi-Vendor(Suppliers) Ecommerce Space. <br/>            
          </Typography>
          {/* <Typography
            variant="body2"
            sx={{
              fontSize: "18px",
              fontWeight: "100",
              color: "#5A6473",
              mt: 2,
            }}
          >
            Our Real-Time Stock Tracker's calibration feature enables hawkers to accurately measure and track the ingredients used to produce each menu item. This feature ensures that hawkers have accurate measurements and quantities of the ingredients and materials necessary to prepare their dishes. Calibration can be accomplished either with explicit numbers provided by the vendors or by analysing usage patterns over time. <br/>  <br/>           
            Our Finance Tracker component generates financial reports for sellers. This feature enables vendors to analyse their financial performance, monitor their profitability, and trace their expenses. The financial reports provide an exhaustive summary of key financial metrics, such as revenue, expenses, profits, and other pertinent financial indicators. <br/> <br/> 
            Our ‘Suppliers’ Ecommerce space is a multi-vendor ecommerce space where food suppliers can list their products upon registering as a supplier in our registration page.
          </Typography> */}


      </Box>

    </>
  );
}

export default HomeScreen;
