import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, emailSender, extractUsername, verifyCaptcha } from "../global.js";
import crypto from "crypto";

function checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function checkPassword(password) {
    return (process.env.NODE_ENV === 'dev' ? true : /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\/])(?=.{8,})/.test(password));
}

const router = express.Router();

router.post("/activate", (req, res) => {
    const email = req.query.email;
    const receivedCode = req.query.code;
    const receivedSignature = req.query.signature;

    if (!email || !receivedCode || !receivedSignature) {
        res.status(400).json({ msg: "Bad parameter, need id and code" });
        return;
    }

    const calculatedSignature = crypto.createHmac('sha256', process.env.SECRET).update(receivedCode).digest('hex');
    if (calculatedSignature !== receivedSignature) {
        res.status(400).json({ msg: "Bad signature" });
        return;
    }
    try {
        db.getUserByEmail(email).then((rows) => {
            if (rows[0] === undefined) {
                res.status(400).json({ msg: "Invalid Credentials" });
                return;
            }
            if (rows[0].activate_code === 1) {
                res.status(400).json({ msg: "Account already activated" });
                return;
            }
            db.updateUser(rows[0].id, 'activate_code = true').then((rows) => {
                res.status(201).json({ msg: "Account activated" });
            }).catch((err) => {
                res.status(500).json({ msg: "Internal server error", error: err });
                console.error(err);
            });
        });
    } catch (err) {
        res.status(403).json({ msg: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const captchaValue = req.body.captcha;

    if (!captchaValue || !email || !password) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }

    if (captchaValue !== process.env.SECRET && await verifyCaptcha(captchaValue) === false) {
        res.status(400).json({ msg: "Invalid captcha" });
        return;
    }

    db.getUserByEmail(email, true).then((rows) => {
        if (rows[0] === undefined) {
            res.status(400).json({ msg: "Invalid Credentials" });
            return;
        }
        if (rows[0].activate_code === 0) {
            res.status(400).json({ msg: "Account not activated" });
            return;
        }
        if (bcrypt.compareSync(password, rows[0].password)) {
            let token = jwt.sign({ id: `${rows[0].id}` }, process.env.SECRET, { expiresIn: '4w' });
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
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password || !checkEmail(email) || !checkPassword(password)) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }

    const passwordHash = bcrypt.hashSync(password);

    db.getUserByEmail(email).then((rows) => {
        if (rows[0] !== undefined) {
            res.status(400).json({ msg: "Email already exists" });
            return;
        }

        db.insertUser(email, passwordHash).then((rows) => {
            try {
                const randomCode = Math.random().toString(36).substring(7);
                const signedCode = crypto.createHmac('sha256', process.env.SECRET).update(randomCode).digest('hex');
                const link = `${process.env.API_URL}/activate?code=${encodeURIComponent(randomCode)}&signature=${encodeURIComponent(signedCode)}&email=${encodeURIComponent(email)}`;
                if (process.env.NODE_ENV === 'dev') {
                    res.status(201).json({ msg: "Account created", link: link });
                    return;
                }
                emailSender.sendEmail(email, link, extractUsername(email));
                res.status(201).json({ msg: "Account created" });
            } catch (err) {
                res.status(500).json({ msg: "Error creating account", error: err });
                console.error(err);
            }
        }).catch((err) => {
            res.status(500).json({ msg: "Error creating account", error: err });
            console.error(err);
        });
    }).catch((err) => {
        res.status(500).json({ msg: "Error connexion database", error: err });
        console.error(err);
    });
});

export default router;
