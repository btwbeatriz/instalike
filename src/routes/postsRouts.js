import express from "express";
import multer from "multer";
import { listAllPosts, postNewPost, uploadImage } from "../controllers/postsController.js";

// Configura o armazenamento para o multer
const storage = multer.diskStorage({
    // Define o diretório de destino para arquivos enviados (./uploads neste caso)
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    // Define o nome do arquivo enviado (usa o nome original)
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  // Cria uma instância do multer com o armazenamento configurado
  const upload = multer({ dest: "./uploads", storage });
  
  // Define uma função para registrar rotas em uma aplicação Express
  const routes = (app) => {
    // Habilita o middleware para interpretar dados JSON no corpo da requisição
    app.use(express.json());
  
    // Define uma rota para requisições GET em "/posts" (manipulada pela função listAllPosts)
    app.get("/posts", listAllPosts);
  
    // Define uma rota para requisições POST em "/posts" (manipulada pela função postNewPost)
    app.post("/posts", postNewPost);
  
    // Define uma rota para requisições POST em "/upload" com um único arquivo chamado "image" (manipulada pelo middleware upload.single e depois pela função uploadImage)
    app.post("/upload", upload.single("image"), uploadImage);
  };
  
  // Exporta a função routes como padrão para uso em outros módulos
  export default routes;