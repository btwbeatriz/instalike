import fs from "fs";
import { getAllPosts, createPost, refreshPost } from "../models/postsModel.js";

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

// Função assíncrona para atualizar um post existente
export async function refreshNewPost(req, res) {
  // Obtém o ID do post a ser atualizado dos parâmetros da requisição
  const id = req.params.id;
  // Constrói a URL da imagem do post
  const urlImage = `http://localhost:3000/${id}.png`;
  // Cria um objeto com os novos dados do post, incluindo a URL da imagem
  const post = {
    imgUrl: urlImage,
    descricao: req.body.descricao,
    alt: req.body.alt
  };

  try {
    // Chama a função para atualizar o post no banco de dados
    const createdPost = await refreshPost(id, post);
    // Envia uma resposta HTTP com status 200 e o post atualizado em formato JSON
    res.status(200).json(createdPost);
  } catch (error) {
    // Registra o erro no console
    console.error(error.message);
    // Envia uma resposta HTTP com status 500 e uma mensagem de erro
    res.status(500).json({ "Erro": "Falha na requisição!" });
  }
}
