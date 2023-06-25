import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import Chart from "../components/Chart";
import CurrentMonth from "../components/CurrentMonth";
import FinancialReports from "../components/FinancialReports";
import axios from "axios";

function FinanceScreen() {
  const [financials, setFinancials] = React.useState([]);
  const [change, setChange] = React.useState(false);

  React.useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            //headers is an object that contains the headers of the request
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          "/api/financial/getFinancials",
          config
        );

        for (let i = 0; i < data.length; i++) {
          data[i].date = data[i].date.substring(0, 7) + "-01";
        }

        setFinancials(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFinancials();
    console.log(financials);
  }, [change]);
  console.log(financials);

  return (
    <>
      <h1>Financials</h1>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Chart data={financials} />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <CurrentMonth data={financials[financials.length - 1]} />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <FinancialReports
                data={financials}
                setChange={setChange}
                change={change}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default FinanceScreen;
