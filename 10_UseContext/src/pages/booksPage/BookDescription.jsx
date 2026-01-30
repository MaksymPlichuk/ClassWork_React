import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Stack, Typography } from "@mui/material";

const BookDescription = () => {

    const navigate = useNavigate();
    const [book, setBook] = useState(null)

    const { id } = useParams();
    useEffect(() => {
        const localData = localStorage.getItem('books');
        if (localData) {
            const books = JSON.parse(localData);
            setBook(books[id - 1]);
        }
        else { navigate("/") }
    }, [id])

    if (!book) {
        return (
            <Typography variant="h4">
                Rendering.0.
            </Typography>
        );
    }

    return (
        <Box sx={{ display: "flex", mt: "10%", alignItems: "center" }}>
            <Box sx={{ flexGrow: .5 }}>
                <img style={{ maxHeight: 650, maxWidth: 650 }} src={book.coverUrl} alt="bookimage" />
            </Box>

            <Stack sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }} >
                <Stack direction="row" sx={{ gap: 2 }}>
                    <div>
                        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
                            {book.title}
                        </Typography>
                        <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                            {book.authorName}
                        </Typography>
                        <Typography variant="h5" sx={{ color: 'text.secondary', mt: "20%" }}>  {book.genre} </Typography>
                        <Typography variant="h5" sx={{ color: 'text.secondary' }}> {book.year} </Typography>
                        <Typography variant="h5" sx={{ color: 'text.secondary', mt: "10%" }}> {book.description} </Typography>

                    </div>
                </Stack>
            </Stack>
        </Box>
    );
}
export default BookDescription;