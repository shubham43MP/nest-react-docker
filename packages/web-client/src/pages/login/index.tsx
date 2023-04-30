import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { loginSchema } from "schema";
import { ACCESS_TOK, initialValuesLogin, urls } from "utils/constant";
import { MyFormData } from "utils/types";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import CustomTextField from "components/atoms/customTextfield";
import { setLocalStorage } from "utils/helpers";
import { postRequest } from "requests";

function Login() {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useFormik<MyFormData>({
      initialValues: initialValuesLogin,
      validationSchema: loginSchema,
      validateOnMount: true,
      onSubmit: async (values) => {
        const result = await postRequest(urls.LOGIN_URL, values);
        const { access_token } = result;
        setLocalStorage(ACCESS_TOK, access_token);
        navigate("/");
      },
    });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log-In
        </Typography>
        <FormControl
          onSubmit={handleSubmit as () => void}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <CustomTextField
            variant="outlined"
            fullWidth={true}
            id="username"
            name="username"
            label="Email Address"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(values.username && errors.username)}
            helperText={errors.username}
            enableValidation={Boolean(values.username || errors.username)}
          />
          <CustomTextField
            variant="outlined"
            fullWidth={true}
            id="password"
            name="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(values.password && errors.password)}
            helperText={errors.password}
            enableValidation={Boolean(values.password || errors.password)}
          />
          <Button
            onClick={handleSubmit as () => void}
            type="submit"
            fullWidth
            variant="contained"
          >
            Log In
          </Button>
        </FormControl>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link href="/login" variant="body2">
              {"Already have account? Login"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;
