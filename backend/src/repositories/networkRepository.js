import { db } from "../database/database.js"

export async function postNetworkDB(name, image, chainId, userId) {
  return await db.query(
    `INSERT INTO networks (name, image, "chainId", "userId") VALUES ($1, $2, $3, $4) RETURNING *;`,
    [name, image, chainId, userId]
  );
}



export async function existNetworkDB(chainId) {
    return await db.query(`SELECT * FROM networks WHERE "chainId" = $1;`, [chainId]);
}

export async function getNetworkDB(userId) {
  return await db.query(`SELECT * FROM networks WHERE "userId" = $1;`, [userId]);
}



export async function removeNetworkDB(networkId) {
    return await db.query(
      `DELETE FROM networks WHERE id = $1;`,
      [networkId]
    );
  }
