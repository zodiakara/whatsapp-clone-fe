import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleButton from "react-google-button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { RegisterUser } from "../types";
import { getTokenAction } from "../redux/actions";
import { AnyAction } from "@reduxjs/toolkit";

const theme = createTheme();

const RegisterPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    interface Token {
        token: String;
    }

    const registerUser = () => {
        return new Promise((resolve, reject) => {
            const registeredUser: RegisterUser = {
                email: email,
                name: username,
                password: password,
            };
            console.log("registered user", registeredUser);
            getTokenAction(registeredUser)
                .then((dispatchObj) => {
                    // dispatch(dispatchObj);
                    // resolve("Dispatched");
                    //navigate user to login page after registration
                    console.log("redirecting to /login 3");
                    navigate("/login");
                })
                .catch((err) => {
                    //there was an error
                    console.log(err);
                    reject(err);
                });
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email && password && username) {
            console.log({
                email,
                password,
                username,
            });
            registerUser();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            marginTop: 2,
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="/assets/epiapp-light.png"
                            style={{
                                height: 30,
                                width: 30,
                            }}
                            alt="epiApp"
                        />
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                    </Box>

                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                m={4}
                                justifyContent="space-around"
                                display="flex"
                                alignItems={"center"}
                            >
                                <div>or:</div>
                                <GoogleButton
                                    type="light" // can be light or dark
                                    onClick={() => {
                                        console.log("Google button clicked");
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default RegisterPage;
