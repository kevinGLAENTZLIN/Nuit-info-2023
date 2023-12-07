import express from "express";
import { verifyToken } from "../global.js";

const router = express.Router();

const test = {
    title: "Test",
    elements: [
        {
            title: "Question 1",
            type: "text",
            isRequired: true,
            placeHolder: "0kg"
        },
        {
            title: "Question 2",
            type: "number",
            unit: "kg",
            isRequired: true,
            placeHolder: "0"
        },
        {
            title: "Question 3",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ]
        },
        {
            title: "Question 4",
            type: "checkbox",
            isRequired: true,
            choices: [ "Train", "Avion" ]
        },
        {
            title: "Question 5",
            type: "dropdown",
            isRequired: true,
            choices: [ "Oui", "Non" ]
        },
        {
            title: "Question 6",
            type: "range",
            min: 0,
            max: 10,
            step: 1,
            unit: "kg",
            isRequired: true
        }
    ]
}

const daily = {
    title: "Votre empreinte carbone du jour",
    elements: [
        {
            title: "Pollution de l'eau",
            description: "Avez-vous pris des mesures pour réduire la pollution de l'eau aujourd'hui ?",
            type: "text",
            isRequired: true,
            placeHolder: "0kg"
        },
        {
            title: "Transport utilisé",
            description: "Quel moyen de transport avez-vous utilisé aujourd'hui ?",
            type: "checkbox",
            isRequired: true,
            choices: [ "Train", "Avion", "Voiture", "Bus", "Moto", "Vélo", "Marche" ]
        },
        {
            title: "Consommation d'énergie",
            description: "Avez-vous fait des efforts pour réduire votre consommation d'énergie ?",
            type: "number",
            unit: "kWh",
            isRequired: true,
            placeHolder: "0"
        },
        {
            title: "Gestion des déchets",
            description: "Comment gérez-vous vos déchets de manière écologique ?",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ]
        },
        {
            title: "Consommation responsable",
            description: "Adoptez-vous des habitudes de consommation responsable ?",
            type: "dropdown",
            isRequired: true,
            choices: [ "Oui", "Non" ]
        },
        {
            title: "Consommation de viande",
            description: "Combien de viande avez-vous consommé aujourd'hui ?",
            type: "range",
            min: 0,
            max: 1000,
            step: 1,
            unit: "g",
            isRequired: true
        }
    ]
}

router.get("/test", verifyToken, (req, res) => {
    res.json(test);
});

router.get("/daily", verifyToken, (req, res) => {
    res.json(daily);
});

export default router;
