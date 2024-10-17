import React from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Grid,
  InputAdornment,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import vectorImage from "@Assets/images/Vector.png";
import teeth from "@Assets/images/teeth.png";
import { CacheProvider } from "@emotion/react";
import useStyles from "./Styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLocale } from "@Context/LanguageContext";
import SwitchComponent from "@Components/Switch";
import useAuthenticationContainer from "./Container/useAuthenticationContainer";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { locale } = useLocale();
  const classes = useStyles();

  const {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    cacheRtl,
    togglePasswordVisibility,
    mutation,
    handleSubmit,
  } = useAuthenticationContainer();

  return (
    <>
      <img
        className={classes.imageHeader}
        srcSet={vectorImage}
        loading="lazy"
      />
      <Grid container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Box className={classes.formBox}>
            <Grid>
              <div>
                <Grid
                  container
                  className={classes.paperContainer}
                  justifyContent={
                    locale === "ar" ? "space-between" : "flex-start"
                  }
                  direction={locale === "en" ? "row" : "row-reverse"}
                >
                  <Grid item>
                    <img style={{ height: "29px" }} srcSet={teeth} />
                  </Grid>
                  <Grid item>
                    <h2
                      style={{ textAlign: locale === "ar" ? "right" : "left" }}
                      className={classes.welcomeHeader}
                    >
                      {t("loginPage.welcome")}
                    </h2>
                  </Grid>
                  <Grid item style={{ flexGrow: 1 }} />
                  <Grid item>
                    <SwitchComponent />
                  </Grid>
                </Grid>
              </div>
              <CacheProvider value={cacheRtl}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label={t("loginPage.username")}
                    //autoFocus
                    fullWidth
                    variant="filled"
                    style={{
                      direction: locale === "ar" ? "rtl" : "ltr",
                    }}
                    margin="normal"
                    value={username}
                    color="primary"
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type={showPassword ? "text" : "password"}
                    label={t("loginPage.password")}
                    style={{
                      direction: locale === "ar" ? "rtl" : "ltr",
                    }}
                    fullWidth
                    variant="filled"
                    color="primary"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box mt={2} display="flex" justifyContent="space-between">
                    {mutation.isLoading ? (
                      <Grid container className={classes.loadingContainer}>
                        <CircularProgress size={24} />
                      </Grid>
                    ) : (
                      <Button
                        color="primary"
                        sx={{ color: "white", marginTop: theme.spacing(1) }}
                        fullWidth
                        type="submit"
                        variant="contained"
                      >
                        {t("loginPage.login")}
                      </Button>
                    )}
                  </Box>
                </form>
              </CacheProvider>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
