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
} from '@mui/material';

export default function Quiz() {
    const [activeStep, setActiveStep] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Ouvrir la popup automatiquement lorsqu'un utilisateur se connecte
        setOpenDialog(true);
    }, []); // Le tableau vide en tant que deuxième argument assure que cela se produit seulement au montage initial

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            setQuizCompleted(true);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleFinish = () => {
        navigate('/home');
    };

    const steps = [
        'Pollution de l\'eau',
        'Transport utilisé',
        'Consommation d\'énergie',
        'Gestion des déchets',
        'Consommation responsable',
    ];

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return 'Avez-vous pris des mesures pour réduire la pollution de l\'eau aujourd\'hui ?';
            case 1:
                return 'Avez-vous utilisé la voiture aujourd\'hui ?';
            case 2:
                return 'Avez-vous fait des efforts pour réduire votre consommation d\'énergie ?';
            case 3:
                return 'Comment gérez-vous vos déchets de manière écologique ?';
            case 4:
                return 'Adoptez-vous des habitudes de consommation responsable ?';
            default:
                return 'Contenu par défaut';
        }
    };

    return (
        <Container>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{steps[activeStep]}</DialogTitle>
                <DialogContent style={{ marginBottom: '20px' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {quizCompleted ? (
                        <Typography style={{ marginTop: '20px' }}>Quiz terminé !</Typography>
                    ) : (
                        <div>
                            <Typography style={{ marginTop: '20px' }}>
                                {getStepContent(activeStep)}
                            </Typography>
                            {!quizCompleted && (
                                <TextField label="Votre réponse" fullWidth style={{ marginTop: '10px' }} />
                            )}
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
            </Dialog>
        </Container>
    );
}
