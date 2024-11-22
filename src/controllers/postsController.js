import { getAllPosts, createPost } from "../models/postsModel.js";

export async function listAllPosts(req, res) {
    // Chama a função para obter todos os posts do banco de dados
    const posts = await getAllPosts();
    // Envia uma resposta HTTP com status 200 e os posts em formato JSON
    res.status(200).json(posts);
}

export async function postNewPost(req, res) {
    const newPost = req.body;
    try{
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição!"});
    }
}