import express from "express";
import { db, verifyToken } from "../global.js";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
    db.getAllUsers().then((rows) => {
        res.json(rows);
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});

router.get("/:id", verifyToken, (req, res) => {
    db.getUserById(req.params.id).then((rows) => {
        if (rows[0])
            res.json(rows[0]);
        else
            res.status(404).json({ msg: "User not found" });
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});

export default router;
