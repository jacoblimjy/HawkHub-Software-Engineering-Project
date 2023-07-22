import {
  Box,
  Button,
  styled,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import hawkhubplus from "../assets/hawkhubplus.png";
import star from "../assets/Star.png";
import hawker from "../assets/hawker.webp";
import { Link } from "react-router-dom";
import stock from "../assets/stock.avif";
import fin from "../assets/fin.jpg";
import ecommerce from "../assets/cover_multivendor.jpg";
import { useSelector } from "react-redux";

function HomeScreen() {
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

  const MainFeaturesContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: theme.spacing(3),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  }));

  const MainFeatureCard = styled(Box)(({ theme }) => ({
    width: "350px",
    height: "230px",
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#faf6f0",
    borderRadius: theme.spacing(1),
    boxShadow: "0px 3px 6px #00000029",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }));

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const isSupplier = userInfo?.isSupplier;

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  
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
              <Link to={`/guide/`}>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "grey",
                      color: "white",
                    },
                  }}
                >
                  Learn more
                </Button>
              </Link>
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
        <Typography variant="h3" sx={{ fontSize: "20px", fontWeight: "bold" }}>
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
            <p>
              {" "}
              Managing finances and inventory can be a cumbersome task for
              Hawkers, who frequently rely on manual processes to keep track of
              their business operations. We acknowledge the vital role that
              Hawkers play in our communities. Oftentimes, they are small
              business owners who contribute to the local economy, and they
              provide delicious and affordable food options. By supporting
              hawkers with our web application, we hope to help them succeed in
              their businesses and encourage a new generation of Hawkers.{" "}
            </p>
            <p>
              {" "}
              By making it easier for Hawkers to manage their businesses and
              locate supplies, they can concentrate on perfecting their culinary
              skills. This can indirectly benefit customers who enjoy
              affordable, high-quality food options. In addition, our web
              application will help suppliers expand their customer base and
              grow their businesses. Ultimately, supporting hawkers is about
              contributing to the local economy and creating vibrant and diverse
              communities. By developing a platform that supports the entire
              food culture ecosystem, we hope to contribute to the preservation
              of local food and the development of stronger communities.{" "}
            </p>
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
        <Typography variant="h3" sx={{ fontSize: "20px", fontWeight: "bold" }}>
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
          New here? <br />
          Our platform features 3 Main Features: Namely StockTracker,
          FinanceTracker & Multi-Vendor(Suppliers) Ecommerce Space. <br />
        </Typography>
      </Box>
      <MainFeaturesContainer>
        {isSupplier ? (
          <div>
            <Card sx={{ maxWidth: 350, height: 320 }}>
              <CardActionArea>
                <CardMedia component="img" height="140" image={stock} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    StockTracker
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our Real-Time Stock Tracker's calibration feature enables
                    hawkers to accurately measure and track the ingredients used
                    to produce each menu item.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ) : (
          <Link to={`/Stocktaking/`} style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 350, height: 320 }}>
              <CardActionArea>
                <CardMedia component="img" height="140" image={stock} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    StockTracker
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a tracker which enables hawkers to accurately
                    measure and track the ingredients used to produce each menu
                    item.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        )}

        {isSupplier ? (
          <div>
            <Card sx={{ maxWidth: 350, height: 320 }}>
              <CardActionArea>
                <CardMedia component="img" height="140" image={fin} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    FinanceTracker
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a tracker which generates financial reports for
                    sellers, enabling hawkers to analyze their financial
                    performance, monitor their profitability, and trace their
                    expenses.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ) : (
          <Link to={`/finance/`} style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 350, height: 320 }}>
              <CardActionArea>
                <CardMedia component="img" height="140" image={fin} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    FinanceTracker
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a tracker which generates financial reports for
                    sellers, enabling hawkers to analyze their financial
                    performance, monitor their profitability, and trace their
                    expenses.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        )}

        <Link to={`/suppliers/`} style={{ textDecoration: "none" }}>
          <Card sx={{ maxWidth: 350, height: 320 }}>
            <CardActionArea>
              <CardMedia component="img" height="140" image={ecommerce} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Multi-Vendor Ecommerce
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a marketplace where hawkers purchase ingredients and
                  suppliers list their products. It allows for automatic update
                  of inventory in the StockTracker upon the receival of orders.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </MainFeaturesContainer>
      <Typography
        variant="body2"
        sx={{
          fontSize: "12px",
          fontWeight: "100",
          color: "#5A6473",
          ml: 5,
          mt: 3,
        }}
      >
        *Supplier account will not have access to StockTracker and
        FinanceTracker. <br />
      </Typography>
    </>
  );
}

export default HomeScreen;
