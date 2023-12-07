import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

class DbManager {
    constructor() {
        this.con = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        this.con.connect((err) => {
            if (err) throw new Error(`Failed to connect to database ${process.env.MYSQL_DATABASE}`);
            console.log('Successfully connected to the database ' + process.env.MYSQL_DATABASE);
        });
    }

    destructor() {
        this.closeConnection();
    }

    closeConnection() {
        this.con.end();
        console.log('Disconnecting from the MySQL database');
    }

    executeQuery(query, values) {
        return new Promise((resolve, reject) => {
            this.con.query(query, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getAllUsers(withPassword = false) {
        const query = `SELECT ${withPassword ? '*' : 'id, email, activate_code, created_at'} FROM user;`;
        const values = [];
        return this.executeQuery(query, values);
    }

    getUserById(id, withPassword = false) {
        const query = `SELECT ${withPassword ? '*' : 'id, email, activate_code, created_at'} FROM user WHERE id = ?;`;
        const values = [id];
        return this.executeQuery(query, values);
    }

    getUserByEmail(email, withPassword = false) {
        const query = `SELECT ${withPassword ? '*' : 'id, email, activate_code, created_at'} FROM user WHERE email = ?;`;
        const values = [email];
        return this.executeQuery(query, values);
    }

    getUserByEmailOrId(str, withPassword = false) {
        const query = `SELECT ${withPassword ? '*' : 'id, email, activate_code, created_at'} FROM user WHERE id = ? OR email = ?;`;
        const values = [str, str];
        return this.executeQuery(query, values);
    }

    insertUser(email, passwordHash) {
        const query = 'INSERT INTO user(email, password) VALUES (?, ?)';
        const values = [email, passwordHash];
        return this.executeQuery(query, values);
    }

    updateUser(id, updateQueryString) {
        const query = `UPDATE user SET ${updateQueryString} WHERE id = ?;`;
        const values = [id];
        return this.executeQuery(query, values);
    }

    deleteUser(id) {
        const query = `DELETE FROM user WHERE id = ?;`;
        const values = [id];
        return this.executeQuery(query, values);
    }

    getAllUserDailyData(userId) {
        const query = `SELECT * FROM user_daily_data WHERE user_id = ?;`;
        const values = [userId];
        return this.executeQuery(query, values);
    }

    getUserDailyData(userId, date) {
        const query = `SELECT * FROM user_daily_data WHERE user_id = ? AND date = ?;`;
        const values = [userId, date];
        return this.executeQuery(query, values);
    }

    insertUserDailyData(userId, date, data) {
        const query = 'INSERT INTO user_daily_data(user_id, date, data) VALUES (?, ?, ?)';
        const values = [userId, date, data];
        return this.executeQuery(query, values);
    }

    updateUserDailyData(userId, date, data) {
        const query = `UPDATE user_daily_data SET data = ? WHERE user_id = ? AND date = ?;`;
        const values = [data, userId, date];
        return this.executeQuery(query, values);
    }
}

export default DbManager;
