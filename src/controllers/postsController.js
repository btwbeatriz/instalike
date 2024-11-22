import fs from "fs";
import { getAllPosts, createPost } from "../models/postsModel.js";

// Função assíncrona para listar todos os posts
export async function listAllPosts(req, res) {
    // Chama a função para obter todos os posts do banco de dados
    const posts = await getAllPosts();
    // Envia uma resposta HTTP com status 200 e os posts em formato JSON
    res.status(200).json(posts);
  }
  
// Função assíncrona para criar um novo post
export async function postNewPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const newPost = req.body;
    try {
      // Chama a função para criar o novo post no banco de dados
      const createdPost = await createPost(newPost);
      // Envia uma resposta HTTP com status 200 e o post criado em formato JSON
      res.status(200).json(createdPost);
    } catch (error) {
      // Registra o erro no console
      console.error(error.message);
      // Envia uma resposta HTTP com status 500 e uma mensagem de erro
      res.status(500).json({ "Erro": "Falha na requisição!" });
    }
  }
  
// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImage(req, res) {
    // Cria um objeto com os dados do novo post, incluindo o nome do arquivo da imagem
    const newPost = {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
    };
  
    try {
      // Chama a função para criar o novo post no banco de dados
      const createdPost = await createPost(newPost);
      // Renomeia o arquivo da imagem para incluir o ID do post criado
      const updatedImage = `uploads/${createdPost.insertedId}.png`;
      fs.renameSync(req.file.path, updatedImage);
      // Envia uma resposta HTTP com status 200 e o post criado em formato JSON
      res.status(200).json(createdPost);
    } catch (error) {
      // Registra o erro no console
      console.error(error.message);
      // Envia uma resposta HTTP com status 500 e uma mensagem de erro
      res.status(500).json({ "Erro": "Falha na requisição!" });
    }
  }
  