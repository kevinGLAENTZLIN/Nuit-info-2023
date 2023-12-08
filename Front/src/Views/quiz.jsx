import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Checkbox,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    Select,
    MenuItem,
    Slider,
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import { getLocalStorage } from '../Request/Auth';

function InputType({ elem, answer, setAnswer }) {
    const [sliderValue, setSliderValue] = useState(0);

    switch (elem.type) {
        case 'text':
            return (
                <TextField
                    label={elem.placeHolder}
                    fullWidth
                    style={{ marginTop: '10px' }}
                    onChange={(event) => setAnswer({ ...answer, [elem.title]: event.target.value })}
                />
            );
        case 'checkbox':
            return (
                <FormControl component="fieldset">
                    <FormLabel component="legend">{elem.label}</FormLabel>
                    {elem.choices.map((choice, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox
                                onClick={() => {
                                    if (answer && answer[elem.title] && answer[elem.title].includes(choice))
                                        setAnswer({ ...answer, [elem.title]: answer[elem.title].filter((e) => e !== choice) });
                                    else if (answer && answer[elem.title])
                                        setAnswer({ ...answer, [elem.title]: [...answer[elem.title], choice] });
                                    else
                                        setAnswer({ ...answer, [elem.title]: [choice] });
                                }} />}
                            label={choice}
                        />
                    ))}
                </FormControl>
            );
        case 'radio':
            return (
                <FormControl component="fieldset">
                    <FormLabel component="legend">{elem.label}</FormLabel>
                    <RadioGroup>
                        {elem.choices.map((choice, index) => (
                            <FormControlLabel
                                key={index}
                                value={choice}
                                control={<Radio onClick={() => setAnswer({ ...answer, [elem.title]: choice })} />}
                                label={choice}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
        case 'number':
            return (
                <TextField
                    type="number"
                    label={elem.placeHolder}
                    fullWidth
                    style={{ marginTop: '10px' }}
                    onChange={(event) => setAnswer({ ...answer, [elem.title]: event.target.value })}
                />
            );
        case 'range':
            return (
                <div>
                    <Typography id="slider-value">{sliderValue}</Typography>
                    <Slider
                        value={sliderValue}
                        min={elem.min}
                        max={elem.max}
                        onChange={(event, newValue) => {
                            setSliderValue(newValue);
                            setAnswer({ ...answer, [elem.title]: newValue });
                        }}
                        aria-labelledby="slider-value"
                    />
                </div>
            );
        case 'dropdown':
            return (
                <FormControl fullWidth style={{ marginTop: '10px' }}>
                    <Select
                        value={answer ? (answer[elem.title] ?? '') : ''}
                        onChange={(event) => setAnswer({ ...answer, [elem.title]: event.target.value })}
                    >
                        {elem.choices.map((choice, index) => (
                            <MenuItem key={index} value={choice}>
                                {choice}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        default:
            return null;
    }
}

export default function Quiz() {
    const [activeStep, setActiveStep] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizContent, setQuizContent] = useState(null);
    const [answer, setAnswer] = useState(null);
    const bearerToken = getLocalStorage('bearerToken');
    const navigate = useNavigate();

    useEffect(() => {
        setOpenDialog(true);

        axios.get('http://127.0.0.1:3009/form/daily',
            { headers: { Authorization: `Bearer ${bearerToken}` } }
        ).then((res) => {
            setQuizContent(res.data);
            for (let i = 0; i < res.data.elements.length; i++) {
                setAnswer(a => ({ ...a, [res.data.elements[i].title]: null }));
            }
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    const handleNext = () => {
        if (activeStep === quizContent.elements.length - 1) {
            setQuizCompleted(true);
        } else {
            setActiveStep((prevActiveStep) => {
                setAnswer({ ...answer, [quizContent.elements[prevActiveStep + 1].title]: null });
                return prevActiveStep + 1
            });
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleFinish = () => {
        console.log(answer);
        axios.post('http://127.0.0.1:3009/user/data',
            { data: answer },
            { headers: { Authorization: `Bearer ${bearerToken}` }, }
        ).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        });

        navigate('/home');
    };

    return (
        <Container>
            {quizContent ?
                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>{quizContent.title}</DialogTitle>
                    <DialogContent style={{ marginBottom: '20px' }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {quizContent.elements.map((elem) => (
                                <Step key={elem.title}>
                                    <StepLabel>{elem.title}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {quizCompleted ? (
                            <Typography style={{ marginTop: '20px' }}>Quiz terminé !</Typography>
                        ) : (
                            <div>
                                <Typography style={{ marginTop: '20px' }}>
                                    {quizContent.elements[activeStep].description}
                                </Typography>
                                {!quizCompleted && <InputType elem={quizContent.elements[activeStep]} answer={answer} setAnswer={setAnswer} />}
                            </div>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Retour
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={quizCompleted ? handleFinish : handleNext}
                        >
                            {quizCompleted ? 'Terminer' : 'Suivant'}
                        </Button>
                        <Button onClick={handleDialogClose}>Fermer</Button>
                    </DialogActions>
                </Dialog> : <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-20px', marginLeft: '-20px' }} />}
        </Container>
    );
}
