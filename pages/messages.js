import React, { useEffect, useState } from "react";
import MainLayout from "../components/mainLayout";
import utilStyle from "../styles/util.module.css";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import style from "../styles/messages.module.css";
import {
  postBlueClick,
  getMessages,
  deleteMessage,
  uploadCourseware,
} from "../util";

function getHead() {
  return (
    <div className={style.row}>
      <div className={style.rowFirst + " " + style.rowHead}>Messages</div>
      <div className={style.rowSecond + " " + style.rowHead}>Operations</div>
    </div>
  );
}

export default function Messages() {
  const [msgList, setMsgList] = useState([]);

  const getAllMessages = async () => {
    const _ = await getMessages();
    setMsgList(_.messages);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const handleOperation = async (data, ifAdd = false) => {
    const _ = await deleteMessage({ messageId: data.messageId });
    if (ifAdd) {
      const __ = await uploadCourseware({
        coursewareName: data.assignmentName,
        courseName: data.courseName,
      });
    }
    getAllMessages();
  };

  return (
    <MainLayout>
      <div className={utilStyle.center} style={{ height: "80%" }}>
        <Stack className={style.panel}>
          {getHead()}
          {msgList.map((item) => (
            <div key={item.messageId} className={style.row}>
              <div
                id="pMessages-Message"
                className={style.rowFirst + " " + style.rowContent}
                onClick={() => {
                  postBlueClick("pMessages-Message");
                }}
              >
                {item.message}
              </div>
              <div className={style.rowSecond + " " + style.rowContent}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  sx={{ margin: "10px" }}
                >
                  <Button
                    id="A-Yes"
                    className={style.btn}
                    variant="text"
                    onClick={() => {
                      handleOperation(item, true);
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    id="A-No"
                    className={style.btn}
                    variant="text"
                    onClick={() => {
                      handleOperation(item);
                    }}
                  >
                    No
                  </Button>
                </Stack>
              </div>
            </div>
          ))}
        </Stack>
      </div>
    </MainLayout>
  );
}
