const blueClickWidgets = [
  "pLearn-Assignment",
  "pLearn-VisibleRange",
  "pLearn-Courseware",
  "pTeach-Student",
  "pTeach-Assignment",
  "pTeach-Courseware",
  "pCourses-Status",
  "pL-Submit",
  "pMessages-Message",
  "pSGNP-Submit",
];

function getOperationsTotalDuration(operations) {
  let sum = 0;
  for (let i = 0; i < operations.length; i++) {
    sum += operations[i].duration;
  }
  return sum;
}

function getTaskInfo(validationResult, operations) {
  if (validationResult) {
    let needOperations = [];
    validationResult.sort((a, b) => {
      return a.start - b.start;
    });
    for (let i = 0; i < validationResult.length; i++) {
      needOperations.push(operations[validationResult[i].start]);
    }
    return needOperations;
  } else {
    return null;
  }
}

function countBlueClicks(operations) {
  let count = 0;
  let blueClicks = [];
  for (let i = 0; i < operations.length; i++) {
    if (blueClickWidgets.indexOf(operations[i].widget) >= 0) {
      count++;
      blueClicks.push(operations[i].widget);
    }
  }
  return { count, blueClicks };
}

function calAvgInterval(operations) {
  let avgInterval = 0;
  if (operations.length === 1) {
    return avgInterval;
  }
  for (let i = 1; i < operations.length; i++) {
    avgInterval +=
      operations[i].startTimeTick - operations[i - 1].startTimeTick;
  }
  avgInterval /= operations.length - 1;
  return avgInterval;
}

function getMouseScrollInfo(operations) {
  let times = 0;
  let recordedWidgets = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i].widget === "Scroll") {
      times++;
      if (i < operations.length - 1 && operations[i + 1].widget !== "Scroll") {
        recordedWidgets.push(operations[i + 1].module);
      }
    }
  }
  return {
    recordedWidgets,
    times,
  };
}

function getBlankInfo(operations) {
  let blankCount = 0;
  let blankPage = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i].widget.includes("Blank")) {
      blankCount++;
      blankPage.push(operations[i].page);
    }
  }
  return { blankCount, blankPage };
}

function satisfactionJudgement(behaviorDimension, index) {
  let satisfactionLevel = [
    "Satisfied",
    "Weakly-Satisfied",
    "Weakly-Denied",
    "Denied",
  ];
  switch (behaviorDimension) {
    case "A":
    case "A1":
    case "A2":
    case "A3":
    case "A4":
    case "B":
      if (index <= 0.6) return satisfactionLevel[0];
      else if (index <= 0.8) return satisfactionLevel[1];
      else if (index < 1) return satisfactionLevel[2];
      else return satisfactionLevel[3];
    case "C1":
      if (index >= 5) return satisfactionLevel[0];
      else if (index >= 2 && index < 5) return satisfactionLevel[1];
      else if (index === 1) return satisfactionLevel[2];
      else return satisfactionLevel[3];
    case "C2":
    case "C11":
    case "C12":
      if (index >= 2) return satisfactionLevel[0];
      else if (index === 1) return satisfactionLevel[1];
      else return satisfactionLevel[3];
    case "C13":
    case "C21":
    case "C22":
      if (index >= 1) return satisfactionLevel[0];
      else return satisfactionLevel[3];
    case "D":
    case "D2":
      if (index <= 0.8) return satisfactionLevel[0];
      else if (index <= 0.9) return satisfactionLevel[1];
      else if (index < 1) return satisfactionLevel[2];
      else return satisfactionLevel[3];
    case "D1":
      if (index <= 0.1) return satisfactionLevel[0];
      else if (index <= 0.2) return satisfactionLevel[1];
      else if (index < 0.3) return satisfactionLevel[2];
      else return satisfactionLevel[3];

    default:
      break;
  }
}

export function dimensionCalculation(validationResult, operations) {
  const taskOperations = getTaskInfo(validationResult, operations);
  if (!taskOperations) {
    alert("没有符合的匹配项");
    return null;
  }
  let dimension = {};
  let taskDuration = getOperationsTotalDuration(taskOperations);
  let totalDuration = getOperationsTotalDuration(operations);
  dimension["A"] = taskDuration / totalDuration;
  dimension["A1"] = 1; // ???
  dimension["A2"] = taskDuration / totalDuration;
  dimension["A3"] = 1; // ???
  dimension["A4"] = calAvgInterval(taskOperations) / calAvgInterval(operations);

  dimension["B"] = 0; // ???

  const scrollInfo = getMouseScrollInfo(operations);
  dimension["C11"] = scrollInfo.times;
  const blueClicksInfo = countBlueClicks(operations);
  dimension["C12"] = blueClicksInfo.count;
  const blankInfo = getBlankInfo(operations);
  dimension["C13"] = blankInfo.blankCount;
  dimension["C1"] = dimension["C11"] + dimension["C12"] + dimension["C13"];

  dimension["C21"] = 0; // bug
  dimension["C22"] = 0; // bug
  dimension["C2"] = dimension["C21"] + dimension["C22"];

  dimension["D"] = taskOperations.length / operations.length;
  dimension["D1"] = 0; // ???
  dimension["D2"] = 1; // ???
}
