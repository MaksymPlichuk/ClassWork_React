import { Box, Grid,IconButton } from "@mui/material";
import AuthorCard from "./AuthorCard";
import authorsJson from "./authors.json"
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import { Link } from "react-router";

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
                        <AuthorCard author={b} removeAuthorCallBack={removeAuthor} setFavoriteCallBack={setFavorite} />
                    </Grid>
                ))}
                <Grid size={authors.length % 4 == 0 ? 12 : 3} >
                    <Box sx={{ width: "100%", justifyContent: "center", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Link to="/authorsCreate">
                            <IconButton color="secondary">
                                <AddCircleIcon sx={{ fontSize: "3em" }} />
                            </IconButton>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
export default AuthorListPage;