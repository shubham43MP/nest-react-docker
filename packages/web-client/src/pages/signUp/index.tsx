import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { FormControl } from "@mui/material";
import { useFormik } from "formik";
import { signUpSchema } from "schema";
import { urls, initialValuesSignup } from "utils/constant";
import CustomTextField from "components/atoms/customTextfield";
import { TGenericBlur } from "utils/types";
import { postRequest } from "requests";

const SignUp = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik<
    typeof initialValuesSignup
  >({
    initialValues: initialValuesSignup,
    validationSchema: signUpSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      //Post request to sever with formData
      postRequest(urls.REGISTER_URL, values);
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
          SignUp
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
            id="email"
            name="email"
            label="Email Address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(values.email && errors.email)}
            helperText={errors.email}
            enableValidation={Boolean(values.email || errors.email)}
          />
          <CustomTextField
            variant="outlined"
            fullWidth={true}
            id="password"
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(values.password && errors.password)}
            helperText={errors.password}
            enableValidation={Boolean(values.password || errors.password)}
          />
          <CustomTextField
            variant="outlined"
            fullWidth={true}
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur as TGenericBlur}
            error={Boolean(values.confirmPassword && errors.confirmPassword)}
            helperText={errors.confirmPassword}
            enableValidation={Boolean(
              values.confirmPassword || errors.confirmPassword
            )}
          />
          <Button
            onClick={() => {
              handleSubmit();
              navigate("/login");
            }}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </FormControl>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link href="/login" variant="body2">
              {"Already have account ? Login"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;
