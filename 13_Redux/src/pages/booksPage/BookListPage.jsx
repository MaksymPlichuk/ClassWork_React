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
        fetchBooks();
    }, [])

    const baseUrl = import.meta.env.VITE_BOOKS_URL;
    async function fetchBooks() {
        const pageSize = 5;
        const page = 1;
        const url = `${baseUrl}?page=${page}&page_size=${pageSize}`

        console.log(url)
        const resp = await axios.get(url);  //?page_size=20&page=6
        const { data, status } = resp;
        console.log(resp);
        if (status == 200) {
            const booksData = []
            for (const book of data.data.items) {
                const formated = {
                    id: book.id,
                    title: book.title,
                    authorName: book.author ? book.author.name : "Unknown",
                    coverUrl: book.image,
                    rating: book.rating ? book.rating : 0,
                    isFavorite: false,
                    numberOfPages: book.numberOfPages,
                    year: book.publishDate
                };
                booksData.push(formated);
            }
            setBooks(booksData);
            setLoading(false);
        } else {
            alert("Some Error")
        }
    }

    const removeBook = async (id) => {
        const newList = books.filter(b => b.id !== id)
        setBooks(newList);
        try {
            await axios.delete(`${baseUrl}/${id}`);
        }
        catch (err) {
            console.log(err);

        }
        await fetchBooks();
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5, flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h5">Loading Data...</Typography>
                <CircularProgress enableTrackSlot size="3rem" sx={{ mt: 5 }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>

            <Grid container spacing={2} mx="100px" my="50px">
                {books.map((b) => (
                    <Grid size={3} key={b.id}>
                        <BookCard book={b} removeBookCallBack={removeBook} setFavoriteCallBack={setFavorite} role={role} b={b} />
                    </Grid>
                ))}
                <Grid size={books.length % 4 == 0 ? 12 : 3} >
                    <Box sx={{ width: "100%", justifyContent: "center", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

                        {role != "user" ?
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