import MainLayout from "../components/mainLayout";
import { useRouter } from "next/router";
import style from "../styles/courseDetail.module.css";
import utilStyle from "../styles/util.module.css";
import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  postBlueClick,
  getCoursewaresByCoursename,
  uploadCourseware,
  deleteCourseware,
  getMyAssignments,
  uploadAssignment,
  deleteAssignment,
  getCourseAssignments,
  shareMessage,
} from "../util";
import urlMonitor from "../utils/urlMonitor";

const learnTitle = ["Assignments", "Visible Range", "Operation"];
const teachTitle = ["Student", "Assignment", "Operation"];
const coursewareTilte = ["Courseware", "Operation"];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "30vh",
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

export default function CourseDetail() {
  const router = useRouter();
  let { category, courseName } = router.query;
  const [learnAssignments, setLearnAssignments] = useState([]);
  const [coursewares, setCoursewares] = useState([]);
  const [courseAssignments, setCourseAssignments] = useState([]);
  const [showModal, setModal] = useState(false);
  const [contentToAdd, setContentToAdd] = useState("");
  const [messageToShare, setMessageToShare] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);

  const getCoursewares = async () => {
    let _ = await getCoursewaresByCoursename({ courseName });
    setCoursewares(_.coursewares);
  };

  const getAssignmentsByCoursename = async () => {
    let _ = await getCourseAssignments({ courseName });
    setCourseAssignments(_.assignments);
  };

  const _getMyAssignments = async () => {
    let _ = await getMyAssignments({
      courseName,
      userName: localStorage.getItem("username"),
    });
    setLearnAssignments(_.assignments);
  };

  useEffect(() => {
    urlMonitor();
    let params = new URL(document.location).searchParams;
    courseName = params.get("courseName");
    category = params.get("category");

    getCoursewares();
    if (category === "learn") {
      _getMyAssignments();
    } else if (category === "teach") {
      getAssignmentsByCoursename();
    }
  }, []);

  if (showModal) {
    setModal(false);
    router.push("/deleted");
  }

  if (downloadModal) {
    setDownloadModal(false);
    router.push("/download");
  }

  const uploadModalHook = () => {
    const fakeBtn = {
      borderStyle: "solid",
      borderColor: "rgba(16, 16, 16, 0.41)",
      borderWidth: "1px",
      margin: "30px",
      padding: "20px",
      color: "black",
    };

    return (
      <Modal open={uploadModal}>
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Select a file to submit
          </Typography>
          <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
            <Button
              id="Up-AF"
              sx={fakeBtn}
              onClick={() => {
                let tick = new Date().getTime().toString();
                setContentToAdd(
                  `assignment file ${tick.substring(tick.length - 8)}`
                );
                setUploadModal(false);
              }}
            >
              assignment file
            </Button>
            <Button
              id="Up-CF"
              sx={fakeBtn}
              onClick={() => {
                let tick = new Date().getTime().toString();
                setContentToAdd(
                  `courseware file ${tick.substring(tick.length - 8)}`
                );
                setUploadModal(false);
              }}
            >
              courseware file
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  };

  function getMain(c) {
    if (c === "learn") {
      return (
        <div className={style.block}>
          {uploadModalHook()}
          <Stack sx={{ marginTop: "60px" }}>
            <Stack direction="row">
              {learnTitle.map((item, index) => (
                <div
                  key={index}
                  className={style.secondTitle + " " + style.threeRowBlock}
                >
                  {item}
                </div>
              ))}
            </Stack>
            {learnAssignments.map((item, index) => (
              <Stack direction="row" key={index}>
                <div
                  id="pLearn-Assignment"
                  className={
                    style.threeRowBlock + " " + utilStyle.blueHighlight
                  }
                  onClick={() => {
                    postBlueClick("pLearn-Assignment");
                  }}
                >
                  {item.assignmentName}
                </div>
                <div
                  id="pLearn-VisibleRange"
                  className={
                    style.threeRowBlock + " " + utilStyle.blueHighlight
                  }
                  onClick={() => {
                    postBlueClick("pLearn-VisibleRange");
                  }}
                >
                  {item.visibleRange}
                </div>
                <div className={style.threeRowBlock}>
                  <Button
                    id="D-Delete"
                    sx={{
                      color: "black !important",
                      fontSize: "22px !important",
                    }}
                    onClick={() => {
                      setTimeout(async () => {
                        const _ = await deleteAssignment({
                          assignmentId: item.assignmentId,
                        });
                        if (_.res) {
                          _getMyAssignments();
                        }
                        setModal(true);
                      }, 2000);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    id="DL-Download"
                    sx={{
                      color: "black !important",
                      fontSize: "22px !important",
                    }}
                    download={true}
                    href={`/files/${
                      item.assignmentName.includes("assignment")
                        ? "assignment"
                        : "courseware"
                    }.txt`}
                    onClick={() => {
                      setDownloadModal(true);
                    }}
                  >
                    Download
                  </Button>
                </div>
              </Stack>
            ))}
          </Stack>

          <Stack sx={{ marginTop: "60px" }}>
            <Stack direction="row">
              {coursewareTilte.map((item, index) => (
                <div
                  key={index}
                  className={style.secondTitle + " " + style.twoRowBlock}
                >
                  {item}
                </div>
              ))}
            </Stack>
            {coursewares.map((item, index) => (
              <Stack direction="row" key={index}>
                <div
                  id="pLearn-Courseware"
                  className={style.twoRowBlock + " " + utilStyle.blueHighlight}
                  onClick={() => {
                    postBlueClick("pLearn-Courseware");
                  }}
                >
                  {item.coursewareName}
                </div>
                <Button
                  id="DL-Download"
                  download={true}
                  href={`/files/${
                    item.coursewareName.includes("assignment")
                      ? "assignment"
                      : "courseware"
                  }.txt`}
                  className={style.twoRowBlock}
                  sx={{ color: "black !important" }}
                  onClick={() => {
                    setDownloadModal(true);
                  }}
                >
                  Download
                </Button>
              </Stack>
            ))}
          </Stack>

          <Stack
            direction="row"
            sx={{
              position: "absolute",
              top: "calc(150vh)",
              paddingBottom: "50px",
            }}
          >
            <TextField
              id="Up-input"
              sx={{ width: "600px !important" }}
              value={contentToAdd}
              onChange={(event) => {
                setContentToAdd(event.target.value);
              }}
              onClick={() => {
                setUploadModal(true);
              }}
            ></TextField>
            <Button
              id="Up-Add"
              onClick={async () => {
                const _ = await uploadAssignment({
                  assignmentName: contentToAdd,
                  ownerName: localStorage.getItem("username"),
                  courseName,
                });
                if (_.res) {
                  setContentToAdd("");
                  _getMyAssignments();
                }
              }}
            >
              Add
            </Button>
          </Stack>
        </div>
      );
    } else if (c === "teach") {
      return (
        <div className={style.block}>
          {uploadModalHook()}
          <Modal
            open={showModal}
            onClose={() => {}}
            aria-labelledby="modal-modal-title"
          >
            <Box sx={modalStyle}>
              <Box
                id="R-Yes"
                sx={modalYes}
                onClick={() => {
                  shareMessage(messageToShare);
                  setModal(false);
                }}
              >
                Yes
              </Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you confirm sending a request to share the work?
              </Typography>
            </Box>
          </Modal>
          <Stack sx={{ marginTop: "60px" }}>
            <Stack direction="row">
              {teachTitle.map((item, index) => (
                <div
                  key={index}
                  className={style.secondTitle + " " + style.threeRowBlock}
                >
                  {item}
                </div>
              ))}
            </Stack>
            {courseAssignments.map((item, index) => (
              <Stack direction="row" key={index}>
                <div
                  id="pTeach-Student"
                  className={
                    style.threeRowBlock + " " + utilStyle.blueHighlight
                  }
                  onClick={() => {
                    postBlueClick("pTeach-Student");
                  }}
                >
                  {item.ownerName}
                </div>
                <div
                  id="pTeach-Assignment"
                  className={
                    style.threeRowBlock + " " + utilStyle.blueHighlight
                  }
                  onClick={() => {
                    postBlueClick("pTeach-Assignment");
                  }}
                >
                  {item.assignmentName}
                </div>
                {
                  <div className={style.threeRowBlock}>
                    <Button
                      id="DL-Download"
                      download={true}
                      href={`/files/${
                        item.assignmentName.includes("assignment")
                          ? "assignment"
                          : "courseware"
                      }.txt`}
                      sx={{
                        color: "black !important",
                        fontSize: "22px !important",
                      }}
                      onClick={() => {
                        setDownloadModal(true);
                      }}
                    >
                      Download
                    </Button>
                  </div>
                }
              </Stack>
            ))}
          </Stack>

          <Stack sx={{ marginTop: "60px" }}>
            <Stack direction="row">
              {coursewareTilte.map((item, index) => (
                <div
                  key={index}
                  className={style.secondTitle + " " + style.twoRowBlock}
                >
                  {item}
                </div>
              ))}
            </Stack>
            {coursewares.map((item, index) => (
              <Stack direction="row" key={index}>
                <div
                  id="pTeach-Courseware"
                  className={style.twoRowBlock + " " + utilStyle.blueHighlight}
                  onClick={() => {
                    postBlueClick("pTeach-Courseware");
                  }}
                >
                  {item.coursewareName}
                </div>
                <div className={style.twoRowBlock}>
                  <Button
                    id="DL-Download"
                    sx={{
                      color: "black !important",
                      fontSize: "22px !important",
                    }}
                    download={true}
                    href={`/files/${
                      item.coursewareName.includes("assignment")
                        ? "assignment"
                        : "courseware"
                    }.txt`}
                    onClick={() => {
                      setDownloadModal(true);
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    id="D-Delete"
                    sx={{
                      color: "black !important",
                      fontSize: "22px !important",
                    }}
                    onClick={async () => {
                      const _ = await deleteCourseware({
                        coursewareId: item.coursewareId,
                      });
                      if (_.res) {
                        getCoursewares();
                      }
                      setModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Stack>
            ))}
          </Stack>

          <Stack
            direction="row"
            sx={{
              position: "absolute",
              top: "calc(150vh)",
              paddingBottom: "50px",
            }}
          >
            <TextField
              id="Up-input"
              sx={{ width: "600px !important" }}
              value={contentToAdd}
              onChange={(event) => {
                setContentToAdd(event.target.value);
              }}
              onClick={() => {
                setUploadModal(true);
              }}
            ></TextField>
            <Button
              id="Up-Add"
              onClick={async () => {
                const _ = await uploadCourseware({
                  courseName,
                  coursewareName: contentToAdd,
                });
                if (_.res) {
                  setContentToAdd("");
                  getCoursewares();
                }
              }}
            >
              Add
            </Button>
          </Stack>
        </div>
      );
    }
  }

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
        <div className={style.maintitle}>{courseName}</div>
        {getMain(category)}
      </Box>
    </MainLayout>
  );
}
