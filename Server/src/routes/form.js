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
            title: "Combien de kilomètres avez-vous parcourus en voiture cette semaine ?",
            type: "number",
            unit: "km",
            isRequired: true,
            placeHolder: "0"
        },
        {
            title: "Avez-vous utilisé des transports en commun ? Si oui, lesquels ?",
            type: "checkbox",
            isRequired: true,
            choices: [ "Train", "Avion", "Bus", "Métro", "Tramway", "RER", "Autre" ]
        },
        {
            title: "Avez-vous marché ou utilisé un vélo au lieu de prendre la voiture ?",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ]
        },
        {
            title: "Avez-vous fait du covoiturage ou utilisé des services de partage de voiture ?",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ]
        },
        {
            title: "Avez-vous toujours éteint les lumières en quittant une pièce ?",
            type: "radio",
            isRequired: true,
            choices: [ "Jamais", "Parfois", "Souvent", "Toujours" ]
        },
        {
            title: "Avez-vous utilisé des appareils énergivores (climatisation, chauffage, etc.) de manière excessive ?",
            type: "radio",
            isRequired: true,
            choices: [ "Jamais", "Parfois", "Souvent", "Toujours" ]
        },
        {
            title: "Avez-vous favorisé des produits locaux et de saison dans votre alimentation ?",
            type: "radio",
            isRequired: true,
            choices: [ "A chaque repas", "De temps en temps", "Jamais" ]
        },
        {
            title: "Avez-vous privilégié les protéines végétales ou d'autres alternatives à la viande ?",
            type: "radio",
            isRequired: true,
            choices: [ "A chaque repas", "De temps en temps", "Jamais" ]
        },
        {
            title: "Buvez-vous de l'eau en bouteille plastique ou utilisez-vous l'eau du robinet ?",
            type: "radio",
            isRequired: true,
            choices: [ "Bouteille plastique", "Eau du robinet" ]
        },
        {
            title: "Avez-vous effectué des achats zéro déchet ?",
            type: "radio",
            isRequired: true,
            choices: [ "J'ai acheté des produits en vrac", "J'ai acheté des produits sans emballage", "J'ai acheté des produits avec emballage" ]
        },
        {
            title: "Dans combien de m2 vivez-vous ?",
            type: "number",
            unit: "m2",
            isRequired: true,
            placeHolder: "0"
        },
        {
            title: "Combien de personnes vivent dans votre logement ?",
            type: "number",
            unit: "personnes",
            isRequired: true,
            placeHolder: "0"
        },
        {
            title: "Avez-vous utilisé la climatisation cette semaine ?",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ]
        },
        {
            title: "Avez-vous acheté des vêtements neufs cette semaine ?",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ]
        },
        {
            title: "En moyenne, combien d'heures passez-vous sur internet par jour ?",
            type: "range",
            min: 0,
            max: 24,
            step: 1,
            unit: "h",
            isRequired: true
        },
        {
            title: "En moyenne, combien de cigarettes fumez-vous par jour ?",
            type: "number",
            unit: "cigarettes",
            isRequired: true,
            placeHolder: "0"
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
