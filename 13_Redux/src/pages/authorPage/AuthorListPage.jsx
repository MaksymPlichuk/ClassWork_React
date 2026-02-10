import { Box, Grid, IconButton, Typography, CircularProgress } from "@mui/material";
import AuthorCard from "./AuthorCard";
import authorsJson from "./authors.json"
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const AuthorListPage = () => {

    const { authors, isLoaded } = useSelector(state => state.author);
    const dispatch = useDispatch();
    const baseURL = import.meta.env.VITE_AUTHORS_URL;

    useEffect(() => {
        if (!isLoaded) {
            fetchAuthors();
        }
    }, [])

    async function fetchAuthors() {
        const response = await axios.get(`${baseURL}?page_size=20&page=2`);  //?page_size=20&page=2

        const { data, status } = response;
        if (status == 200) {
            const newAuthors = []
            for (const author of data.data.items) {
                newAuthors.push(author)
            }
            dispatch({ type: "loadAuthors", payload: newAuthors });
            console.log(newAuthors);
        }
    }
    if (!isLoaded) {
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
                {authors.map((b, index) => (
                    <Grid size={3} key={index}>
                        <AuthorCard author={b} />
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