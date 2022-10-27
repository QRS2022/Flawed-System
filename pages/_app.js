import "../styles/globals.css";
import { DataWrapper } from "../context";
import { useEffect } from "react";
import { createClickRecord, postClickRecord } from "../util";
import { useRouter } from "next/router";

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}

const navigationIds = [
  "N-ASSTclassroom",
  "N-Home",
  "N-Signup",
  "N-Login",
  "N-Course",
  "N-Messages",
  "N-Logout",
];

const prefixMap = {
  Up: "Uploader",
  D: "Delete",
  R: "Request",
  DL: "Download",
  J: "Join",
  SRCH: "Search",
  C: "Create",
  L: "Login",
  A: "Accept",
  SGNP: "Signup",
  CC: "CheckCourse",
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let lastOperation;

  const oprationIdPlus = async (operation) => {
    lastOperation = operation;
    const _ = await sessionStorage.setItem(
      "operationId",
      parseInt(sessionStorage.getItem("operationId")) + 1
    );
  };

  useEffect(() => {
    if (router.pathname !== "/admin") {
      // remove all listener first
      let mousedownTimetick = null;
      let keydownTimetick = null;
      let lastKey = null;

      // 第一次，无sessionStorage
      if (!sessionStorage.getItem("enterTick")) {
        sessionStorage.setItem("enterTick", new Date().getTime());
        sessionStorage.setItem("operationId", 1);
        const firstRecord = async () => {
          const firstRecordOperationId = `FirstEnter-${sessionStorage.getItem(
            "enterTick"
          )}-${"0".padStart(8, "0")}`;
          let record = createClickRecord(
            firstRecordOperationId,
            "First Enter",
            "None",
            "None",
            0,
            0
          );
          postClickRecord(record);
        };
        firstRecord();
      }

      const getFormatRecord = (widget, startTime, duration) => {
        let page = localStorage.getItem("currentPage")
          ? localStorage.getItem("currentPage")
          : "ASST";
        let module = "None";
        if (navigationIds.indexOf(widget) >= 0) {
          if (widget === "N-ASSTclassroom" || widget === "N-Home") {
            module = "Home";
          } else {
            module = widget.split("-").join("");
          }
        } else {
          let _m = prefixMap[widget.split("-")[0]];
          if (_m) {
            module = _m;
          }
        }
        let username = localStorage.getItem("username");
        return createClickRecord(
          `${username ? username : "NotLogin"}-${sessionStorage.getItem(
            "enterTick"
          )}-${sessionStorage
            .getItem("operationId")
            .toString()
            .padStart(8, "0")}`,
          page,
          module,
          widget,
          startTime,
          duration
        );
      };

      window.addEventListener("popstate", async () => {
        const curUrl = document.location.href;
        const curId = sessionStorage.getItem("curId");
        await new Promise((r) => {
          setTimeout(() => {
            r();
          }, 0);
        });
        let arr = JSON.parse(sessionStorage.getItem("urlStack"));
        arr.pop(); // 不记录backward和forward到的网页
        sessionStorage.setItem("urlStack", JSON.stringify(arr));
        await new Promise((r) => {
          setTimeout(() => {
            r();
          }, 0);
        });
        arr = JSON.parse(sessionStorage.getItem("urlStack"));
        const reversedArr = [...arr].reverse();
        const id = reversedArr.find((item) => item.url === curUrl).id;
        if (curId > id) {
          console.log("Backward");
          let startTime =
            new Date().getTime() -
            parseInt(sessionStorage.getItem("enterTick"));
          let duration = randomNum(30, 60);
          let record = getFormatRecord("Backward", startTime, duration);
          postClickRecord(record, async () => {
            const _ = await oprationIdPlus("Backward");
          });
        } else {
          console.log("Forward");
          let startTime =
            new Date().getTime() -
            parseInt(sessionStorage.getItem("enterTick"));
          let duration = randomNum(30, 60);
          let record = getFormatRecord("Forward", startTime, duration);
          postClickRecord(record, async () => {
            const _ = await oprationIdPlus("Forward");
          });
        }
        sessionStorage.setItem("curId", id);
      });

      let firstPress = true;
      window.addEventListener("keydown", (event) => {
        if (firstPress) {
          lastKey = event.code;
          keydownTimetick = new Date().getTime();
          firstPress = false;
        }
      });

      window.addEventListener("keyup", (event) => {
        lastOperation = "keyup";
      });

      window.addEventListener("wheel", (event) => {
        if (lastOperation !== "scroll") {
          let startTime =
            new Date().getTime() -
            parseInt(sessionStorage.getItem("enterTick"));
          let record = getFormatRecord("Scroll", startTime, randomNum(60, 120));
          postClickRecord(record, async () => {
            const _ = await oprationIdPlus("scroll");
          });
        }
      });

      const findRightComponentId = (event) => {
        return event.target.id;
      };

      let mouseWidget;
      window.addEventListener("mousedown", (event) => {
        // 结束键盘事件
        if (lastOperation === "keyup") {
          let startTime =
            keydownTimetick - parseInt(sessionStorage.getItem("enterTick"));
          let duration = new Date().getTime() - keydownTimetick;
          let record = getFormatRecord("Keypress", startTime, duration);
          postClickRecord(record, async () => {
            const _ = await oprationIdPlus("keyup");
            lastKey = null;
          });
          firstPress = true;
        }
        mousedownTimetick = new Date().getTime();
        const widgetId = findRightComponentId(event);
        mouseWidget = widgetId
          ? widgetId
          : `Blank(${event.clientX}, ${event.clientY})`;
      });

      window.addEventListener("mouseup", (event) => {
        let startTime =
          mousedownTimetick - parseInt(sessionStorage.getItem("enterTick"));
        let duration = new Date().getTime() - mousedownTimetick;
        let record = getFormatRecord(mouseWidget, startTime, duration);
        postClickRecord(record, async () => {
          const _ = await oprationIdPlus("mouseup");
        });
      });
    }
  }, []);

  return (
    <DataWrapper>
      <Component {...pageProps} />
    </DataWrapper>
  );
}

export default MyApp;
