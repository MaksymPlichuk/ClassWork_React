import { Box, Grid } from "@mui/material";
import AuthorCard from "./AuthorCard";
import authors from "./authors.json"

const AuthorListPage = () => {
    return (
        <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
            
            <Grid container spacing={2} mx="100px" my="50px">
                {authors.map((b) => (
                    <Grid size={3} key={b.id}>
                        <AuthorCard author={b} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
export default AuthorListPage;