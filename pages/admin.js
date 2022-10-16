import * as React from "react";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deleteAllOperationSequences, getAllOperations } from "../util";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/router";
import TextareaAutosize from "@mui/material/TextareaAutosize";
// import { validate } from "../validator";
// import { dimensionCalculation } from "../dimension";
import Flow from "./flow";
import TableResult from "./table";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const columns = [
  { field: "id", headerName: "OperationID", width: 360, editable: false },
  {
    field: "page",
    headerName: "Page",
    width: 150,
    editable: false,
  },
  {
    field: "module",
    headerName: "Function",
    width: 150,
    editable: false,
  },
  {
    field: "widget",
    headerName: "Widget",
    width: 200,
    editable: false,
  },
  {
    field: "startTimeTick",
    headerName: "Start Time",
    sortable: true,
    width: 200,
  },
  {
    field: "duration",
    headerName: "Duration",
    sortable: true,
    width: 160,
  },
];

const atomTasks = [
  "Home",
  "N-Signup",
  "N-Login",
  "N-Course",
  "N-Messages",
  "Sign up",
  "Log in",
  "Search",
  "Join",
  "Create",
  "Upload",
  "Download",
  "Delete",
  "Request",
  "Accept",
  "CheckCourses",
];

export default function Admin() {
  const resultCategories = ["Flow Chart", "Table"];

  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [component, setComponent] = useState("table");
  // const [component, setComponent] = useState("result");
  const [operations, setOperations] = useState([]);
  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  const [entryValue, setEntryValue] = useState(null);
  const [entryInputValue, setEntryInputValue] = useState("");
  const [taskText, setTaskText] = useState("Up-input\nUp-AF or Up-CF\nUp-Add");
  const [specificOperations, setSpecificOperations] = useState([]);
  const [resultCategory, setResultCategory] = useState("Flow Chart");

  const changeResultCategory = (event) => {
    setResultCategory(event.target.value);
  };

  const getResult = (result) => {
    let content = undefined;
    switch (result) {
      case "Table":
        content = (
          <Box sx={{ width: "100%", height: "100%", marginTop: "20px" }}>
            <TableResult></TableResult>
          </Box>
        );
        break;
      case "Flow Chart":
        content = (
          <Box sx={{ width: "100%", height: "100%", marginTop: "20px" }}>
            <Flow></Flow>
          </Box>
        );
        break;
      default:
        content = <div>Something Wrong</div>;
    }
    return (
      <Box sx={{ width: "100%", height: "100%" }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={resultCategory}
            label="Result Category"
            onChange={changeResultCategory}
          >
            {resultCategories.map((category) => (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {content}
      </Box>
    );
  };

  const getComponent = (component) => {
    switch (component) {
      case "table":
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <DataGrid
              rows={operations}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[10, 25, 50, 100]}
              checkboxSelection
              disableSelectionOnClick
              filterModel={filterModel}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pagination
            />
          </Box>
        );
      case "result":
        return (
          <Box sx={{ flex: 1, marginRight: "20px" }}>
            {getResult(resultCategory)}
          </Box>
        );
      default:
        break;
    }
  };

  const getAllOperationSequences = async () => {
    const _ = await getAllOperations({ filter: null });
    let entrySet = Array.from(
      new Set(
        _.operations.map((item) => {
          return item.operationId.split("-")[1];
        })
      )
    );
    setEntries(entrySet);
    _.operations = _.operations.map((item) => {
      item.id = item.operationId;
      return item;
    });
    setOperations(_.operations);
  };

  useEffect(() => {
    // localStorage.removeItem("enterTick");
    // localStorage.removeItem("operationId");
    // alert("Finish Capturing");
    const _ = getAllOperationSequences();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Stack direction="row" spacing={5} sx={{ margin: "30px" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={entries}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Choose the timestamp" />
          )}
          value={entryValue}
          onChange={(event, newValue) => {
            if (newValue) {
              setFilterModel({
                items: [
                  {
                    id: 1,
                    columnField: "id",
                    operatorValue: "contains",
                    value: newValue,
                  },
                ],
              });
            } else {
              setFilterModel({
                items: [],
              });
            }
            setEntryValue(newValue);
            const regex = new RegExp(newValue);
            let relatedOperations = [];
            for (let i = 0; i < operations.length; i++) {
              let currentOperaion = operations[i];
              if (regex.test(currentOperaion.operationId)) {
                relatedOperations.push(currentOperaion);
              }
            }
            let relatedWidgets = relatedOperations.map((item) => {
              return item.widget;
            });
            setSpecificOperations(relatedOperations);
          }}
          inputValue={entryInputValue}
          onInputChange={(event, newInputValue) => {
            setEntryInputValue(newInputValue);
          }}
        />
      </Stack>
      <Stack
        direction="row"
        sx={{
          flex: 1,
          width: "100%",
          padding: "0 20px 20px 20px",
        }}
      >
        {getComponent(component)}
      </Stack>
    </Box>
  );
}
