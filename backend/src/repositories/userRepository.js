import { db } from "../database/database.js"

export async function findUserByCpfDB(cpf) {
  return db.query(`SELECT * FROM users WHERE cpf=$1`, [cpf]);
}

export async function signupDB(cpf, name, date, email, encryptedPassword) {
  return await db.query(
    `INSERT INTO users (cpf, "name", "date", email, password) VALUES ($1, $2, $3, $4, $5);`,
    [cpf, name, date, email, encryptedPassword]
  );
}

export async function loginDB(userId, token) {
  return await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token]);
}

export async function logoutDB(token) {
  return await db.query(`DELETE FROM sessions WHERE token =$1`, [token]);
}