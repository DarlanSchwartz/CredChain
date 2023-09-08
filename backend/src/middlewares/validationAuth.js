import { db } from "../database/database.js"

export async function validationAuth(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).send('Para acessar precisa de um token.')

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
        if (session.rowCount === 0) return res.status(401).send("Não foi encontrado o token no banco.")

        res.locals = session
        res.locals.userId = session.rows[0].userId
        
        next()
    } catch (error) {
        return res.status(500).send(error.message)
    }
}