import { Box, Grid, IconButton, Typography, CircularProgress } from "@mui/material";
import CarCard from "./CarCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";


const CarListPage = () => {

    const { cars, isLoaded } = useSelector(state => state.car);
    const dispatch = useDispatch();
    const baseURL = import.meta.env.VITE_CARS_URL;

    const [filters, setFilters] = useState({
        year: "",
        color: "",
        manufacture: "",
        volume: "",
        minValue: "",
        maxValue: ""
    })

    useEffect(() => {
        if (!isLoaded) {
            fetchAuthors();
        }
    }, [])

    async function fetchAuthors() {
        const response = await axios.get(`${baseURL}?page_size=20&page=5`);  //?page_size=20&page=2

        const { data, status } = response;
        if (status == 200) {
            console.log(data);
            
            const newCars = []
            for (const car of data.data.items) {
                newCars.push(car)
            }
            dispatch({ type: "loadCars", payload: newCars });
            console.log(newCars);
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

    function handleChange() {

    }

    return (
        <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
                
            <Box sx={{flexGrow: 1}}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Box>
                    <Box sx={{ flexGrow: .5, mx: 5 }}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={baseURL}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>



            <Grid container spacing={2} mx="100px" my="50px">
                {cars.map((c, index) => (
                    <Grid size={3} key={index}>
                        <CarCard car={c} />
                    </Grid>
                ))}
                <Grid size={cars.length % 4 == 0 ? 12 : 3} >
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
export default CarListPage;