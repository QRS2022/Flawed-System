import MainLayout from "../components/mainLayout";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Button } from "@mui/material";
import utilStyle from "../styles/util.module.css";
import { postBlueClick, postNewUser, postLogin } from "../util";
import { useRouter } from "next/router";
import urlMonitor from "../utils/urlMonitor";
import React from "react";

const fontColor = "rgba(16,16,16,0.7)";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    confirmPassword: "",
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    urlMonitor();
  }, []);

  return (
    <MainLayout>
      <div className={utilStyle.center} style={{ height: "80%" }}>
        <div>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ margin: "20px" }}
            alignItems="center"
          >
            <Typography variant="h6" component="div" sx={{ color: fontColor }}>
              Username
            </Typography>
            <TextField
              required
              id="SGNP-Username"
              label="Username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value + "");
              }}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ margin: "20px" }}
            alignItems="center"
          >
            <Typography variant="h6" component="div" sx={{ color: fontColor }}>
              Password
            </Typography>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="SGNP-Password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ margin: "20px" }}
            alignItems="center"
          >
            <Typography variant="h6" component="div" sx={{ color: fontColor }}>
              Comfirm Password
            </Typography>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Comfirm Password
              </InputLabel>
              <OutlinedInput
                id="SGNP-CPassword"
                type={values.showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ margin: "20px 20px 150px 20px" }}
            alignItems="center"
          >
            <Typography variant="h6" component="div" sx={{ color: fontColor }}>
              Email
            </Typography>
            <TextField
              required
              id="SGNP-Email"
              label="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value + "");
              }}
            />
          </Stack>
          <div
            id="pSGNP-Submit"
            onClick={(event) => {
              if (event.target.id !== "SGNP-Submit") {
                postBlueClick("pSGNP-Submit");
              }
            }}
            className={utilStyle.onlyTextBackground}
          >
            <Button
              id="SGNP-Submit"
              className={utilStyle.onlyTextButton}
              variant="text"
              size="large"
              onClick={async () => {
                const emailRegex = new RegExp(
                  "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
                );
                // 验证用户名
                if (!username) {
                  alert("Invalid Username");
                  setValues({
                    password: "",
                    confirmPassword: "",
                  });
                  setUsername("");
                  setEmail("");
                }
                // 密码长度不够
                else if (values.password.length <= 6) {
                  alert(
                    "The length of the password must be longer than six characters"
                  );
                  setValues({
                    password: "",
                    confirmPassword: "",
                  });
                  setUsername("");
                  setEmail("");
                } else if (values.password !== values.confirmPassword) {
                  // 两次密码不同
                  alert("Password confirmation failed");
                  setValues({
                    password: "",
                    confirmPassword: "",
                  });
                  setUsername("");
                  setEmail("");
                  // 邮箱不合法
                } else if (!emailRegex.test(email)) {
                  alert("Invalid E-mail address!");
                  setValues({
                    password: "",
                    confirmPassword: "",
                  });
                  setUsername("");
                  setEmail("");
                } else {
                  let res = await postNewUser(
                    {
                      username,
                      password: values.password,
                      email: email,
                    },
                    async () => {
                      const token = await postLogin({
                        username,
                        password: values.password,
                      });
                      if (token) {
                        localStorage.setItem("username", username);
                        localStorage.setItem("token", token);
                        router.push("/");
                      }
                    }
                  );
                  if (res === 403) {
                    setValues({
                      password: "",
                      confirmPassword: "",
                    });
                    setUsername("");
                    setEmail("");
                  }
                }
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
