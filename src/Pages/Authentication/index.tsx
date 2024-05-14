import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box, Grid } from "@mui/material";
import { useMutation } from "react-query";
import { loginApi } from "@Services/Authentications";
import { setAuthToken } from "@Constants/Shared";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import theme from "@Styles/theme";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const mutation = useMutation(() => loginApi(username, password), {
  //   onSuccess: (data) => {
  //     sessionStorage.setItem("token", data.data.accessToken);
  //     sessionStorage.setItem(
  //       "privileges",
  //       JSON.stringify(data.data?.user?.role?.privileges)
  //     );
  //     console.log(data.data.accessToken);
  //     console.log(data.data?.user?.role?.privileges);
  //     setAuthToken(data.data.accessToken);
  //     navigate("/");
  //   },
  // });

  const mutation = useMutation(() => loginApi(username, password), {
    onSuccess: (data) => {
      const { accessToken, user } = data.data;
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("privileges", JSON.stringify(user?.role?.privileges));
      setAuthToken(accessToken); // Set token in Axios config
      navigate("/");
      console.log(data.data.accessToken);
      console.log(data.data?.user?.role?.privileges);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <img
        style={{
          height: "20vh",
          width: "100%",
          position: "fixed",
          marginTop: "-10px",
          marginLeft: "-8px",
        }}
        srcSet={`src/Core/Assets/images/vector.png`}
        loading="lazy"
      />
      {/* <img
        style={{
          height: "100vh",
          width: "100%",
          position: "fixed",
          marginTop: "-8px",
          marginLeft: "-8px",
        }}
        srcSet={`src/Core/Assets/images/image1.jpg`}
        loading="lazy"
      /> */}
      {/* <img
        style={{
          height: "60vh",
          width: "100%",
          position: "fixed",
          marginTop: "285px",
          marginLeft: "-8px",
        }}
        srcSet={`src/Core/Assets/images/image2.jpg`}
        loading="lazy"
      /> */}
      {/* <img
        style={{
          height: "18vh",
          width: "100%",
          position: "fixed",
          marginTop: "-10px",
          marginLeft: "-8px",
        }}
        srcSet={`src/Core/Assets/images/green-frame-copy.png`}
        loading="lazy"
      /> */}
      {/* <img
        style={{
          height: "100vh",
          width: "100%",
          position: "fixed",
          marginTop:"-8px"
        }}
        srcSet={`src/Core/Assets/images/image5.jpg`}
        loading="lazy"
      /> */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Grid style={{ zIndex: 100 }} width={300}>
          
          <div> <img style={{ position:"fixed" , height:"35px", marginTop:"0px" , marginLeft:"250px" }} srcSet={`src/Core/Assets/images/teeth.png`} /> <h2 style={{ direction: "rtl" , marginRight:"70px" , color:theme.palette.primary.main }}>  {t("loginPage.welcome")} </h2></div>
          <form onSubmit={handleSubmit}>
            <TextField
              label={t("loginPage.username")}
              fullWidth
              style={{ direction:"rtl" }}
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              type="password"
              label={t("loginPage.password")}
              style={{direction:"rtl"}}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              {mutation.isLoading ? (
                <CircularProgress style={{ marginLeft: "150px" }} size={24} />
              ) : (
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  style={{backgroundColor:theme.palette.primary.main}}
                >
                  {t("loginPage.login")}
                </Button>
              )}
            </Box>
            {mutation.isError && (
              <div style={{ color: "red", marginTop: "20px" }}>
                Login failed: {mutation.error?.message}
              </div>
            )}
          </form>
        </Grid>
      </Box>
    </div>
  );
};

export default Login;





// import React from 'react';
// import { useFormik } from 'formik';
// import { TextField, Button, CircularProgress } from '@mui/material';
// import { validationSchema } from './validationSchemas';

// interface FormValues {
//   userName: string;
//   email: string;
//   password: string;
//   image: File | null;
// }

// const UserForm: React.FC = () => {
//   const formik = useFormik({
//     initialValues: {
//       userName: '',
//       email: '',
//       password: '',
//       image: null,
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log(values);
//       // Here, handle your form submission logic, such as sending data to a backend
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <TextField
//         fullWidth
//         id="userName"
//         name="userName"
//         label="Username"
//         value={formik.values.userName}
//         onChange={formik.handleChange}
//         error={formik.touched.userName && Boolean(formik.errors.userName)}
//         helperText={formik.touched.userName && formik.errors.userName}
//       />
//       <TextField
//         fullWidth
//         type="email"
//         id="email"
//         name="email"
//         label="Email"
//         value={formik.values.email}
//         onChange={formik.handleChange}
//         error={formik.touched.email && Boolean(formik.errors.email)}
//         helperText={formik.touched.email && formik.errors.email}
//       />
//       <TextField
//         fullWidth
//         type="password"
//         id="password"
//         name="password"
//         label="Password"
//         value={formik.values.password}
//         onChange={formik.handleChange}
//         error={formik.touched.password && Boolean(formik.errors.password)}
//         helperText={formik.touched.password && formik.errors.password}
//       />
//       <input
//         id="image"
//         name="image"
//         type="file"
//         onChange={(event) => {
//           const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
//           formik.setFieldValue("image", file);
//         }}
//       />
//       {formik.isSubmitting ? (
//         <CircularProgress />
//       ) : (
//         <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
//           Submit
//         </Button>
//       )}
//     </form>
//   );
// };

// export default UserForm;
