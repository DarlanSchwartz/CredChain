import { db } from "../database/database.js"

export async function postNetworkDB(name, image, chainId) {
 
  return await db.query(
      `INSERT INTO networks (name, image, "chainId") VALUES ($1, $2, $3) RETURNING *;`,
      [name, image, chainId]
    );
}


export async function existNetworkDB(chainId) {
    return await db.query(`SELECT * FROM networks WHERE "chainId" = $1;`, [chainId]);
}

export async function getNetworkDB() {
 return await db.query(`SELECT * FROM networks`);
  
}


export async function removeNetworkDB(networkId) {
    return await db.query(
      `DELETE FROM networks WHERE id = $1;`,
      [networkId]
    );
  }
