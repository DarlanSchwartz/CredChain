import {
  getNetworkDB,
  postNetworkDB,
  existNetworkDB,
  removeNetworkDB,
} from "../repositories/networkRepository.js";

export async function postNetwork(req, res) {
  const { name, image, chainId } = req.body;
  const userId = res.locals.userId; // Obtém o ID do usuário da sessão

  try {
    const existingNetwork = await existNetworkDB(chainId);

    if (existingNetwork.rowCount > 0) {
      res.status(200).send(existingNetwork);
    } else {
      const newNetwork = await postNetworkDB(name, image, chainId, userId); // Passa o userId como argumento
      res.status(201).send(newNetwork);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}



export async function getNetwork(req, res) {
  const userId = res.locals.userId; // Obtém o ID do usuário da sessão

  try {
    const data = await getNetworkDB(userId); // Passa o userId como argumento
    return res.send(data.rows);
  } catch (error) {
    console.log("Erro em getNetwork:", error);
    return res.status(500).send(error);
  }
}

export async function removeNetwork(req, res) {
  const networkId = req.params.networkId;

  try {
    await removeNetworkDB(networkId);
    res.status(200).send("Rede removida com sucesso.");
  } catch (error) {
    console.log("Erro em removeNetwork:", error);
    res.status(500).send(error.message);
  }
}