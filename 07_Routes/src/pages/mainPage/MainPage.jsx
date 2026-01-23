import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";
const MainPage = () => {
    return (
        <Box sx={{ textAlign: "center", mt: "2em" }}>
            <Typography variant="h3">Main Page</Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/books">
                    <Button variant="contained" sx={{ mx: 3 }}>Books</Button>
                </Link>
                <Link to="/authors">
                    <Button variant="contained" sx={{ mx: 3 }} >Authors</Button>
                </Link>
            </div>
        </Box>
    );
}
export default MainPage;