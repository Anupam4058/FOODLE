import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import HotelFilterForm from "./components/HotelFilterForm";
import HotelList from "./components/HotelList";
import axios from "axios";
import './App.css'; // Import the updated CSS

const App = () => {
    const [hotels, setHotels] = useState([]);
    const [filters, setFilters] = useState({
        city: "",
        foodRating: false,
        ambiance: false,
        cost: false,
        sortingAlgorithm: "mergeSort", // Default sorting algorithm
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const fetchHotels = async () => {
        try {
            const query = `/hotels?city=${filters.city}&foodRating=${filters.foodRating}&ambiance=${filters.ambiance}&cost=${filters.cost}&sortingAlgorithm=${filters.sortingAlgorithm}`;
            const response = await axios.get(query);
            setHotels(response.data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    useEffect(() => {
        if (filters.city) {
            fetchHotels(); // Fetch hotels only if city is selected
        }
    }, [filters]);

    return (
        <Container maxWidth="lg" className="app-container">
            <Box className="hero-section">
                <Typography variant="h3" className="hero-text">
                    Discover the Best Hotels with Ease
                </Typography>
                <Typography variant="h6" className="hero-subtext">
                    Use filters to find top-rated hotels in your city!
                </Typography>
            </Box>
            <Paper elevation={3} className="form-container">
                <HotelFilterForm filters={filters} onFilterChange={handleFilterChange} setHotels={setHotels} />
            </Paper>
            <HotelList hotels={hotels} />
        </Container>
    );
};

export default App;
