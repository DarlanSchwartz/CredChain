import { companyExists, createCompany, findCompanies } from "../repositories/company.repository.js";

export async function registerCompany(req, res) {
    const { cnpj, inscription, socialReason, fantasyName, phone } = req.body;
    const userId = res.locals.userId;
    try {
        const userHasMoreThanOneCompany = await findCompanies(userId);
        if(userHasMoreThanOneCompany.length >= 1) return res.status(400).send("You cannot register another company!");
        
        const companyIsRegistered = await companyExists(cnpj);
        if (companyIsRegistered) {
            return res.status(409).send("This company already exists!");
        }
        
        createCompany(userId,cnpj, inscription, socialReason, fantasyName, phone);
        res.status(201).send("Company registered!");
    } catch ({message}) {
        console.log(message);
        return res.status(500).send(message);
    }
}

export async function getCompanies(req, res) {
    const userId = res.locals.userId;
    try {
        const companies = await findCompanies(userId);
        res.status(200).send(companies);
    } catch ({message}) {
        console.log(message);
        return res.status(500).send(message);
    }
}

