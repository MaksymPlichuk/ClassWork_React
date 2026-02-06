import { Box, Grid,IconButton } from "@mui/material";
import AuthorCard from "./AuthorCard";
import authorsJson from "./authors.json"
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

const AuthorListPage = () => {
    const [authors, setAuthors] = useState([]);
    const baseURL = import.meta.env.VITE_AUTHORS_URL;

    useEffect(() => {
        fetchAuthors();
    }, [])

    async function fetchAuthors() {
        const response = await axios.get(`${baseURL}?page_size=20&page=2`);  //?page_size=20&page=2

        const { data, status } = response;
        if (status == 200) {
            const newAuthors = []
            for (const author of data.data.items) {
                newAuthors.push(author)
            }
            setAuthors(newAuthors);
            console.log(newAuthors);
        }
    }

    const removeAuthor = async (id) => {
        const newList = authors.filter(b => b.id !== id)
        setAuthors(newList);
        try {
           await axios.delete(`${baseURL}/${id}`);
        } catch (error) {
            console.warn(error);
        }
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
                        <Link to="create">
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