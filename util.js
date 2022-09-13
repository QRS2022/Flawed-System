export function createClickRecord(
  operationId,
  page,
  module,
  widget,
  startTimeTick,
  duration
) {
  return {
    operationId,
    page,
    module,
    widget,
    startTimeTick,
    duration,
  };
}

export async function postClickRecord(postData, callback = async () => {}) {
  const res = await fetch("/api/click", {
    method: "POST",
    body: JSON.stringify(postData),
  });

  if (res.status === 200) {
    const _ = await callback();
  }
}

export async function postBlueClick(widget) {
  const res = await fetch("/api/blueclick", {
    method: "POST",
    body: JSON.stringify({
      widget,
    }),
    headers: {
      enterTick: localStorage.getItem("enterTick"),
    },
  });
}

export async function postNewUser(postData, callback) {
  const res = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(postData),
  });
  if (res.status === 200) {
    callback();
  }
  return res.status;
}

export async function postLogin(postData) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(postData),
  });
  let js = await res.json();
  return js.token;
}

export async function getCoursesByUsername(username) {
  const res = await fetch("/api/getCourses", {
    method: "POST",
    body: { username },
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const courses = await res.json();
  return courses.courses;
}

export async function postCreateCourse(postData) {
  const res = await fetch("/api/createCourse", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return res.status === 200 ? true : false;
}

export async function postSearchCourse(postData) {
  const res = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const course = await res.json();
  return course;
}

export async function postJoinCourse(postData) {
  const res = await fetch("/api/joinCourse", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function getCoursewaresByCoursename(postData) {
  const res = await fetch("/api/getCoursewares", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function uploadCourseware(postData) {
  const res = await fetch("/api/uploadCourseware", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function deleteCourseware(postData) {
  const res = await fetch("/api/deleteCourseware", {
    method: "DELETE",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function getMyAssignments(postData) {
  const res = await fetch("/api/getMyAssignments", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function uploadAssignment(postData) {
  const res = await fetch("/api/uploadAssignment", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function deleteAssignment(postData) {
  const res = await fetch("/api/deleteAssignment", {
    method: "DELETE",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function getCourseAssignments(postData) {
  const res = await fetch("/api/getCourseAssignments", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function shareMessage(postData) {
  const res = await fetch("/api/shareToAStudent", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function getMessages() {
  const res = await fetch("/api/getMessages", {
    method: "GET",
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function deleteMessage(postData) {
  const res = await fetch("/api/deleteMessage", {
    method: "DELETE",
    body: JSON.stringify(postData),
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return await res.json();
}

export async function deleteAllOperationSequences() {
  const res = await fetch("/api/deleteAllOperationSequences", {
    method: "DELETE",
  });
  return await res.json();
}

export async function getAllOperations(postData) {
  const res = await fetch("/api/getAllOperations", {
    method: "POST",
    body: JSON.stringify(postData),
  });
  return await res.json();
}
