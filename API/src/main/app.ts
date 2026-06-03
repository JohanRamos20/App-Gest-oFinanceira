import "dotenv/config";
import express from "express";
import { usuarioRoutes } from "../infrastructure/http/routes/usuario-router";

const app = express();

app.use(express.json());
app.use(usuarioRoutes);

export { app }