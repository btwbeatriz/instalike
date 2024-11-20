import express from "express";

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

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostID(req.params.id)
    res.status(200).json(posts[index]);
});