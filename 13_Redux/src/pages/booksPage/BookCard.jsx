import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Rating } from "@mui/material";
import axios from 'axios';
import { useDispatch } from 'react-redux';

const BookCard = ({ book, role }) => {

    const dispatch = useDispatch();
    const [color, setColor] = useState(false);

    const setColorHandle = () => {
        const isFavorite = !color;
        setColor(isFavorite);
    }


    const  deleteCardHandle = async () => {
        try {
            //const baseUrl = import.meta.env.VITE_BOOKS_URL;
            //await axios.delete(`${baseUrl}/${book.id}`);
            dispatch({ type: "removeBook", payload: book.id });
        }
        catch (err) {
            console.log(err);
        }
    }



return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
        <CardHeader
            avatar={
                <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    src="https://knu.ua/img/kobzar.jpg"
                ></Avatar>
            }
            action={
                <IconButton onClick={deleteCardHandle} color='error' aria-label="settings">
                    <DeleteIcon />
                </IconButton>
            }
            title={book.title}
            subheader={book.authorName}
        />
        <Link to={`/books/description/${book.id}`}>
            <CardMedia
                sx={{ objectFit: "contain" }}
                component="img"
                height="350"
                image={
                    book.coverUrl ? book.coverUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                }
                alt={book.title}
            />
        </Link>
        <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <Rating name="read-only" max={5} readOnly value={Math.round(book.rating)} />
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton
                onClick={setColorHandle} aria-label="add to favorites" color={color ? "error" : ""}
            >
                <FavoriteIcon />
            </IconButton>

            {role != "user" ?
                <Link to={`update/${book.id}`}>
                    <IconButton aria-label="share" color='success'>
                        <EditIcon />
                    </IconButton>
                </Link> : null}
        </CardActions>
    </Card>
);
}
export default BookCard;