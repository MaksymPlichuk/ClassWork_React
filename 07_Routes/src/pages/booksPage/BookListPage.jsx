import { Box, Grid } from "@mui/material";
import BookCard from "./BookCard";
import booksJson from "./books.json"
import BookCreateForm from "./BookCreateForm";
import { useState, useEffect } from "react";

const BookListPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const localData = localStorage.getItem("books")
        if (localData) {
            setBooks(JSON.parse(localData));
        } else {
            setBooks(booksJson);
            localStorage.setItem("books", JSON.stringify(booksJson));
        }
    }, [])

    const addNewBook = (newBook) => {
        const id = books.reduce((acc, books) => Math.max(acc, books.id), 0) + 1;
        newBook.id = id;
        newBook.isFavorite = false;
        newBook.coverUrl = newBook.cover;
        delete newBook.cover;
        const newList = [...books, newBook];
        setBooks(newList);
        localStorage.setItem("books", JSON.stringify(newList));
    }
    const removeBook = (id) => {
        const newList = books.filter(b => b.id !== id)
        setBooks(newList);
        localStorage.setItem("book", JSON.stringify(newList));
    }
    const setFavorite = (id, state) => {
        const newList = [...books];
        const index = newList.findIndex(b => b.id === id);
        if (index !== 1) {
            newList[index].isFavorite = state;
            setBooks(newList);
            localStorage.setItem("books", JSON.stringify(newList));
        }
    }

    return (
        <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>

            <Grid container spacing={2} mx="100px" my="50px">
                {books.map((b) => (
                    <Grid size={3} key={b.id}>
                        <BookCard book={b} removeBookCallBack={removeBook} setFavoriteCallBack={setFavorite} />
                    </Grid>
                ))}
                <BookCreateForm addBookCallback={addNewBook} />
            </Grid>

        </Box>
    );
}
export default BookListPage;