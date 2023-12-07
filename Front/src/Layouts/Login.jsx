import React, { useState, useRef } from 'react';

//@reCAPTCHA---------------------------------------------------------------
import ReCAPTCHA from 'react-google-recaptcha';

//@MUI---------------------------------------------------------------
import { Box, Container, TextField, Button, InputAdornment, useMediaQuery } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
    const [showRegistration, setShowRegistration] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const recaptcha = useRef();

    const toggleRegistration = () => {
        setShowRegistration(!showRegistration);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    async function submitForm(event) {
        const captchaValue = recaptcha.current.getValue();
        
        event.preventDefault();
        if (!captchaValue) {
            alert("Please verify the reCAPTCHA");
        } else {
            alert("Form submission successful!");
            alert(`Password: ${password} | Confirm password: ${confirmPassword}`);
        }
    }

    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <>
            {isMobile ? (
//@Mobile version----------------------------------------------------
                <Container>
                    <Box
                        sx={{
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <h1 style={{
                            marginBottom: showRegistration ? '2rem' : '5rem',
                            fontSize: '2rem'
                        }}>
                            {showRegistration ? 'Inscription' : 'Connexion'}
                        </h1>

                        {showRegistration && (
                            <TextField
                                sx={{
                                    width: '100%',
                                    marginBottom: '1rem',
                                }}
                                label="Adresse-mail"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        <TextField
                            sx={{
                                width: '100%',
                                marginBottom: '1rem',
                            }}
                            label="Nom d'utilisateur"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            sx={{
                                width: '100%',
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
                                            />
                                        ) : (
                                            <VisibilityOffIcon
                                                onClick={togglePasswordVisibility}
                                            />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {showRegistration && (
                        <TextField
                            sx={{
                                width: '100%',
                                marginBottom: '1rem',
                            }}
                            label="Confirmer votre mot de passe"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            type={showConfirmPassword ? 'text' : 'password'}
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
                            sitekey='6LdNNSopAAAAAFWK_Nt9rl3LRwJTvVeHCEX7mt8U'
                            ref={recaptcha}
                            sx= {{
                                marginBottom: '1rem',
                            }}
                        />
                        <Button onClick={submitForm} variant="contained" type="submit" sx={{ width: '20vh' }}>
                            {showRegistration ? "S'enregistrer" : 'Se connecter'}
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
                </Container>
            ) : (
//--------------------------------------------------------------- VERSION PC
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
                        src={"https://source.unsplash.com/random"}
                        alt={"background"}
                        style={{
                            filter: 'brightness(50%)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            width: '100%',
                            maxHeight: '100vh',
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
                                marginBottom: showRegistration ? '2rem' : '5rem',
                                fontSize: '2rem'
                            }}>
                                {showRegistration ? 'Inscription' : 'Connexion'}
                            </h1>

                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {showRegistration && (
                                    <TextField
                                        sx={{
                                            width: '55vh',
                                            marginBottom: '1rem',
                                            justifyContent: 'center',
                                        }}
                                        label="Adresse-mail"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <AccountCircleIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                                <TextField
                                    sx={{
                                        width: '55vh',
                                        marginBottom: '1rem',
                                    }}
                                    label="Nom d'utilisateur"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircleIcon />
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
                                                    />
                                                ) : (
                                                    <VisibilityOffIcon
                                                        onClick={togglePasswordVisibility}
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
                                    sitekey='6LdNNSopAAAAAFWK_Nt9rl3LRwJTvVeHCEX7mt8U'
                                    ref={recaptcha}
                                />
                                <Button onClick={submitForm} variant="contained" type="submit" sx={{ marginTop: '1rem', width: '20vh' }}>
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
            )}
        </>
    )
};    