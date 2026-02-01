import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Stack, Typography, Rating } from "@mui/material";
import axios from "axios";

const BookDescription = () => {

    const navigate = useNavigate();
    const [book, setBook] = useState(null)

    const { id } = useParams();

    async function fetchBook() {
        const baseUrl = `https://api.bigbookapi.com`;
        const key = `dd33b0978ebd4fef81fd64cede9608f1`;
        const url = `${baseUrl}/${id}?api-key=${key}`;

        const resp = await axios.get(url)
        const { data, status } = resp;
        if (status == 200) {
            const formated = {
                id: data.id,
                coverUrl: data.image,
                pages: data.number_of_pages,
                year: data.publish_date,
                title: data.title,
                rating: data?.rating ?? 0,
                description: data.subtitle,
                authorName: data.authors[0].name
            }
            setBook(formated);
        }
        else { alert(`${status} Error`) }
    }


    useEffect(() => {
        const localData = localStorage.getItem('books');
        if (localData) {
            fetchBook();
        }
        else { navigate("/") }
    }, [id])

    if (!book) {
        return (
            <Typography variant="h4">
                Book not set
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
                        <Rating name="read-only" max={5} readOnly value={Math.round(book.rating * 10) / 2} />
                        <Typography variant="h5" sx={{ color: 'text.secondary', mt: "20%" }}> Pages: {book.pages} </Typography>
                        <Typography variant="h5" sx={{ color: 'text.secondary' }}> Year: {book.year} </Typography>
                        <Typography variant="h5" sx={{ color: 'text.secondary', mt: "10%" }}> {book.description} </Typography>

                    </div>
                </Stack>
            </Stack>
        </Box>
    );
}
export default BookDescription;