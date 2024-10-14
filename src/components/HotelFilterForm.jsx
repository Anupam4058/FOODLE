import React, { useState } from "react";
import { TextField, FormControlLabel, Checkbox, Box, Button, CircularProgress, Alert } from "@mui/material";
import axios from 'axios';

const HotelFilterForm = ({ filters, onFilterChange, setHotels }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle filter changes
    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        onFilterChange({
            ...filters,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle form submission to apply filters and fetch data from the backend
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        // Construct the query string
        const query = `http://localhost:5000/hotels?city=${filters.city}&foodRating=${filters.foodRating ? 'true' : 'false'}&ambiance=${filters.ambiance ? 'true' : 'false'}&cost=${filters.cost ? 'true' : 'false'}`;
        console.log("Query URL:", query);  // Log the complete URL being requested


        try {
            const response = await axios.get(query);
            setHotels(response.data);  // Update the hotels data
        } catch (err) {
            console.error('Error fetching hotels:', err);  // Log error for debugging
            setError('Failed to fetch hotels. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="filter-container" display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            {/* City input */}
            <TextField
                label="City"
                variant="outlined"
                name="city"
                value={filters.city}
                onChange={handleInputChange}
                InputProps={{
                    style: { backgroundColor: 'white', borderRadius: 8 },
                }}
            />

            {/* Good Food Rating filter */}
            <FormControlLabel
                control={
                    <Checkbox
                        name="foodRating"
                        checked={filters.foodRating}
                        onChange={handleInputChange}
                        sx={{ color: 'white' }}
                    />
                }
                label="Good Food Rating"
            />

            {/* Good Ambiance filter */}
            <FormControlLabel
                control={
                    <Checkbox
                        name="ambiance"
                        checked={filters.ambiance}
                        onChange={handleInputChange}
                        sx={{ color: 'white' }}
                    />
                }
                label="Good Ambiance"
            />

            {/* Cost Efficiency filter */}
            <FormControlLabel
                control={
                    <Checkbox
                        name="cost"
                        checked={filters.cost}
                        onChange={handleInputChange}
                        sx={{ color: 'white' }}
                    />
                }
                label="Cost Efficiency"
            />

            {/* Apply Filters button */}
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Apply Filters"}
            </Button>

            {/* Error message */}
            {error && (
                <Box mt={2}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}
        </Box>
    );
};

export default HotelFilterForm;
