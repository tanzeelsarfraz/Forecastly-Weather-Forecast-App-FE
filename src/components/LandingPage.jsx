import { useState, useEffect, useContext } from "react";
import { Table, TableContainer, Paper } from "@mui/material";
import axios from "axios";
import { AppThemeEnum } from "../enums/AppThemeEnum";
import { weatherForecastUrl } from "../endpoints";
import GenericTableBody from "../utils/GenericTableBody";
import GenericTableHeader from "../utils/GenericTableHeader";
import ModeContext from "../contexts/ModeContext";
export default function LandingPage(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const mode = useContext(ModeContext);
  const fetchData = async () => {
    props.setLoaderBarState(10);
    setLoading(true);
    try {
      const response = await axios.get(`${weatherForecastUrl}`);
      props.setLoaderBarState(60);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      props.setLoaderBarState(100);
    }
  };
  useEffect(
    () => {
      fetchData();
    }, // eslint-disable-next-line
    []
  );
  return (
    <>
      <h2
        className="text-center my-3"
        style={{ color: mode === AppThemeEnum.LIGHT ? "black" : "white" }}
      >
        Welcome to Forecastly!
      </h2>
      <p
        className="my-3"
        style={{ color: mode === AppThemeEnum.LIGHT ? "black" : "white" }}
      >
        Stay ahead of the weather with our detailed 5-day forecast. Whether
        you're planning a weekend getaway, a picnic in the park, or just
        deciding what to wear, we’ve got you covered with accurate and
        up-to-date information.
      </p>
      <Paper
        style={{
          backgroundColor: mode === AppThemeEnum.LIGHT ? "white" : "black",
          color: mode === AppThemeEnum.LIGHT ? "black" : "white",
        }}
      >
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
              page={0}
              rowsPerPage={5}
            ></GenericTableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
