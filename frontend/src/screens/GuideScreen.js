import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Box,
  styled,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import hawker from "../assets/chickenRiceBG.webp";
import eligibility from "../assets/eligibility-criteria-icon.png";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "56px",
  color: "#ffaa00",

  lineHeight: "1.2",
  margin: theme.spacing(1, 0, 1, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));

function GuideScreen() {
  return (
    <Container className="App">
      <Box
        sx={{
          padding: "2rem",
          paddingY: "8rem",
          backgroundColor: "#faf6f0",
          backgroundImage: `url(${hawker})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay",
        }}
      >
        <Typography variant="body1">Ultimate Guide to</Typography>
        <Title>Becoming a Hawker</Title>
        <Typography variant="body2">
          Adapted from National Environment Agency (NEA) - Hawker Trade Guide
        </Typography>
      </Box>
      <Box display="block" justifyContent="center" padding="1rem">
        <Typography
          variant="body1"
          fontSize="40px"
          marginY="2rem"
          align="center"
        >
          Qualify as a Hawker in 3 simple steps!
        </Typography>
        <Grid container spacing={5} marginBottom="2rem">
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#FFE570",
                borderRadius: "1rem",
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom align="center">
                  Step 1
                </Typography>
                <Typography variant="body1" align="center">
                  What to Consider Before Submitting Your Tender Bid
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#FFCD7E",
                borderRadius: "1rem",
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom align="center">
                  Step 2
                </Typography>
                <Typography variant="body1" align="center">
                  The Actual Tender Process
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#FFA170",
                borderRadius: "1rem",
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom align="center">
                  Step 3
                </Typography>
                <Typography variant="body1" align="center">
                  What to Take Note of After Successfully Tendering for a Stall
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box display="block" justifyContent="center" padding="1rem">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ backgroundColor: "#FFE570" }}
          align="center"
          padding="1rem"
        >
          Step I: What to Consider Before Submitting Your Tender Bid
        </Typography>
        <Grid container spacing={5} marginBottom="2rem" alignContent="center">
          <Grid
            item
            xs={12}
            md={4}
            alignSelf="center"
            justifySelf="center"
            marginY="1rem"
          >
            <img src={eligibility} width="100%" />
          </Grid>
          <Grid item xs={12} md={8} marginY="1rem">
            <Typography fontWeight="bold" fontSize="2rem">
              Eligibility Criteria
            </Typography>

            <List>
              <ListItem>
                <ListItemText primary="Singapore citizens or permanent residents." />
              </ListItem>
              <ListItem>
                <ListItemText primary="21 years old and above." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Not debarred from holding a hawker licence by NEA." />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Not a former assistant/nominee who was de-registered 
by NEA."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Not banned by the Government/Statutory Boards from 
taking part in any business tenders."
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Not an undischarged bankrupt." />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Not already renting or a joint operator of two cooked 
food stalls in markets/hawker centres managed 
by NEA. The maximum number of cooked food stalls 
any individual can rent is two."
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h5" gutterBottom>
        Part II: The Actual Tender Process
      </Typography>
      <List>
        <ListItem>...</ListItem>
        <ListItem>...</ListItem>
        <ListItem>...</ListItem>
        <ListItem>...</ListItem>
        <ListItem>...</ListItem>
        <ListItem>...</ListItem>
      </List>

      <Typography variant="h5" gutterBottom>
        Part III: What to Take Note of After Successfully Tendering for a Stall
      </Typography>
      <List>
        <ListItem>...</ListItem>
        <ListItem>...</ListItem>
        <ListItem>...</ListItem>
        <ListItem>
          <ListItemText primary="Key Terms/Conditions in the Tenancy Agreement:" />
          <List>
            <ListItem>...</ListItem>
            <ListItem>...</ListItem>
            <ListItem>...</ListItem>
            <ListItem>...</ListItem>
          </List>
        </ListItem>
      </List>

      <Typography variant="h5" gutterBottom>
        Useful Links:
      </Typography>
      <Typography>
        <Link href="http://www.nea.gov.sg/hawker-management">NEA Website</Link>
        <br />
        <Link href="http://www.ssg.gov.sg/individuals/course-directory.html">
          SSG Accredited Training Providers
        </Link>
      </Typography>
    </Container>
  );
}

export default GuideScreen;
