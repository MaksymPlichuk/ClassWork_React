import { Box, Grid, IconButton, CircularProgress, Typography } from "@mui/material";
import BookCard from "./BookCard";
import booksJson from "./books.json"
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router";
import axios from "axios";

const BookListPage = ({ role }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const localData = localStorage.getItem("books")
        if (localData) {
            setBooks(JSON.parse(localData));
            setLoading(false)
        } else {
            fetchBooks();
        }
    }, [])

    async function fetchBooks() {
        const baseUrl = `https://api.bigbookapi.com/search-books`;
        const bookNumber = 5;
        const api = `dd33b0978ebd4fef81fd64cede9608f1`;
        const url = `${baseUrl}?number=${bookNumber}&min-rating=0.3&api-key=${api}`

        const resp = await axios.get(url);
        const { data, status } = resp;
        if (status == 200) {
            const booksData = []
            for (const [book] of data.books) {
                const formated = {
                    id: book.id,
                    title: book.title,
                    authorName: book.authors[0].name,
                    coverUrl: book.image,
                    rating: book.rating?.average ?? 0,
                    isFavorite: false
                };
                booksData.push(formated);
            }
            setBooks(booksData);
            setLoading(false);
            localStorage.setItem('books', JSON.stringify(booksData));
        } else {
            alert("Some Error")
        }
    }

    const removeBook = (id) => {
        const newList = books.filter(b => b.id !== id)
        setBooks(newList);
        localStorage.setItem("books", JSON.stringify(newList));
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

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5,flexDirection:"column",alignItems:"center" }}>
                <Typography variant="h5">Loading Data...</Typography>
                <CircularProgress enableTrackSlot size="3rem" sx={{mt: 5}} />
            </Box>
        );
    }

    return (
        <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>

            <Grid container spacing={2} mx="100px" my="50px">
                {books.map((b) => (
                    <Grid size={3} key={b.id}>
                        <Link to={`/books/description/${b.id}`}>
                            <BookCard book={b} removeBookCallBack={removeBook} setFavoriteCallBack={setFavorite} role={role} />
                        </Link>
                    </Grid>
                ))}
                <Grid size={books.length % 4 == 0 ? 12 : 3} >
                    <Box sx={{ width: "100%", justifyContent: "center", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

                        {!role == "user" ?
                            <Link to="create">
                                <IconButton color="secondary">
                                    <AddCircleIcon sx={{ fontSize: "3em" }} />
                                </IconButton>
                            </Link> : null}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
export default BookListPage;