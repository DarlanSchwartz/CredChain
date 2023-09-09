import { db } from "../database/database.js";

export async function createCompany(ownerId,cnpj, inscription, socialReason, fantasyName, phone) {
    const company = await db.query(
      `INSERT INTO companies ("ownerId","cnpj", "inscription", "socialReason", "fantasyName", "phone") VALUES ($1, $2, $3, $4, $5, $6);`,
      [ownerId,cnpj, inscription, socialReason, fantasyName, phone]
    );

    return company.rows;
}

export async function findCompanies(ownerId) {
    const company = await db.query(
      `SELECT * FROM companies WHERE "ownerId" = $1`,
      [ownerId]
    );

    return company.rows;
}


export async function companyExists(cnpj) {
    const company = await db.query(
      `SELECT 1 FROM companies WHERE "cnpj" = $1`,
      [cnpj]
    );

    return company.rows.length > 0;
}