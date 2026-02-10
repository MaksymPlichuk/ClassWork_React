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
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const AuthorCard = ({ author }) => {
    const baseURL = import.meta.env.VITE_AUTHORS_URL;
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(author.isFavorite);

    const removeAuthorHandle = async () => {
        try {
            await axios.delete(`${baseURL}/${author.id}`);
            dispatch({ type: "deleteAuthor", payload: author.id })
        } catch (error) {
            console.warn(error);
        }
    }
    const setFavoriteHandle = () => {
        const favoriteState = !isFavorite;
        setIsFavorite(favoriteState);
    }

    return (
        <Card sx={{ maxWidth: 345, height: "100%" }}>
            <CardHeader

                action={
                    <IconButton onClick={removeAuthorHandle} color='error' aria-label="settings">
                        <DeleteIcon />
                    </IconButton>
                }
                title={author.name}
            />
            <CardMedia
                sx={{ objectFit: "contain" }}
                component="img"
                height="350"
                image={
                    author.image ? author.image : "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg"
                }
                alt={author.name}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {author.birth_date}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={setFavoriteHandle} aria-label="add to favorites" color={isFavorite ? "error" : ""}
                >
                    <FavoriteIcon />
                </IconButton>
                <Link to={`update/${author.id}`}>
                    <IconButton aria-label="share" color='success'>
                        <EditIcon />
                    </IconButton>
                </Link>
            </CardActions>
        </Card>
    );
}
export default AuthorCard;