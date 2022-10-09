import { Box } from "@mui/system";
import Navigation from "../components/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Background from "../components/background";

const reverseRouterMap = {
  "/": "Home",
  "/signup": "Sign up",
  "/login": "Log in",
  "/courses": "Courses",
  "/messages": "Messages",
  "/courseDetail": "Course Detail",
};

export default function MainLayout({ children, useBackground }) {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("currentPage", reverseRouterMap[router.pathname]);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {useBackground && <Background />}
      <Navigation />
      {children}
    </Box>
  );
}
