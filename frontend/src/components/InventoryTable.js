import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridActionsCellItem,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {
  listInventories,
  updateInventory,
  deleteInventory,
} from "../actions/inventoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function dateSetter(params) {
  const date = params.value.toISOString().split("T")[0];
  return { ...params.row, expirationDate: date };
}

function costSetter(params) {
  const number = Number(params.value);
  return { ...params.row, cost: number.toFixed(2) };
}

const useFakeMutation = () => {
  return React.useCallback(
    (row) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (row.name.trim() === "") {
            reject();
          } else {
            resolve(row);
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
    return `Category from '${oldRow.category || ""}' to '${
      newRow.category || ""
    }'`;
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
  const dispatch = useDispatch();
  const inventoryList = useSelector((state) => state.inventoryList);
  const { loading, error, inventories } = inventoryList;
  const inventoryCreate = useSelector((state) => state.inventoryCreate);
  const inventoryDelete = useSelector((state) => state.inventoryDelete);

  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleDelete = React.useCallback((id) => {
    try {
      dispatch(deleteInventory(id));
    } catch (error) {
      console.log(error);
    }
  });

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
      const response = await mutateRow(newRow);

      await dispatch(updateInventory(newRow));

      setSnackbar({
        children: "Changes successfully saved",
        severity: "success",
      });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      console.log(error);
      setSnackbar({
        children: Object.values(
          error ? error.response.data : "Cannot be blank"
        ),
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
    dispatch(listInventories());
    if (inventoryCreate.success) {
      setSnackbar({
        children: "Inventory successfully created",
        severity: "success",
      });
      inventoryCreate.success = null;
    } else if (inventoryDelete.success) {
      setSnackbar({
        children: "Inventory successfully deleted",
        severity: "success",
      });
      inventoryDelete.success = null;
    }
  }, [inventoryDelete.success, inventoryCreate.success]);

  useEffect(() => {
    if (inventoryCreate.error) {
      setSnackbar({
        children: Object.values(inventoryCreate.error),
        severity: "error",
      });
      // console.log(inventoryCreate.error);
      inventoryCreate.error = null;
    } else if (inventoryDelete.error) {
      setSnackbar({
        children: Object.values(inventoryDelete.error),
        severity: "error",
      });
      inventoryDelete.error = null;
    }
  }, [inventoryCreate.error, inventoryDelete.error]);

  // console.log(inventories);

  const columns = [
    {
      field: "name",
      headerName: "Ingredient",
      flex: 1,
      editable: true,
      minWidth: 100,
    },
    {
      field: "category",
      headerName: "Category",
      type: "singleSelect",
      flex: 1,
      editable: true,
      valueOptions: [
        { value: "Vegetables", label: "Vegetables" },
        { value: "Fruits", label: "Fruits" },
        { value: "Meat", label: "Meat" },
        { value: "Seafood", label: "Seafood" },
        { value: "Dairy", label: "Dairy" },
        { value: "Baking and Grains", label: "Baking and Grains" },
        { value: "Spices and Herbs", label: "Spices and Herbs" },
        { value: "Beverages", label: "Beverages" },
        { value: "Others", label: "Others" },
      ],
      minWidth: 100,
    },
    {
      field: "cost",
      headerName: "Cost Per Unit",
      type: "number",
      flex: 1,
      editable: true,
      minWidth: 50,
      valueSetter: costSetter,
    },
    {
      field: "countInStock",
      headerName: "Stocks Left",
      type: "number",
      flex: 1,
      editable: true,
      minWidth: 50,
      valueGetter: ({ value }) => (value ? value.toFixed(2) : "0.00"),
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
      minWidth: 50,
    },
    {
      field: "expirationDate",
      headerName: "Expiry Date",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      valueSetter: dateSetter,
      flex: 1,
      editable: true,
      minWidth: 100,
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

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        color="warning"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 8,
    page: 0,
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div style={{ width: "100%" }}>
          {renderConfirmDialog()}
          <DataGrid
            autoHeight
            rows={inventories}
            columns={columns}
            getRowId={(row) => row._id}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) => {}}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[8]}
            slots={{
              pagination: CustomPagination,
            }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#FEC98F",

                fontSize: 16,
              },
            }}
          />
          {!!snackbar && (
            <Snackbar
              open
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
            >
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}
        </div>
      )}
    </>
  );
}
