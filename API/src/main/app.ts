import "dotenv/config";
import express from "express";
import { usuarioRoutes } from "../infrastructure/http/routes/usuario-router";
import { metaRoutes } from "../infrastructure/http/routes/meta-router";

const app = express();

app.use(express.json());
app.use(usuarioRoutes);
app.use(metaRoutes);

export { app }