import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .super-app-theme--header": {
      color: "#4ead5b",
    },
  },
});

const columns = [
  {
    field: "id",
    headerName: "Index",
    width: 90,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Behavior Dimension",
    headerName: "Behavior Dimension",
    width: 200,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Calculation Result",
    headerName: "Calculation Result",
    width: 200,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Problematic Page",
    headerName: "Problematic Page",
    type: "string",
    width: 200,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Problematic Function/Widget",
    headerName: "Problematic Function/Widget",
    type: "string",
    width: 300,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Usability Smell",
    headerName: "Usability Smell",
    type: "string",
    width: 200,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
];

export default function TableResult() {
  const classes = useStyles();

  const [pageSize, setPageSize] = React.useState(5);

  let rows = new Array(100).fill(40).map((_, i) => ({
    id: i + 1,
    "Behavior Dimension": "",
    "Calculation Result": "",
    "Problematic Page": "",
    "Problematic Function/Widget": "",
    "Usability Smell": "",
  }));

  return (
    <div style={{ height: "100%", width: "100%" }} className={classes.root}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pagination
        rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 100]}
        disableSelectionOnClick
      />
    </div>
  );
}
