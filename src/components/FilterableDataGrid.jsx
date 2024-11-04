import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableContainer,
  TablePagination,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { AppThemeEnum } from "../enums/AppThemeEnum";
import { weatherForecastUrl } from "../endpoints";
import GenericTableBody from "../utils/GenericTableBody";
import GenericTableHeader from "../utils/GenericTableHeader";
import ModeContext from "../contexts/ModeContext";
export default function FilterableDataGrid(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 365);
  const maxDateStr = maxDate.toISOString().split("T")[0];
  const mode = useContext(ModeContext);
  useEffect(
    () => {
      fetchData();
    },
    // eslint-disable-next-line
    [page, rowsPerPage]
  );

  const filterStyle = {
    marginRight: "8px",
    backgroundColor: mode === AppThemeEnum.LIGHT ? "white" : "black",
    color: mode === AppThemeEnum.LIGHT ? "black" : "white",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: mode === AppThemeEnum.LIGHT ? "black" : "white",
      },
      "&:hover fieldset": {
        borderColor: mode === AppThemeEnum.LIGHT ? "black" : "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: mode === AppThemeEnum.LIGHT ? "black" : "white",
      },
    },
  };
  const fetchData = async (fromDateFilter, toDateFilter) => {
    setLoading(true);
    props.setLoaderBarState(10);
    try {
      const response = await axios.get(`${weatherForecastUrl}/paged`, {
        params: {
          pageNumber: page + 1,
          pageSize: rowsPerPage,
          fromDate:
            !fromDateFilter || fromDateFilter === ""
              ? undefined
              : fromDateFilter,
          toDate:
            !toDateFilter || toDateFilter === "" ? undefined : toDateFilter,
        },
      });
      props.setLoaderBarState(60);
      setData(response.data.data);
      setTotalRows(response.data.totalResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      props.setLoaderBarState(100);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFilter = () => {
    if (!fromDate) {
      props.showAlert("From Date should not be empty", "danger");
      return;
    } else if (!toDate) {
      props.showAlert("To Date should not be empty", "danger");
      return;
    } else if (fromDate > toDate) {
      props.showAlert("From Date should not be greater than To Date", "danger");
      return;
    } else {
      setPage(0);
      fetchData(fromDate, toDate);
    }
  };
  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setPage(0);
    if (fromDate > toDate) {
      return;
    }
    fetchData("", "");
  };
  const handleFromDate = (event) => {
    setFromDate(event.target.value);
  };
  const handleToDate = (event) => {
    setToDate(event.target.value);
  };

  return (
    <Paper
      style={{
        backgroundColor: mode === AppThemeEnum.LIGHT ? "white" : "black",
        color: mode === AppThemeEnum.LIGHT ? "black" : "white",
      }}
    >
      <div style={{ padding: "16px" }}>
        <TextField
          label="From Date"
          type="date"
          value={fromDate}
          onChange={handleFromDate}
          InputLabelProps={{
            shrink: true,
            style: {
              color: mode === AppThemeEnum.LIGHT ? "black" : "white",
            },
          }}
          sx={filterStyle}
          inputProps={{
            min: today,
            max: maxDateStr,
            style: {
              color: mode === AppThemeEnum.LIGHT ? "black" : "white",
              borderColor: mode === AppThemeEnum.LIGHT ? "black" : "white",
            },
          }}
          variant="outlined"
        />
        <TextField
          label="To Date"
          type="date"
          value={toDate}
          onChange={handleToDate}
          InputLabelProps={{
            shrink: true,
            style: {
              color: mode === AppThemeEnum.LIGHT ? "black" : "white",
            },
          }}
          sx={filterStyle}
          inputProps={{
            min: today,
            max: maxDateStr,
            style: {
              color: mode === AppThemeEnum.LIGHT ? "black" : "white",
              borderColor: mode === AppThemeEnum.LIGHT ? "black" : "white",
            },
          }}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          className="my-2 mx-1"
        >
          Filter
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleClearFilter}
          className="my-2"
        >
          Clear
        </Button>
      </div>
      <TableContainer>
        <Table
          style={{
            backgroundColor: mode === AppThemeEnum.LIGHT ? "white" : "black",
          }}
        >
          <GenericTableHeader></GenericTableHeader>
          <GenericTableBody
            loading={loading}
            list={data}
            page={page}
            rowsPerPage={rowsPerPage}
          ></GenericTableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="custom-pagination"
        style={{ color: mode === AppThemeEnum.LIGHT ? "black" : "white" }}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
