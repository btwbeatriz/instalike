import express from "express";
import { listAllPosts, postNewPost } from "../controllers/postsController.js";

const routes = (app) => {
    // Habilita o middleware para analisar requisições com corpo em formato JSON
    app.use(express.json());
    // Rota para obter todos os posts
    app.get("/posts", listAllPosts);
    // Rota para criar um novo post
    app.post("/posts", postNewPost);
}

export default routes;