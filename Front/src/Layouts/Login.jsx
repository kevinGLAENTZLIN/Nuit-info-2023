import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

//@reCAPTCHA---------------------------------------------------------------
import ReCAPTCHA from 'react-google-recaptcha';

//@MUI---------------------------------------------------------------
import { Box, Container, TextField, Button, InputAdornment } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { setLocalStorage } from '../Request/Auth';

export default function Login() {
    const [showRegistration, setShowRegistration] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [textInfo, setTextInfo] = useState("");
    const [textInfoColor, setTextInfoColor] = useState("red");
    const recaptcha = useRef();
    const recaptcha_key = process.env.REACT_APP_RECAPTCHA_KEY_PUBLIC;
    const navigate = useNavigate();

    const toggleRegistration = () => {
        setShowRegistration(!showRegistration);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTextInfo("");
        recaptcha.current.reset();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    function check_input(captchaValue) {
        if (!captchaValue) {
            setTextInfo("Veuillez vérifier le captcha");
            return false;
        }
        if (email === "" || email === null) {
            setTextInfo("Veuillez préciser votre adresse mail");
            return false;
        }
        if (password === "" || password === null) {
            setTextInfo("Aucun mot de passe n'a été indiqué");
            return false;
        }
        if (showRegistration) {
            if (confirmPassword === "" || confirmPassword === null) {
                setTextInfo("Veuillez vérifier votre mot de passe");
                return false;
            }
            if (password !== confirmPassword) {
                setTextInfo("Vos mots de passe ne sont pas identiques");
                return false;
            }
        }
        return true;
    };

    async function login(event) {
        const captchaValue = recaptcha.current.getValue();

        event.preventDefault();

        if (check_input(captchaValue) === false) {
            recaptcha.current.reset();
            return;
        }
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: email.toLowerCase(),
                password: password,
                captcha: captchaValue,
            }),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (res.status === 400 || res.status === 500) {
            const error = await res.json();
            console.error("Error:", error);
            setTextInfoColor("red");
            setTextInfo(error.msg);
        } else if (res.status === 201) {
            const data = await res.json();
            setLocalStorage("bearerToken", data.token);
            setLocalStorage("user", data.id);
            navigate("/quiz");
        } else {
            setTextInfoColor("red");
            setTextInfo("Impossible de se connecter au serveur, veuillez réessayer ultérieurement");
            throw new Error("Unexpected response from server");
        }
        recaptcha.current.reset();
    };

    async function register(event) {
        const captchaValue = recaptcha.current.getValue();

        event.preventDefault();
        if (check_input(captchaValue) === false) {
            recaptcha.current.reset();
            return;
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    captcha: captchaValue,
                }),
                headers: {
                    'content-type': 'application/json',
                },
            });

            if (res.status === 400 || res.status === 500) {
                const error = await res.json();
                console.error("Error:", error);
                setTextInfoColor("red");
                setTextInfo(error.msg);
            } else if (res.status === 201) {
                const data = await res.json();
                setTextInfoColor("green");
                setTextInfo(data.msg);
            } else {
                setTextInfoColor("red");
                setTextInfo("Impossible de se connecter au serveur, veuillez réessayer ultérieurement");
                throw new Error("Unexpected response from server");
            }
        } catch (err) {
            console.error(err);
        }
        recaptcha.current.reset();
    }

    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    position: 'relative',
                }}
            >
                <img
                    src={"https://www.demotivateur.fr/images-buzz/cover/818715164636e64629d5f6_beaux-gifs-animy-s-de-noy-l.jpg"}
                    alt={"background"}
                    style={{
                        filter: 'brightness(50%)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: '100%',
                        height: '100vh',
                        objectFit: 'cover',
                        position: 'absolute',
                        objectPosition: 'center',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: -1,
                    }}
                />
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            height: '60vh',
                            width: '60vh',
                            backgroundColor: 'white',
                            borderRadius: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <h1 style={{
                            marginBottom: '1rem',
                            fontSize: '3rem'
                        }}>
                            {showRegistration ? 'Inscription' : 'Connexion'}
                        </h1>
                        <h3 style={{ color: textInfoColor }}>
                            {textInfo}
                        </h3>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TextField
                                sx={{
                                    width: '55vh',
                                    marginBottom: '1rem',
                                }}
                                type='email'
                                label="Adresse mail"
                                value={email}
                                onChange={handleEmail}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                sx={{
                                    width: '55vh',
                                    marginBottom: '1rem',
                                }}
                                label="Mot de passe"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {showPassword ? (
                                                <VisibilityIcon
                                                    onClick={togglePasswordVisibility}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ) : (
                                                <VisibilityOffIcon
                                                    onClick={togglePasswordVisibility}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {showRegistration && (
                                <TextField
                                    sx={{
                                        width: '55vh',
                                        marginBottom: '1rem',
                                    }}
                                    label="Confirmer votre mot de passe"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {showConfirmPassword ? (
                                                    <VisibilityIcon
                                                        onClick={toggleConfirmPasswordVisibility}
                                                    />
                                                ) : (
                                                    <VisibilityOffIcon
                                                        onClick={toggleConfirmPasswordVisibility}
                                                    />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                            <ReCAPTCHA
                                sitekey={recaptcha_key}
                                ref={recaptcha}
                            />
                            <Button onClick={showRegistration ? register : login} variant="contained" type="submit" sx={{ marginTop: '1rem', width: '20vh' }}>
                                {showRegistration ? 'S\'enregistrer' : 'Se connecter'}
                            </Button>
                            <Button
                                variant="text"
                                sx={{ marginTop: '1rem' }}
                                onClick={toggleRegistration}
                            >
                                {showRegistration
                                    ? 'Retour à la connexion'
                                    : 'Pas encore membre ? Inscrivez-vous ici'}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}