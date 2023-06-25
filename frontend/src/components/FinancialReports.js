import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function FinancialReports({ data, change, setChange }) {
  const theme = useTheme();
  const [adminCost, setAdminCost] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    setOpen(false);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          //headers is an object that contains the headers of the request
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const data = {
        _id: id,
        adminCost: adminCost,
      };

      await axios.put(`/api/financial/updateFinancial/`, data, config);
      setChange(!change);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="h6"
        color={theme.palette.warning.main}
        gutterBottom
      >
        Monthly Report
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Revenue</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Admin Fee</TableCell>
            <TableCell align="right">Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.revenue}</TableCell>
              <TableCell>{row.cost}</TableCell>
              <TableCell>{row.adminCost}</TableCell>
              <TableCell align="right">{`$${row.profit}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color={theme.palette.warning.main}
        href=""
        onClick={handleClickOpen}
        sx={{ mt: 3 }}
      >
        Add Extra Cost
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <form
          onSubmit={(event) => handleSubmit(event, data[data.length - 1]._id)}
        >
          <DialogTitle>
            Update Admin Fee for{" "}
            {data[data.length - 1] ? data[data.length - 1].date : ""}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the admin fee for this month.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="adminCost"
              label="Admin Fee"
              type="number"
              fullWidth
              variant="standard"
              inputProps={{ step: "0.01" }}
              onChange={(e) => setAdminCost(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
