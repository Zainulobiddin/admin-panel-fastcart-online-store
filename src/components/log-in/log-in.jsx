import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Wellcome from "../wellcome/wellcome";
import { useAuthAdmin } from "@/store/auth/auth";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const { postLogInAdmin } = useAuthAdmin();

  const [name, setUsername] = useState("");
  const [parol, setPassword] = useState("");
  const [error, setError] = useState('')

  const navigate = useNavigate();

 async function handleLogIn() {

  let newAdmin = {
    userName: name, 
    password: parol
  }
   const resultPostLogInAdmin =  await postLogInAdmin(newAdmin);
   console.log('resultPostLogInAdmin = ', resultPostLogInAdmin)
   if (resultPostLogInAdmin?.statusCode == 200) {
     navigate('/')
   } else {
    setError(resultPostLogInAdmin.message)
   }

  }

  return (
    <div className="flex">
      <Wellcome />

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "35ch" } }}
        noValidate
        autoComplete="off"
        className="flex flex-col gap-5 w-[50%] h-[100vh] items-center justify-center  "
      >
        <div className="text-center">
          <Typography
            variant="h4"
            className="inter text-[24px] leading-[32px] text-[#111927] font-bold text-start "
          >
            Log in
          </Typography>
        </div>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={({target}) => setUsername(target.value)}
        />
        <TextField
          id="outlined-password"
          label="Password"
          variant="outlined"
          value={parol}
          onChange={({target}) => setPassword(target.value)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <span>{error}</span>
        <Box className="flex flex-col gap-2">
          <Button>Forgot password?</Button>
          <Button variant="contained" onClick={handleLogIn}>
            Log in
          </Button>
        </Box>
      </Box>
    </div>
  );
}
