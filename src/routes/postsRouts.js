import express from "express";
import { listAllPosts } from "../controllers/postsController.js";

const routes = (app) => {
    // Habilita o middleware para analisar requisições com corpo em formato JSON
    app.use(express.json());
    // Rota para obter todos os posts
    app.get("/posts", listAllPosts);
}

export default routes;