import express from "express";
import { db, verifyToken, getIdFromToken } from "../global.js";
import DbManager from "../dbLink.js";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    db.getAllUserDailyData(userId).then((rows) => {
        res.json(rows);
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
    });
});

router.get("/:date", verifyToken, (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    db.getUserDailyData(userId, req.params.date).then((rows) => {
        if (rows[0])
            res.json(rows[0]);
        else
            res.status(404).json({ msg: "User daily data not found" });
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
    });
});

router.post("/", verifyToken, (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    const date = new Date();
    const data = JSON.stringify(req.body.data);
    db.getUserDailyData(userId, date).then((rows) => {
        if (rows[0]) {
            db.updateUserDailyData(userId, date, data).then((rows) => {
                res.status(200).json({ msg: 'User daily data updated' });
            }).catch((err) => {
                res.status(500).json({ msg: "Internal server error", error: err });
            });
        } else {
            db.insertUserDailyData(userId, date, data).then((rows) => {
                res.status(200).json({ msg: 'User daily data added' });
            }).catch((err) => {
                res.status(500).json({ msg: "Internal server error", error: err });
            });
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
    });
});

export default router;
