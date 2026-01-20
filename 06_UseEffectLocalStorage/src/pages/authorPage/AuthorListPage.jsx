import { Box, Grid } from "@mui/material";
import AuthorCard from "./AuthorCard";
import authorsJson from "./authors.json"
import AuthorCreateForm from "./AuthorCreateForm";
import { useState,useEffect } from "react";

const AuthorListPage = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const localData = localStorage.getItem("authors")
        if (localData) {
            setAuthors(JSON.parse(localData));
        } else {
            setAuthors(authorsJson);
            localStorage.setItem("authors", JSON.stringify(authorsJson));
        }
    }, [])

    const addAuthor = (newAuthor) => {
        const id = authors.reduce((acc, authors) => Math.max(acc, authors.id), 0) + 1;
        newAuthor.id = id;
        newAuthor.isFavorite = false;
        newAuthor.imageUrl = newAuthor.imageUrl;

        const newList = [...authors, newAuthor];
        setAuthors(newList);
        localStorage.setItem("authors", JSON.stringify(newList));
    }
    const removeAuthor = (id) => {
        const newList = authors.filter(b => b.id !== id)
        setAuthors(newList);
        localStorage.setItem("authors", JSON.stringify(newList));
    }
    const setFavorite = (id, state) => {
        const newList = [...authors];
        
        const index = newList.findIndex(b => b.id === id);
        if (index !== 1) {
            newList[index].isFavorite = state;
            setAuthors(newList);
            localStorage.setItem("authors", JSON.stringify(newList));
        }
    }


    return (
        <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>

            <Grid container spacing={2} mx="100px" my="50px">
                {authors.map((b) => (
                    <Grid size={3} key={b.id}>
                        <AuthorCard author={b} removeAuthorCallBack={removeAuthor} setFavoriteCallBack={setFavorite}/>
                    </Grid>
                ))}
            </Grid>
            <AuthorCreateForm addAuthorCallBack={addAuthor} />
        </Box>
    );
}
export default AuthorListPage;