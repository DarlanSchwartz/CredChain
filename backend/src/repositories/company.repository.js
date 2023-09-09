import { db } from "../database/database.js";

export async function createCompany(ownerId,cnpj, inscription, socialReason, fantasyName, phone) {
    try {
        const company = await db.query(
            `INSERT INTO companies ("ownerId","cnpj", "inscription", "socialReason", "fantasyName", "phone") VALUES ($1, $2, $3, $4, $5, $6);`,
            [ownerId,cnpj, inscription, socialReason, fantasyName, phone]
          );
      
          return company.rows;
    } catch (error) {
        console.log(error.message);
    }
}

export async function findCompanies(ownerId) {
   try {
    const company = await db.query(
        `SELECT * FROM companies WHERE "ownerId" = $1`,
        [ownerId]
      );
  
      return company.rows;
   } catch (error) {
    console.log(error.message);
   }
}


export async function companyExists(cnpj) {
  try {
    const company = await db.query(
        `SELECT 1 FROM companies WHERE "cnpj" = $1`,
        [cnpj]
      );
  
      return company.rows.length > 0;
  } catch (error) {
    console.log(error.message)
  }
}