export default function urlMonitor() {
  const url = document.location.href;
  if (sessionStorage.getItem("urlStack")) {
    const arr = JSON.parse(sessionStorage.getItem("urlStack"));
    const id = arr[arr.length - 1].id + 1;
    arr.push({ url, id });
    sessionStorage.setItem("urlStack", JSON.stringify(arr));
    sessionStorage.setItem("curId", id);
  } else {
    //  第一次
    sessionStorage.setItem("urlStack", JSON.stringify([{ url, id: 0 }]));
    sessionStorage.setItem("curId", 0);
  }
  console.log(JSON.parse(sessionStorage.getItem("urlStack")));
}
