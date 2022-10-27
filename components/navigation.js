import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import style from "./navigation.module.css";
import Link from "next/link";

const logOutNav = [
  { text: "ASSTclassroom", id: "N-ASSTclassroom" },
  { text: "Home", id: "N-Home" },
  { text: "Sign up", id: "N-Signup" },
  { text: "Log in", id: "N-Login" },
  //  { text: "Admin", id: "Admin" },
];
const logInNav = [
  { text: "ASSTclassroom", id: "N-ASSTclassroom" },
  { text: "Home", id: "N-Home" },
  { text: "Courses", id: "N-Course" },
  // { text: "Messages", id: "N-Messages" },
  { text: "Log out", id: "N-Logout" },
  //  { text: "Admin", id: "Admin" },
];
const routerMap = {
  ASSTclassroom: "/",
  Home: "/",
  "Sign up": "/signup",
  "Log in": "/login",
  Courses: "courses",
  Messages: "messages",
  "Log out": "/",
  Admin: "/admin",
};

export default function Navigation() {
  const [content, setContent] = React.useState();
  const [tool, setTool] = React.useState(0);
  let username = null;

  if (typeof localStorage !== "undefined") {
    username = localStorage.getItem("username");
  }

  function getNavigationBar(arr) {
    return arr.map((item, index) => {
      const text = item.text;
      const id = item.id;
      return (
        <Link passHref href={routerMap[text]} key={index}>
          <Button
            id={id}
            className={index === 0 ? style.bold : ""}
            variant="text"
            sx={{
              color: "rgba(16,16,16, 0.41) !important",
              fontSize: "22px !important",
            }}
            onClick={
              text === "Log out"
                ? () => {
                    setTool((prev) => prev + 1);
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                  }
                : () => {
                    setTool((prev) => prev + 1);
                  }
            }
          >
            {text === "Home"
              ? `Hello, ${username ? username : "Please log in"}`
              : text}
          </Button>
        </Link>
      );
    });
  }

  React.useEffect(() => {
    setContent(
      typeof window !== "undefined" && localStorage.getItem("token")
        ? getNavigationBar(logInNav)
        : getNavigationBar(logOutNav)
    );
  }, [tool]);

  return (
    <div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ margin: "20px" }}
      >
        {content}
      </Stack>
    </div>
  );
}
