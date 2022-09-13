import { useState } from "react";
import ReactFlow from "react-flow-renderer";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const flowCategories = [
  "Fault Tolerance",
  "Visibility",
  "Efficiency",
  "Learnability",
  "Operability",
];

export default function Flow() {
  const [flow, setFlow] = useState("Fault Tolerance");

  const changeFlowCategory = (event) => {
    setFlow(event.target.value);
  };

  const faultToleranceTemplate = [
    {
      id: "0",
      data: {
        label: "High Fault Tolerance",
      },
      position: { x: 400, y: 10 },
    },
    {
      id: "1",
      data: {
        label: "(A: Operation Time, long)",
      },
      position: { x: 10, y: 200 },
    },
    {
      id: "2",
      data: {
        label: "(B: Operation Correctness, low)",
      },
      position: { x: 220, y: 200 },
    },
    {
      id: "3",
      data: {
        label: "(C: Operation Position, interacted)",
      },
      position: { x: 430, y: 200 },
    },
    {
      id: "4",
      data: {
        label: "(D: Operation Efficiency, low)",
      },
      position: { x: 620, y: 200 },
    },
    {
      id: "5",
      data: {
        label: "(A2: Execution time of subtasks, long)",
      },
      position: { x: 10, y: 400 },
    },
    {
      id: "6",
      data: {
        label: "(C2: Web browser's toolbar, interacted)",
      },
      position: { x: 300, y: 400 },
    },
    {
      id: "7",
      data: {
        label: "(D1: Irrelevant operations efficiency, low)",
      },
      position: { x: 490, y: 400 },
    },
    {
      id: "8",
      data: {
        label: "(D2: Relevant operations efficiency, low)",
      },
      position: { x: 650, y: 400 },
    },
    {
      id: "9",
      data: {
        label: "(C21: back button, interacted)",
      },
      position: { x: 300, y: 600 },
    },
    {
      id: "edge0",
      source: "1",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge1",
      source: "2",
      target: "0",
      label: "Break",
      arrowHeadType: "arrow",
    },
    {
      id: "edge2",
      source: "3",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge3",
      source: "4",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge4",
      source: "5",
      target: "1",
      label: "Make",
      arrowHeadType: "arrow",
    },
    {
      id: "edge5",
      source: "6",
      target: "3",
      label: "Make",
      arrowHeadType: "arrow",
    },
    {
      id: "edge6",
      source: "7",
      target: "4",
      label: "Break",
      arrowHeadType: "arrow",
    },
    {
      id: "edge7",
      source: "8",
      target: "4",
      label: "Help",
      arrowHeadType: "arrow",
    },
    {
      id: "edge8",
      source: "9",
      target: "6",
      label: "Make",
      arrowHeadType: "arrow",
    },
  ];

  const visibilityTemplate = [
    {
      id: "0",
      data: {
        label: "High Visibility",
      },
      position: { x: 400, y: 10 },
    },
    {
      id: "1",
      data: {
        label: "(A: Operation Time, long)",
      },
      position: { x: 110, y: 200 },
    },
    {
      id: "2",
      data: {
        label: "(C: Operation Position, interacted)",
      },
      position: { x: 370, y: 200 },
    },
    {
      id: "3",
      data: {
        label: "(D: Operation Efficiency, low)",
      },
      position: { x: 630, y: 200 },
    },
    {
      id: "4",
      data: {
        label: "(A4: Time interval between operations, long)",
      },
      position: { x: 10, y: 400 },
    },
    {
      id: "5",
      data: {
        label: "(C1: Invalid position, interacted)",
      },
      position: { x: 210, y: 400 },
    },
    {
      id: "6",
      data: {
        label: "(C2: Web browser's toolbar, interacted)",
      },
      position: { x: 450, y: 400 },
    },
    {
      id: "7",
      data: {
        label: "(D2: Relevant operations efficiency, low)",
      },
      position: { x: 660, y: 400 },
    },
    {
      id: "8",
      data: {
        label: "(C11: Mouse wheel, interacted)",
      },
      position: { x: 200, y: 600 },
    },
    {
      id: "9",
      data: {
        label: "(C22: Forward button, interacted)",
      },
      position: { x: 500, y: 600 },
    },
    {
      id: "edge0",
      source: "1",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge1",
      source: "2",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge2",
      source: "3",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge3",
      source: "4",
      target: "1",
      label: "Make",
      arrowHeadType: "arrow",
    },
    {
      id: "edge4",
      source: "5",
      target: "2",
      label: "Help",
      arrowHeadType: "arrow",
    },
    {
      id: "edge5",
      source: "6",
      target: "2",
      label: "Help",
      arrowHeadType: "arrow",
    },
    {
      id: "edge6",
      source: "7",
      target: "3",
      label: "Make",
      arrowHeadType: "arrow",
    },
    {
      id: "edge7",
      source: "8",
      target: "5",
      label: "Make",
      arrowHeadType: "arrow",
    },
    {
      id: "edge8",
      source: "9",
      target: "6",
      label: "Make",
      arrowHeadType: "arrow",
    },
  ];

  const efficiencyTemplate = [
    {
      id: "0",
      data: {
        label: "High Efficiency",
      },
      position: { x: 370, y: 100 },
    },
    {
      id: "1",
      data: {
        label: "(A: Operation Time, long)",
      },
      position: { x: 110, y: 300 },
    },
    {
      id: "2",
      data: {
        label: "(B: Operation Correctness, low)",
      },
      position: { x: 370, y: 300 },
    },
    {
      id: "3",
      data: {
        label: "(D: Operation Efficiency, low)",
      },
      position: { x: 630, y: 300 },
    },
    {
      id: "edge0",
      source: "1",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge1",
      source: "2",
      target: "0",
      label: "Break",
      arrowHeadType: "arrow",
    },
    {
      id: "edge2",
      source: "3",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
  ];

  const learnabilityTemplate = [
    {
      id: "0",
      data: {
        label: "High Learnability",
      },
      position: { x: 400, y: 10 },
    },
    {
      id: "1",
      data: {
        label: "(A: Operation Time, long)",
      },
      position: { x: 110, y: 200 },
    },
    {
      id: "2",
      data: {
        label: "(B: Operation Correctness, low)",
      },
      position: { x: 270, y: 200 },
    },
    {
      id: "3",
      data: {
        label: "(C: Operation Position, interacted)",
      },
      position: { x: 430, y: 200 },
    },
    {
      id: "4",
      data: {
        label: "(D: Operation Efficiency, low)",
      },
      position: { x: 590, y: 200 },
    },
    {
      id: "5",
      data: {
        label: "(A1: The first time interval of learning the system, long)",
      },
      position: { x: 10, y: 400 },
    },
    {
      id: "6",
      data: {
        label: "(A3: Time interval between necessary operations, long)",
      },
      position: { x: 180, y: 400 },
    },
    {
      id: "7",
      data: {
        label: "(C1: Invalid position, interacted)",
      },
      position: { x: 350, y: 400 },
    },
    {
      id: "8",
      data: {
        label: "(C2: Web browser's toolbar, interacted)",
      },
      position: { x: 520, y: 400 },
    },
    {
      id: "9",
      data: {
        label: "(D1: Irrelevant operations efficiency, low)",
      },
      position: { x: 700, y: 400 },
    },
    {
      id: "10",
      data: {
        label: "(C11: Mouse wheel, interacted)",
      },
      position: { x: 350, y: 600 },
    },
    {
      id: "11",
      data: {
        label: "(C22: Forward button, interacted)",
      },
      position: { x: 520, y: 600 },
    },
    {
      id: "edge0",
      source: "1",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge1",
      source: "2",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge2",
      source: "3",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge3",
      source: "4",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge4",
      source: "5",
      target: "1",
      label: "Make",
      arrowHeadType: "arrow",
    },
    {
      id: "edge5",
      source: "6",
      target: "1",
      label: "Help",
      arrowHeadType: "arrow",
    },
    {
      id: "edge6",
      source: "7",
      target: "3",
      label: "Help",
      arrowHeadType: "arrow",
    },
    {
      id: "edge7",
      source: "8",
      target: "3",
      label: "Help",
      arrowHeadType: "arrow",
    },
    {
      id: "edge8",
      source: "9",
      target: "4",
      label: "Break",
      arrowHeadType: "arrow",
    },
    {
      id: "edge9",
      source: "10",
      target: "7",
      label: "Make",
      arrowHeadType: "arrow",
    },
    {
      id: "edge10",
      source: "11",
      target: "8",
      label: "Make",
      arrowHeadType: "arrow",
    },
  ];

  const operabilityTemplate = [
    {
      id: "0",
      data: {
        label: "High Operability",
      },
      position: { x: 400, y: 10 },
    },
    {
      id: "1",
      data: {
        label: "(A: Operation Time, long)",
      },
      position: { x: 50, y: 200 },
    },
    {
      id: "2",
      data: {
        label: "(C: Operation Position, interacted)",
      },
      position: { x: 340, y: 200 },
    },
    {
      id: "3",
      data: {
        label: "(D: Operation Efficiency, low)",
      },
      position: { x: 630, y: 200 },
    },
    {
      id: "4",
      data: {
        label: "(A4: Time interval between operations, long)",
      },
      position: { x: 50, y: 400 },
    },
    {
      id: "5",
      data: {
        label: "(C1: Invalid position, interacted)",
      },
      position: { x: 300, y: 400 },
    },
    {
      id: "6",
      data: {
        label: "(C2: Web browser's toolbar, interacted)",
      },
      position: { x: 500, y: 400 },
    },
    {
      id: "edge0",
      source: "1",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge1",
      source: "2",
      target: "0",
      label: "Hurt",
      arrowHeadType: "arrow",
    },
    {
      id: "edge2",
      source: "3",
      target: "0",
      label: "Break",
      arrowHeadType: "arrow",
    },
    {
      id: "edge3",
      source: "4",
      target: "1",
      label: "Make",
      arrowHeadType: "arrow",
    },
    {
      id: "edge4",
      source: "5",
      target: "2",
      label: "Make",
      arrowHeadType: "arrow",
    },
    {
      id: "edge5",
      source: "6",
      target: "2",
      label: "Help",
      arrowHeadType: "arrow",
    },
  ];

  const getCorrespondingFlow = (flow) => {
    switch (flow) {
      case "Fault Tolerance":
        return <ReactFlow elements={faultToleranceTemplate} />;
      case "Visibility":
        return <ReactFlow elements={visibilityTemplate} />;
      case "Efficiency":
        return <ReactFlow elements={efficiencyTemplate} />;
      case "Learnability":
        return <ReactFlow elements={learnabilityTemplate} />;
      case "Operability":
        return <ReactFlow elements={operabilityTemplate} />;

      default:
        return <div>No flow selected</div>;
    }
  };
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={flow}
          label="Flow Category"
          onChange={changeFlowCategory}
        >
          {flowCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {getCorrespondingFlow(flow)}
    </Box>
  );
}
