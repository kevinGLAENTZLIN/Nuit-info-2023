import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import mysql from "mysql2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import DbManager from "./dbLink.js";

dotenv.config();

export const db = new DbManager();
export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const algorithm = 'aes-256-cbc';

export function encryptString(text) {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(process.env.SECRET, 'utf8'), iv);
    return JSON.stringify({ i: iv.toString('hex'), e: Buffer.concat([cipher.update(text), cipher.final()]).toString('hex') });
}

export function decryptString(text) {
    text = JSON.parse(text);
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(process.env.SECRET, 'utf8'), Buffer.from(text.i, 'hex'));
    return Buffer.concat([decipher.update(Buffer.from(text.e, 'hex')), decipher.final()]).toString();
}

/**
 * Checks if the user is logged in and has a valid token
 *
 * @param {*} req The express request object
 * @param {*} res The express response object
 * @param {*} next The express next object
 * @returns
 */
export function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof (bearerHeader) === 'undefined') {
        res.status(403).json({ msg: "No token, authorization denied" });
        return;
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    try {
        let decoded = jwt.verify(req.token, process.env.SECRET);
        db.getUserById(decoded.id).then((rows) => {
            if (rows[0] && rows[0].id == decoded.id)
                next();
            else
                res.status(403).json({ msg: "Token is not valid" });
        }).catch((err) => {
            res.status(500).json({ msg: "Internal server error", error: err });
            console.error(err);
        });
    } catch (err) {
        res.status(403).json({ msg: "Token is not valid" });
    }
}

/**
 * Gets the id of the user from the token
 *
 * @param {*} req The express request object
 * @param {*} res The express response object
 * @returns The id of the user from the token or -1 if the token is invalid
 */
export function getIdFromToken(req, res) {
    try {
        let decoded = jwt.verify(req.token, process.env.SECRET);
        return decoded.id;
    } catch (err) {
        res.status(403).json({ msg: "Token is not valid" });
    }
    return -1;
}

/**
 * Checks if the user is authorized to access the resource
 *
 * @param {*} req The express request object
 * @param {*} res The express response object
 * @returns Boolean
 */
export function verifyAuth(req, res) {
    let token_id = getIdFromToken(req, res);
    if (token_id === -1)
        return false;
    return token_id === req.params.id;
}

/**
 * Checks if the parameter is a number
 *
 * @param {*} id The id to check
 * @returns Boolean
 */
export function is_num(id) {
    return (/^\d+$/.test(id));
}
