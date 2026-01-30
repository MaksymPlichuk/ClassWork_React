import { Box, Grid, IconButton } from "@mui/material";
import BookCard from "./BookCard";
import booksJson from "./books.json"
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router";

const BookListPage = ({ role }) => {
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