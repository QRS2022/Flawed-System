import { Box, Modal, Typography } from "@mui/material";
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

function Deleted() {
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
        <Modal open={true} aria-labelledby="modal-modal-title">
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: "3em" }}
            >
              Deleted successfully!
            </Typography>
          </Box>
        </Modal>
      </Box>
    </MainLayout>
  );
}

export default Deleted;
