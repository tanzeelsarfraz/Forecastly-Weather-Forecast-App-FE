import { ReactElement } from "react";
import Loader from "../components/Loader";
import { TableRow, TableCell, TableBody } from "@mui/material";
import { AppThemeEnum } from "../enums/AppThemeEnum";
import ModeContext from "../contexts/ModeContext";
import {useContext} from 'react';
export default function GenericTableBody(props: genericTableProps) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  const mode = useContext(ModeContext);
  if (props.loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} align="center">
            <Loader />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  } else if (props.list.length === 0) {
    return (
      <TableBody>
      <TableRow>
        <TableCell colSpan={5} align="center" style = {{color: mode === AppThemeEnum.LIGHT ? "black" : "white"}}>
          There are no items to display.
        </TableCell>
      </TableRow>
      </TableBody>
    );
  } else {
    return (
      
      <TableBody>
        {props.list?.map((item, index) => (
          <TableRow
            key={index}
            style={{
              backgroundColor:
                mode === AppThemeEnum.LIGHT
                  ? index % 2 === 0
                    ? "#f0f0f0"
                    : "#ffffff"
                  : index % 2 === 0
                  ? "grey"
                  : "black",
            }}
          >
            <TableCell
              style={{
                color: mode === AppThemeEnum.LIGHT ? "black" : "white",
              }}
            >
              {props.page * props.rowsPerPage + index + 1}
            </TableCell>
            <TableCell
              style={{
                color: mode === AppThemeEnum.LIGHT ? "black" : "white",
              }}
            >
              {formatDate(item.date)}
            </TableCell>
            <TableCell
              style={{
                color: mode === AppThemeEnum.LIGHT ? "black" : "white",
              }}
            >
              {item.temperatureC}
            </TableCell>
            <TableCell
              style={{
                color: mode === AppThemeEnum.LIGHT ? "black" : "white",
              }}
            >
              {item.temperatureF}
            </TableCell>
            <TableCell
              style={{
                color: mode === AppThemeEnum.LIGHT ? "black" : "white",
              }}
            >
              {item.summary}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

export interface genericTableProps {
  loading: Boolean;
  list: [];
  children: ReactElement;
  page: number;
  rowsPerPage: number;
}
