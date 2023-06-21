import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import InventoryAdder from "./InventoryAdder";

function dateSetter(params) {
  const date = params.value.toISOString().split("T")[0];
  return { ...params.row, expirationDate: date };
}

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === "") {
            reject();
          } else {
            resolve(user);
          }
        }, 200);
      }),
    []
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.name !== oldRow.name) {
    return `Name from '${oldRow.name}' to '${newRow.name}'`;
  }
  if (newRow.category !== oldRow.category) {
    return `Age from '${oldRow.category || ""}' to '${newRow.category || ""}'`;
  }
  if (newRow.cost !== oldRow.cost) {
    return `Cost from '${oldRow.cost || ""}' to '${newRow.cost || ""}'`;
  }
  if (newRow.countInStock !== oldRow.countInStock) {
    return `Stocks from '${oldRow.countInStock || ""}' to '${
      newRow.countInStock || ""
    }'`;
  }
  if (newRow.unit !== oldRow.unit) {
    return `Unit from '${oldRow.unit || ""}' to '${newRow.unit || ""}'`;
  }
  if (newRow.expirationDate !== oldRow.expirationDate) {
    return `Expiry Date from '${oldRow.expirationDate || ""}' to '${
      newRow.expirationDate || ""
    }'`;
  }
  return null;
}

export default function InventoryTable() {
  const [change, setChange] = useState(false);
  const [tableData, setTableData] = useState([]);
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleDelete = (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          //headers is an object that contains the headers of the request
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios.post(`/api/ingredients/deleteIngredient/`, { _id: id }, config);
      setChange(!change);
    } catch (error) {
      console.log(error);
    }
  };

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          //headers is an object that contains the headers of the request
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/ingredients/updateIngredient/`, newRow, config);

      const response = await mutateRow(newRow);
      setSnackbar({
        children: "Changes successfully saved",
        severity: "success",
      });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({
        children: Object.values(error.response.data.data)[0],
        severity: "error",
      });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  useEffect(() => {
    const getInventory = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
          headers: {
            //headers is an object that contains the headers of the request
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        axios
          .get(`/api/ingredients/getIngredients/`, config)
          .then((response) => {
            setTableData(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getInventory();
  }, [change]);

  console.log(tableData);

  const columns = [
    { field: "name", headerName: "Ingredient", flex: 1, editable: true },
    { field: "category", headerName: "Category", flex: 1, editable: true },
    {
      field: "cost",
      headerName: "Cost Per Unit",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "countInStock",
      headerName: "Stocks Left",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      type: "singleSelect",
      valueOptions: [
        { value: "kg", label: "kg" },
        { value: "g", label: "g" },
        { value: "L", label: "L" },
        { value: "mL", label: "mL" },
        { value: "pc", label: "pc" },
      ],
      flex: 1,
      editable: true,
    },
    {
      field: "expirationDate",
      headerName: "Expiry Date",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      valueSetter: dateSetter,
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      {renderConfirmDialog()}
      <InventoryAdder change={change} setChange={setChange} />
      <DataGrid
        autoHeight
        rows={tableData}
        columns={columns}
        pageSize={12}
        getRowId={(row) => row._id}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {}}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}
