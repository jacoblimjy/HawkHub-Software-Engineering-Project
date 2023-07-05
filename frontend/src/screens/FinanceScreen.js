import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Chart from "../components/Chart";
import CurrentMonth from "../components/CurrentMonth";
import FinancialReports from "../components/FinancialReports";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listFiancials } from "../actions/financialActions";

function FinanceScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const financialList = useSelector((state) => state.financialList);
  const { loading, error, financials } = financialList;
  const financialUpdate = useSelector((state) => state.financialUpdate);

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
    }
  }, [userInfo]);

  React.useEffect(() => {
    dispatch(listFiancials());
  }, [financialUpdate.success]);

  return (
    <>
      <h1>Financials</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
              <FinancialReports data={financials} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}

export default FinanceScreen;
