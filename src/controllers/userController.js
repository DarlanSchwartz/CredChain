import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { findUserByCpfDB, findUserById, loginDB, logoutDB, signupDB } from "../repositories/userRepository.js";


export async function signup(req, res) {
  const { cpf, name, date, email, password } = req.body;

  try {
    const existCpf = await findUserByCpfDB(email);
    if (existCpf.rowCount > 0) {
      return res.status(409).send("Este cpf já existe!");
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    
    signupDB(cpf, name, date, email, encryptedPassword)

    res.status(201).send("Usuário Cadastrado");
  } catch (err) {
    console.log('Erro em signup', err);
    return res.status(500).send(err);
  }
}


export async function login(req, res) {
  const { cpf, password } = req.body;

  try {
    const user = await findUserByCpfDB(cpf);
    if (user.rowCount === 0) {
      return res.status(401).send("Este cpf não existe, crie uma conta");
    }

    const hashedPassword = user.rows[0].password;

    if (bcrypt.compareSync(password, hashedPassword)) {
      const token = uuid();

      await loginDB(user.rows[0].id, token)

      res.status(200).send({ token: token,user:user.rows[0] });

    } else {
      res.status(401).send("Senha incorreta!");
    }
  } catch (err) {
    console.log('Erro em signin', err);
    return res.status(500).send(err);
  }
}

export async function getUser(req, res) {
  try {
    const user = await findUserById(res.locals.userId);
    const response = user && user.rows[0] ? user.rows[0] : null;
    if(response){
      delete response.password;
      delete response.date;
    }
    return res.send(response);
  } catch ({message}) {
    console.log('Erro em get user', message);
    return res.status(500).send(message);
  }
}



export async function logout(req, res) {
  const token = res.locals.rows[0].token;

  try {
    await logoutDB(token)
    res.status(204).send("Token removido!")

  } catch (err) {
    console.log('Erro em logout', err);
    res.status(500).send(err)
  }
}


