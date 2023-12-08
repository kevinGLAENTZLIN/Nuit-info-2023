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

export const daily = {
    title: "Votre empreinte carbone du jour",
    elements: [
        {
            name: "kilometers_car",
            title: "Combien de kilomètres avez-vous parcourus en voiture cette semaine ?",
            type: "number",
            unit: "km",
            isRequired: true,
            placeHolder: "0",
            weight: 1,
            sources: [
                { title: 'L\'utilisation fréquente de la voiture: quels impacts ?', url: 'https://www.senat.fr/rap/r01-113/r01-1132.html' },
            ]
        },
        {
            name: "public_transport",
            title: "Avez-vous utilisé des transports en commun ? Si oui, lesquels ?",
            type: "checkbox",
            isRequired: true,
            choices: [ "Train", "Avion", "Bus", "Métro", "Tramway", "RER", "Autre" ],
            weight: [ 20, 100, 30, 15, 10, 20, 50 ],
            sources: [
                { title: 'L\'utilisation fréquente des transports en commun: quels impacts ?', url: 'https://www.carbono.eco/blog/post/avantages-des-transports-en-commun-pour-l-environnement' },
            ]
        },
        {
            name: "bike_walk",
            title: "Avez-vous marché ou utilisé un vélo au lieu de prendre la voiture ?",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ],
            weight: [ -10, 10 ],
            sources: [
                { title: 'La marche ou le vélo: quels impacts ?', url: 'https://projetseen.fr/transport/velo-impact-environnemental-et-evolution-des-habitudes-de-transport/#:~:text=L\'impact%20environnemental%20du%20v%C3%A9lo&text=M%C3%AAme%20si%20l\'on%20prend,CO2%20par%20km%20parcouru.&text=Pour%20cette%20m%C3%AAme%20distance%2C%20l,grammes%20eqCO2%20par%20passager.' },
            ]
        },
        {
            name: "carpooling",
            title: "Avez-vous fait du covoiturage ou utilisé des services de partage de voiture ?",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ],
            weight: [ -10, 10 ],
            sources: [
                { title: 'Le covoiturage: quels impacts ?', url: 'https://transportsdufutur.ademe.fr/2017/02/environnemental-covoiturage-distance.html' },
            ]
        },
        {
            name: "turn_off_lights",
            title: "Avez-vous toujours éteint les lumières en quittant une pièce ?",
            type: "radio",
            isRequired: true,
            choices: [ "Jamais", "Parfois", "Souvent", "Toujours" ],
            weight: [ 50, 30, 10, 0 ],
            sources: [
                { title: 'Eteindre la lumière: quels impacts ?', url: 'https://www.lfb.es/portfolio_page/ecologie-eteindre-les-lumieres/' },
            ]
        },
        {
            name: "excessive_use_of_devices",
            title: "Avez-vous utilisé des appareils énergivores (climatisation, chauffage, etc.) de manière excessive ?",
            type: "radio",
            isRequired: true,
            choices: [ "Jamais", "Parfois", "Souvent", "Toujours" ],
            weight: [ 0, 10, 30, 50 ],
            sources: [
                { title: 'L\'utilisation d\'appareils énergivores: quels impacts ? ', url: 'https://greenkit.fr/limpact-environnemental-de-lelectromenager/' },
            ]
        },
        {
            name: "local_and_seasonal_food",
            title: "Avez-vous favorisé des produits locaux et de saison dans votre alimentation ?",
            type: "radio",
            isRequired: true,
            choices: [ "A chaque repas", "De temps en temps", "Jamais" ],
            weight: [ -30, -10, 10 ],
            sources: [
                { title: 'L\'achat de produist locaux: quels impacts ?', url: 'https://reseauactionclimat.org/manger-local-permet-il-de-reduire-les-impacts-environnementaux-de-son-alimentation/' },
            ]
        },
        {
            name: "plant_protein_instead_of_meat",
            title: "Avez-vous privilégié les protéines végétales ou d'autres alternatives à la viande ?",
            type: "radio",
            isRequired: true,
            choices: [ "A chaque repas", "De temps en temps", "Jamais" ],
            weight: [ -30, 0, 50 ],
            sources: [
                { title: 'La consommation de produits végétaux: quels impacts ? ', url: 'https://lesceptique.ca/2015/12/01/viande-et-vegetaux/' },
            ]
        },
        {
            name: "water_bottle_or_tap_water",
            title: "Buvez-vous de l'eau en bouteille plastique ou utilisez-vous l'eau du robinet ?",
            type: "radio",
            isRequired: true,
            choices: [ "Bouteille plastique", "Eau du robinet" ],
            weight: [ 20, 0 ],
            sources: [
                { title: 'La consommation d\'eau en bouteille plastique: quels impacts ?', url: 'https://lavie.bio/quels-sont-les-impacts-environnementaux-des-bouteilles-deau-en-plastique-et-comment-les-eviter/#' },
            ]
        },
        {
            name: "zero_waste_purchases",
            title: "Avez-vous effectué des achats zéro déchet ?",
            type: "radio",
            isRequired: true,
            choices: [ "J'ai acheté des produits en vrac", "J'ai acheté des produits sans emballage", "J'ai acheté des produits avec emballage" ],
            weight: [ 0, 0, 5 ],
            sources: [
                { title: 'Les achats "zéro déchet": quels impacts ?', url: 'https://www.ecoconso.be/fr/content/zero-dechet-le-reutilisable-est-il-toujours-plus-ecologique' },
            ]
        },
        {
            name: "area_of_living",
            title: "Dans combien de m2 vivez-vous ?",
            type: "number",
            unit: "m2",
            isRequired: true,
            placeHolder: "0",
            weight: 1,
            sources: [
                { title: 'La taille du logement: quels impacts ?', url: 'https://www.notre-environnement.gouv.fr/themes/amenagement/article/le-logement' },
            ]
        },
        {
            name: "number_of_people_in_house",
            title: "Combien de personnes vivent dans votre logement ?",
            type: "number",
            unit: "personnes",
            isRequired: true,
            placeHolder: "0",
            weight: 1,
            sources: [
                { title: 'Le nombre d\'habitants dans un logement: quels impacts ?', url: 'https://www.notre-environnement.gouv.fr/themes/amenagement/article/le-logement' },
            ]
        },
        {
            name: "usage_of_air_conditioning",
            title: "Avez-vous utilisé la climatisation cette semaine ?",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ],
            weight: [ 50, 0 ],
            sources: [
                { title: 'L\'utilisation du climatiseur: quels impacts ?', url: 'https://promee.fr/actualites/conseils/vrai-faux-est-ce-que-la-climatisation-est-mauvaise-pour-lenvironnement' },
            ]
        },
        {
            name: "buying_new_clothes",
            title: "Avez-vous acheté des vêtements neufs cette semaine ?",
            type: "radio",
            isRequired: true,
            choices: [ "Oui", "Non" ],
            weight: [ 10, 0 ],
            sources: [
                { title: 'L\'achat de nouveaux vêtements : quels impacts ?', url: 'https://www.oxfamfrance.org/agir-oxfam/impact-de-la-mode-consequences-sociales-environnementales/' },
            ]
        },
        {
            name: "time_spent_on_internet",
            title: "En moyenne, combien d'heures passez-vous sur internet par jour ?",
            type: "range",
            min: 0,
            max: 24,
            step: 1,
            unit: "h",
            isRequired: true,
            weight: 2,
            sources: [
                { title: 'L\'utilisation fréquente d\'internet: quels impacts ?', url: 'https://www.greenpeace.fr/la-pollution-numerique/' },
            ]
        },
        {
            name: "number_of_cigarettes",
            title: "En moyenne, combien de cigarettes fumez-vous par jour ?",
            type: "number",
            unit: "cigarettes",
            isRequired: true,
            placeHolder: "0",
            weight: 10,
            sources: [
                { title: 'La consommation régulière de cigarettes: quels impacts ?', url: 'https://www.who.int/fr/news/item/31-05-2022-who-raises-alarm-on-tobacco-industry-environmental-impact' },
            ]
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
