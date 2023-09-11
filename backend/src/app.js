import express from "express";
import cors from "cors";
import router from "./routes/indexRouter.js";
import dotenv from "dotenv"
import runListenerEther from "./listener/listner_ethereum.js";
import runListenerLachain from "./listener/listner_lachain.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
dotenv.config()

//PORT:
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
});

runListenerEther();
// runListenerLachain();
