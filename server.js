import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida pela variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Array de posts inicial (pode ser usado para testes ou como fallback)
const posts = [
    {
        id: 1,
        descricao: "Uma foto teste!",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 2,
        descricao: "Um gato adorável!",
        imagem: "https://placekitten.com/200/300",
    },
    {
        id: 3,
        descricao: "Gato preguiçoso tomando sol.",
        imagem: "https://placekitten.com/400/200",
    },
    {
        id: 4,
        descricao: "Gato brincando com um novelo de lã.",
        imagem: "https://placekitten.com/300/300",
    },
    {
        id: 5,
        descricao: "Gato curioso olhando pela janela.",
        imagem: "https://placekitten.com/250/250",
    },
    {
        id: 6,
        descricao: "Gatinho ronronando.",
        imagem: "https://placekitten.com/200/200",
    }
];

// Cria uma instância do aplicativo Express
const app = express();

// Habilita o middleware para analisar requisições com corpo em formato JSON
app.use(express.json());

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000");
});

// Função assíncrona para obter todos os posts do banco de dados
async function getAllPosts() {
    // Obtém o banco de dados 'imersao-instabytes' da conexão
    const db = conexao.db("imersao-instabytes");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

// Rota para obter todos os posts
app.get("/posts", async (req, res) => {
    // Chama a função para obter todos os posts do banco de dados
    const posts = await getAllPosts();
    // Envia uma resposta HTTP com status 200 e os posts em formato JSON
    res.status(200).json(posts);
});