import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida pela variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getAllPosts() {
    // Obtém o banco de dados 'imersao-instabytes' da conexão
    const db = conexao.db("imersao-instabytes");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados
  export async function createPost(newPost) {
    // Obtém o banco de dados da conexão
    const db = conexao.db("imersao-instabytes");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Insere o novo post na coleção e retorna o resultado da operação
    return colecao.insertOne(newPost);
  }
  
  // Função assíncrona para atualizar um post existente no banco de dados
  export async function refreshPost(id, newPost) {
    // Obtém o banco de dados da conexão
    const db = conexao.db("imersao-instabytes");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Converte o ID do post em um objeto ObjectId do MongoDB
    const objID = ObjectId.createFromHexString(id);
    // Atualiza o post com o novo conteúdo e retorna o resultado da operação
    return colecao.updateOne({ _id: new ObjectId(objID) }, {$set:newPost});
  }