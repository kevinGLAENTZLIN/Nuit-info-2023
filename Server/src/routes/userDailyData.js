import express from "express";
import { db, verifyToken, getIdFromToken } from "../global.js";
import DbManager from "../dbLink.js";
import { daily } from "./form.js";

Date.prototype.getWeekNumber = function () {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    db.getAllUserDailyData(userId).then((rows) => {
        res.json(rows);
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
    });
});

router.get("/:year/:week", verifyToken, (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    db.getUserDailyData(userId, req.params.year, req.params.week).then((rows) => {
        if (rows[0])
            res.json(rows[0]);
        else
            res.status(404).json({ msg: "User weekly data not found" });
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
    });
});

router.post("/", verifyToken, (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    const date = new Date();
    const year = date.getFullYear();
    const week = date.getWeekNumber();
    const data = JSON.stringify(req.body.data);
    db.getUserDailyData(userId, year, week).then((rows) => {
        if (rows[0]) {
            db.updateUserDailyData(userId, year, week, data).then((rows) => {
                res.status(200).json({ msg: 'User weekly data updated' });
            }).catch((err) => {
                res.status(500).json({ msg: "Internal server error", error: err });
            });
        } else {
            db.insertUserDailyData(userId, year, week, data).then((rows) => {
                res.status(200).json({ msg: 'User weekly data added' });
            }).catch((err) => {
                res.status(500).json({ msg: "Internal server error", error: err });
            });
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
    });
});

router.post("/process/:year/:week", verifyToken, (req, res) => {
    let somme = 0;
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    db.getUserDailyData(userId, req.params.year, req.params.week).then((rows) => {
        if (rows[0]) {
            const data = JSON.parse(rows[0].data);
            Object.keys(data).forEach((key) => {
                const node = daily.elements.find((element) => element.name === key);
                let weight = node.weight;
                if (node.type === "radio" || node.type === "dropdown") {
                    const position = node.choices.indexOf(data[key]);
                    if (position === -1)
                        weight = 0;
                    else
                        weight = node.weight[position];
                } else if (node.type === "checkbox") {
                    let totalWeight = 0;
                    data[key].forEach((choice) => {
                        const position = node.choices.indexOf(choice);
                        if (position !== -1)
                            totalWeight += node.weight[position];
                    });
                    weight = totalWeight;
                } else {
                    weight = weight;
                }
                console.log("RESULTAT: " + weight);
                somme += weight;
            });
            console.log("somme", somme);
            res.json(data);
        } else {
            res.status(404).json({ msg: "User weekly data not found" });
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
    });
});

export default router;
