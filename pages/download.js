import { Box, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../components/mainLayout";
import urlMonitor from "../utils/urlMonitor";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "70vh",
  bgcolor: "white !important",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const modalYes = {
  position: "absolute",
  top: 0,
  left: 10,
  color: "rgba(16, 16, 16, 0.41) !important",
};

function Download() {
  const router = useRouter();

  React.useEffect(() => {
    urlMonitor();
  }, []);

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <Modal open={true}>
          <Box sx={modalStyle}>
            <Box
              id="DL-close"
              sx={modalYes}
              onClick={() => {
                router.back();
              }}
            >
              close
            </Box>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Download successfully!
            </Typography>
          </Box>
        </Modal>
      </Box>
    </MainLayout>
  );
}

export default Download;
