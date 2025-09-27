import express from "express";
import { getAllBooks, getOne, saveBook, updateBook, deleteBook } from "./db.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    const method = req.method;
    const url = req.url;
    console.log({
        method,
        url
    });
    res.send()
});
app.get("/books", async (req, res) => {
    const books = await getAllBooks();
    res.send(books);
});
app.get("/books/:id", async (req, res) => {
    const { id } = req.params;
    const book = await getOne(id);

    if (!book) {
        res.status(404);
        return res.send({
            message: `${id} not found`
        })
    }
    res.send(book);
});
app.post("/books", async (req, res) => {
    try {
        const newBook = await saveBook(req.body);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatesBook = await updateBook(id, data);

        res.status(201).send(updatesBook);
    } catch (err) {
        res.status(404).send({
            error: err.message
        })
    }
});
app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const delBook = await deleteBook(id);
        res.status(200).send(`Ok`);
    } catch (err) {
        res.status(404).send({
            error: err.message
        });
    }
});

app.listen(3333, () => {
    console.log(`Server running on port 3333`);
});