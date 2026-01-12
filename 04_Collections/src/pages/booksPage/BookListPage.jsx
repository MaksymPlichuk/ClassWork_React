import { Box, Grid } from "@mui/material";
import BookCard from "./BookCard";

const BookListPage = () => {
    return (
        <Box>
            <Grid>
                <BookCard />
            </Grid>
        </Box>
    );
}
export default BookListPage;