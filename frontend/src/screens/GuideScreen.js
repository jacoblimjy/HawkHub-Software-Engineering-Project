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
  Button,
  CardMedia,
  CardActions,
  CardActionArea,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import hawker from "../assets/chickenRiceBG.webp";
import eligibility from "../assets/eligibility-criteria-icon.png";
import hawkerStall from "../assets/hawkerStall.jpg";
import applicationForm from "../assets/applicationForm.png";
import payment from "../assets/payment.jpg";

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
            <Link href="#step1" underline="none">
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
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link href="#step2" underline="none">
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
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link href="#step3" underline="none">
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
                    What to Take Note of After Successfully Tendering for a
                    Stall
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Box display="block" justifyContent="center">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ backgroundColor: "#FFE570" }}
          align="center"
          padding="1rem"
          id="step1"
        >
          Step I: What to Consider Before Submitting Your Tender Bid
        </Typography>
        <Grid container spacing={2} marginBottom="2rem" alignContent="center">
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginY="1rem"
          >
            <img src={eligibility} width="300px" />
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
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "#FFE57077", padding: "1rem" }}
        >
          <Grid item xs={12} md={6} alignSelf="center">
            <Typography variant="h5" align="center">
              Have you attended and passed the Basic Food Hygiene Course (BFHC)?
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" padding="1rem">
              To apply for a hawker stall, bidders must have completed the Basic
              Food Hygiene Course (BFHC) and have attended and passed the Basic
              Food Hygiene Course (BFHC). The course typically consists of six
              hours of course work and 1.5 hours of assessment. There are weekly
              classes available by any of the SkillsFuture Singapore
              (SSG)-accredited training providers.
            </Typography>
            <Button
              variant="contained"
              color="warning"
              href="http://www.ssg.gov.sg/individuals/course-directory.html"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ margin: "1rem" }}
            >
              Find a BFHC Course
            </Button>
          </Grid>
        </Grid>

        <Card
          sx={{ marginY: "4rem" }}
          style={{ border: "none", boxShadow: "none" }}
        >
          <CardMedia
            component="img"
            alt="hawker stall"
            height="320"
            image={hawkerStall}
            sx={{ borderRadius: "1rem" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Applying for a hawker stall
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Vacant stalls are put up for tender and awarded to the highest
              bidders. The amount should be considered when determining the
              monthly stall rental and other costs involved. The NEA website
              provides a list of successful bids of stalls in the past 12
              months, which can serve as a good reference for determining how
              much a stall has been tendered out at a particular hawker centre.
            </Typography>
            <br />
            <Typography variant="body1" color="text.secondary">
              Information on available stalls will be published on the 13th of
              every month (date may be subject to change) in The Straits Times,
              Lianhe Zaobao, Berita Harian, and Tamil Murasu.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              color="warning"
              href="https://www.nea.gov.sg/corporate-functions/resources/tender-notices"
              target="_blank"
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Box>

      <Box display="block" justifyContent="center">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ backgroundColor: "#FFCD7E" }}
          align="center"
          padding="1rem"
          id="step2"
        >
          Step II: The Actual Tender Process
        </Typography>

        <List
          sx={{
            padding: "2rem",
            marginBottom: "5rem",
            backgroundColor: "#faf6f0",
            backgroundImage: `url(${applicationForm})`,
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>1</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6" color="orange">
                  Buy Tender Form
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body1" marginY="0.5rem">
                    Buy Tender Form at a non-refundable amount of $10 from NEA
                    One-Stop Information and Service Centre (OSISC).
                  </Typography>

                  <Typography variant="body1" marginY="0.5rem">
                    Payment is by NETS, credit card or CashCard.
                  </Typography>
                </>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>2</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6" color="orange">
                  {" "}
                  Fill in Tender Form
                </Typography>
              }
              secondary={
                <Typography variant="body1" marginY="0.5rem">
                  Please take note that your bid amount does not include GST and
                  other operating charges.
                </Typography>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>3</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6" color="orange">
                  Submit Tender Form
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body1" marginY="0.5rem">
                    Tender Deposit is an amount equivalent to your bid amount.
                    Buy a Cashier’s Order (amount equivalent to your bid amount)
                    from any bank, made payable to ‘NATIONAL ENVIRONMENT
                    AGENCY’. Cash/cheques are not allowed.
                  </Typography>
                  <Typography variant="body1" marginY="0.5rem">
                    Affix a postage stamp on Envelope A and place the Cashier’s
                    Order in Envelope A.
                  </Typography>
                  <Typography variant="body1" marginY="0.5rem">
                    Place the Tender Form, photocopy of NRIC and Envelope A into
                    Envelope B.
                  </Typography>
                  <Typography variant="body1" marginY="0.5rem">
                    Drop Envelope B into the Tender Box at the OSISC before
                    10.30am on the closing date of the tender
                  </Typography>
                </>
              }
            />
          </ListItem>
        </List>
      </Box>
      <Box display="block">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ backgroundColor: "#FFA170" }}
          align="center"
          padding="1rem"
          id="step3"
        >
          Step III: What to Take Note of After Successfully Tendering for a
          Stall
        </Typography>

        <Typography
          variant="body1"
          marginY="2rem"
          align="center"
          paddingX="10%"
        >
          If your bid is successful, you will receive a Letter of Offer from NEA
          three to four weeks after the tender’s closing date to inform you of
          your scheduled appointment date to sign the Tenancy Agreement. If you
          are operating a cooked food stall, you will need to complete the Basic
          Food Hygiene Course (BFHC) and apply for a Hawker Licence before you
          can run your stall.
        </Typography>

        <Grid
          container
          padding="1rem"
          paddingY="4rem"
          borderRadius="1rem"
          sx={{
            backgroundImage: `url(${payment})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
          style={{
            filter: "grayscale(40%) ",
          }}
        >
          <Grid item xs={12} md={5} alignSelf="center">
            <Typography
              variant="body1"
              fontSize="20px"
              padding="1rem"
              paddingX="10%"
              color="white"
            >
              During the signing of Tenancy Agreement, you will need to pay for
              the following:
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} alignSelf="center">
            <Typography
              variant="body1"
              padding="2rem"
              color="white"
              sx={{ backgroundColor: "#00000077", borderRadius: "1rem" }}
            >
              • Stall rental and S&CC for the first month and table-cleaning
              fees (for cooked food stall)
              <br />
              • Deposit of two months’ rent
              <br />• Licence fee for three years
              <br />• Stamp Duty
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        display="block"
        justifyContent="center"
        marginY="4rem"
        padding="2rem"
        sx={{ backgroundColor: "#faf6f0" }}
      >
        <Typography variant="h4" gutterBottom>
          Things to Note:
        </Typography>
        <Typography variant="body1" marginY="1rem">
          After signing the Tenancy Agreement, new tenants are given up to three
          months to commence operations.
        </Typography>
        <Typography variant="body1" marginY="1rem">
          Successful bidders who fail to sign the Tenancy Agreement will have
          their tender deposit forfeited and be debarred from participating in
          tenders for all lines of business called by Government Ministries or
          Statutory Boards. During the period of debarment, they will not be
          permitted to become a stallholder, joint operator, nominee or hawker
          assistant.
        </Typography>
        <Typography variant="body1" marginY="1rem">
          If your bid is unsuccessful, NEA will return your Cashier’s Order
          three to four weeks after the closing of the tender.
        </Typography>
        <List>
          <Typography variant="body1" marginY="1rem">
            Key Terms/Conditions in the Tenancy Agreement:
          </Typography>
          <ListItem>
            • Operate stall personally (subletting of stall is not allowed)
          </ListItem>
          <ListItem>• You cannot assign your stall to another person</ListItem>
          <ListItem>
            • Do not leave your stall vacant or use it for storage purposes
          </ListItem>
          <ListItem>• Keep your stall clean and tidy</ListItem>
          <ListItem>
            • Your hawker assistant must be a registered food handler (for
            cooked food stall)
          </ListItem>
          <ListItem>
            • Ensure that the gas, electricity or other fuels used for cooking
            are installed by licensed personnel
          </ListItem>
        </List>
        <Typography variant="body1" marginY="1rem">
          Visit{" "}
          <Link href="http://www.nea.gov.sg/hawker-management">
            http://www.nea.gov.sg/hawker-management
          </Link>{" "}
          to find out more.
        </Typography>
      </Box>
      <Typography variant="h5" gutterBottom>
        Useful Links:
      </Typography>
      <Typography>
        <Link href="http://www.nea.gov.sg/hawker-management">NEA Website</Link>
        <br />
        <Link href="http://www.ssg.gov.sg/individuals/course-directory.html">
          SSG Accredited Training Providers
        </Link>
        <br />
        <Link href="https://www.nea.gov.sg/corporate-functions/resources/tender-notices">
          NEA Tender Notices
        </Link>
      </Typography>
    </Container>
  );
}

export default GuideScreen;
