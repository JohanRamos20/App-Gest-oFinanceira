import "dotenv/config";
import express from "express";
import { usuarioRoutes } from "../infrastructure/http/routes/usuario-router";
import { metaRoutes } from "../infrastructure/http/routes/meta-router";
import { transacaoRoutes } from "../infrastructure/http/routes/transacao-router";
import { errorMiddleware } from "../infrastructure/http/middleware/error-midleware";

const app = express();

app.use(express.json());
app.use(usuarioRoutes);
app.use(metaRoutes);
app.use(transacaoRoutes);
app.use(errorMiddleware)

export { app }