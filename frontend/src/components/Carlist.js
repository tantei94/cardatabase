import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import {
  DataGrid,
  gridClasses,
  GridDeleteIcon,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { IconButton, Snackbar, Stack } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function Carlist(props) {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "_links.car.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (row) => <EditCar data={row} updateCar={updateCar} />,
    },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <IconButton onClick={() => onDelClick(row.id)}>
          <GridDeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  const onDelClick = (url) => {
    if (window.confirm("Are you suer to delete?")) {
      const token = sessionStorage.getItem("jwt");
      fetch(url, { method: "DELETE", headers: { Authorization: token } })
        .then((res) => {
          if (res.ok) {
            fetchCars();
            setOpen(true);
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchCars = () => {
    const token = sessionStorage.getItem("jwt");

    fetch(SERVER_URL + "api/cars", { headers: { Authorization: token } })
      .then((res) => res.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.log(err));
  };

  const addCar = (car) => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(car),
    })
      .then((res) => {
        if (res.ok) {
          fetchCars();
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => console.log(err));
  };

  const updateCar = (car, link) => {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(car),
    })
      .then((res) => {
        if (res.ok) {
          fetchCars();
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <Stack mt={2} mb={2}>
        <AddCar addCar={addCar} />
      </Stack>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={cars}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
          components={{ Toolbar: CustomToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />
      </div>
    </>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default Carlist;
