import getAllPosts from "../models/postsModel.js";

export async function listAllPosts(req, res) {
    // Chama a função para obter todos os posts do banco de dados
    const posts = await getAllPosts();
    // Envia uma resposta HTTP com status 200 e os posts em formato JSON
    res.status(200).json(posts);
}
