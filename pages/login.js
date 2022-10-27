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
import { postBlueClick, postLogin } from "../util";
import { useRouter } from "next/router";
import urlMonitor from "../utils/urlMonitor";
import React from "react";

const fontColor = "rgba(16,16,16,0.7)";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    urlMonitor();
  }, []);

  return (
    <MainLayout useBackground={true}>
      <div className={utilStyle.center} style={{ height: "80%" }}>
        <div>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ margin: "20px" }}
            alignItems="center"
          >
            <Typography variant="h5" component="div" sx={{ color: fontColor }}>
              Username
            </Typography>
            <TextField
              required
              id="L-Username"
              label="Username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              sx={{ width: "30ch" }}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ margin: "20px 20px 180px 20px" }}
            alignItems="center"
          >
            <Typography variant="h5" component="div" sx={{ color: fontColor }}>
              Password
            </Typography>
            <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="L-Password"
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
          <div
            id="pL-Submit"
            onClick={(event) => {
              if (event.target.id !== "L-Submit") {
                postBlueClick("pL-Submit");
              }
            }}
            className={utilStyle.onlyTextBackground}
          >
            <Button
              id="L-Submit"
              className={utilStyle.onlyTextButton}
              variant="text"
              size="large"
              onClick={async (event) => {
                const token = await postLogin({
                  username,
                  password: values.password,
                });
                if (token) {
                  localStorage.setItem("username", username);
                  localStorage.setItem("token", token);
                  router.push("/");
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
