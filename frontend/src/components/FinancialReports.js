import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { updateFinancial } from "../actions/financialActions";

export default function FinancialReports({ data }) {
  const dispatch = useDispatch();
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

  const handleSubmit = async (event, data) => {
    event.preventDefault();
    setOpen(false);
    try {
      if (data.length) {
        const id = data[data.length - 1]._id;
        dispatch(updateFinancial(id, adminCost));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ p: 2, display: "flex", flexDirection: "column" }}
    >
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
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
        <form onSubmit={(event) => handleSubmit(event, data)}>
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
    </TableContainer>
  );
}
