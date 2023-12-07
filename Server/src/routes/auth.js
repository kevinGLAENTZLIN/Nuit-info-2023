import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, encryptString } from "../global.js";

function checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function checkPassword(password) {
    return true;
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)
}

const router = express.Router();

router.post("/login", (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }

    db.getUserByEmail(req.body.email, true).then((rows) => {
        if (rows[0] === undefined) {
            res.status(400).json({ msg: "Invalid Credentials" });
            return;
        }

        if (bcrypt.compareSync(req.body.password, rows[0].password)) {
            let token = jwt.sign({ id: `${rows[0].id}` }, process.env.SECRET, { expiresIn: '40w' });
            res.status(201).json({ token: token, id: rows[0].id });
        } else {
            res.status(400).json({ msg: "Invalid Credentials" });
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});

router.post("/register", (req, res) => {
    if (!req.body.email || !req.body.password || !checkEmail(req.body.email) || !checkPassword(req.body.password)) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }

    const passwordHash = bcrypt.hashSync(req.body['password']);

    db.getUserByEmail(req.body.email).then((rows) => {
        if (rows[0] !== undefined) {
            res.status(400).json({ msg: "Email already exists" });
            return;
        }

        db.insertUser(req.body.email, passwordHash).then((rows) => {
            let token = jwt.sign({ id: `${rows.insertId}` }, process.env.SECRET, { expiresIn: '40w' });
            res.status(201).json({ token: token, id: rows.insertId });
        }).catch((err) => {
            res.status(500).json({ msg: "Internal server error", error: err });
            console.error(err);
        });
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});

export default router;
