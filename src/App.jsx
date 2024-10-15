import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import HotelFilterForm from "./components/HotelFilterForm";
import HotelList from "./components/HotelList";
import axios from "axios";

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
        <Container>
            <Typography variant="h4" gutterBottom>
                Hotel Sorting System
            </Typography>
            <HotelFilterForm filters={filters} onFilterChange={handleFilterChange} setHotels={setHotels} />
            <HotelList hotels={hotels} />
        </Container>
    );
};

export default App;
