import TableHeaders from "../tableHeaders.config";
import { useContext } from "react";
import { TableCell, TableRow, TableHead } from "@mui/material";
import { AppThemeEnum } from "../enums/AppThemeEnum";
import ModeContext from "../contexts/ModeContext";
export default function GenericTableHeader() {
  const mode = useContext(ModeContext);
  return (
    <TableHead>
      <TableRow>
        {TableHeaders.map((header, index) => {
          return (
            <TableCell
              style={{
                color: mode === AppThemeEnum.LIGHT ? "black" : "white",
              }}
              key={index}
            >
              {header.Header}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
