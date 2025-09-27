import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksFilePath = path.join(__dirname, "database", "book.json");

export async function getAllBooks() {
    try {
        const data = await fs.readFile(booksFilePath, "utf-8");
        const books = JSON.parse(data);

        return books;
    } catch (error) {
        throw new Error(error.message);
    }
};
export async function getOne(id) {
    try {
        const data = await fs.readFile(booksFilePath, "utf-8");
        const books = JSON.parse(data);
        const book = books.find((b) => b.id === Number(id));
        return book;
    } catch (err) {
        throw new Error(err);
    }
};
export async function saveBook(body) {
    try {
        const data = await fs.readFile(booksFilePath, "utf-8");
        const books = JSON.parse(data);
        const newBook = { id: books.length + 1, ...body };
        books.push(newBook)
        await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));
        return newBook;
    } catch (err) {
        throw new Error(err);
    }
}
export async function saveAllBooks(books) {
    await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));
};
export async function updateBook(id, body) {
    try {
        const books = await getAllBooks();
        const index = books.findIndex((book) => book.id === Number(id));
        if (index === -1) throw new Error("Book not found");

        books[index] = { ...books[index], ...body };

        await saveAllBooks(books);
        return books[index];
    } catch (err) {
        throw new Error(err);
    }
};
export async function deleteBook(id) {
    try {
        const books = await getAllBooks();
        const index = books.findIndex((book) => book.id === Number(id));
        if (index === -1) throw new Error("Book not found");

        const delBook = books.splice(index, 1);
        await saveAllBooks(books);

        return delBook;
    } catch (err) {
        throw new Error(err);
    }
}

