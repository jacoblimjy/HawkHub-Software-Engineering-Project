import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import hawkhubplus from "../assets/hawkhubplus.png";
import star from "../assets/Star.png";

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
    gap: theme.spacing(5),
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
                Making life easier for hawkers and suppliers. Our web
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
    </>
  );
}

export default HomeScreen;
