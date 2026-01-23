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
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const AuthorCard = ({ author, removeAuthorCallBack, setFavoriteCallBack }) => {
    const [isFavorite, setIsFavorite] = useState(author.isFavorite);

    const removeAuthorHandle = () => {
        removeAuthorCallBack(author.id)
    }
    const setFavoriteHandle = () => {
        const favoriteState = !isFavorite;
        setIsFavorite(favoriteState);

        setFavoriteCallBack(author.id, favoriteState)
    }

    return (
        <Card sx={{ maxWidth: 345, height: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src={author.imageUrl ? author.imageUrl : "https://media.istockphoto.com/id/1016744034/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=Rqti26VQj_fs-_hL15mJj6b84FEZNa00FJgZRaG5PD4="}
                    ></Avatar>
                }
                action={
                    <IconButton onClick={removeAuthorHandle} color='error' aria-label="settings">
                        <DeleteIcon />
                    </IconButton>
                }
                title={author.firstName + " " + author.lastName}
                subheader={author.author}
            />
            <CardMedia
                sx={{ objectFit: "contain" }}
                component="img"
                height="350"
                image={
                    author.imageUrl ? author.imageUrl : "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg"
                }
                alt={author.firstName}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {author.country}, {author.birthday}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={setFavoriteHandle} aria-label="add to favorites" color={isFavorite ? "error" : ""}
                >
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
export default AuthorCard;