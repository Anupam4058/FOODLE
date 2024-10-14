const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware to parse JSON and enable CORS
app.use(cors());
app.use(express.json());

// Expanded dummy hotel data
const hotels = [
    { id: 1, name: 'Hotel A', city: 'New York', foodRating: 4.5, ambiance: 4.2, cost: 150 },
    { id: 2, name: 'Hotel B', city: 'New York', foodRating: 4.0, ambiance: 4.1, cost: 120 },
    { id: 3, name: 'Hotel C', city: 'New York', foodRating: 4.8, ambiance: 4.6, cost: 200 },
    { id: 4, name: 'Hotel D', city: 'New York', foodRating: 3.9, ambiance: 3.8, cost: 90 },
    { id: 5, name: 'Hotel E', city: 'New York', foodRating: 4.7, ambiance: 4.5, cost: 160 },
    { id: 6, name: 'Hotel F', city: 'Los Angeles', foodRating: 4.3, ambiance: 4.2, cost: 130 },
    { id: 7, name: 'Hotel G', city: 'Los Angeles', foodRating: 4.6, ambiance: 4.3, cost: 140 },
    { id: 8, name: 'Hotel H', city: 'Los Angeles', foodRating: 3.5, ambiance: 3.0, cost: 70 },
    { id: 9, name: 'Hotel I', city: 'Los Angeles', foodRating: 4.9, ambiance: 4.8, cost: 220 },
    { id: 10, name: 'Hotel J', city: 'Los Angeles', foodRating: 4.1, ambiance: 4.0, cost: 110 },
    { id: 11, name: 'Hotel K', city: 'Chicago', foodRating: 4.4, ambiance: 4.3, cost: 180 },
    { id: 12, name: 'Hotel L', city: 'Chicago', foodRating: 3.8, ambiance: 3.9, cost: 95 },
    { id: 13, name: 'Hotel M', city: 'Chicago', foodRating: 4.2, ambiance: 4.1, cost: 150 },
    { id: 14, name: 'Hotel N', city: 'Chicago', foodRating: 4.0, ambiance: 4.0, cost: 120 },
    { id: 15, name: 'Hotel O', city: 'Chicago', foodRating: 4.1, ambiance: 4.2, cost: 170 },
];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Sorting API');
});

// Route to get hotels based on filters
app.get('/hotels', (req, res) => {
    const { city, foodRating, ambiance, cost } = req.query;
    console.log("Received filters:", req.query);  // Log received filters

    let filteredHotels = hotels;

    // Apply city filter
    if (city) {
        filteredHotels = filteredHotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase());
    }

    // Apply food rating filter (if checked)
    if (foodRating) {
        filteredHotels = filteredHotels.filter(hotel => hotel.foodRating >= 4.0);
    }

    // Apply ambiance filter (if checked)
    if (ambiance) {
        filteredHotels = filteredHotels.filter(hotel => hotel.ambiance >= 4.0);
    }

    // Apply cost efficiency filter (if checked)
    if (cost) {
        filteredHotels = filteredHotels.filter(hotel => hotel.cost <= 150);
    }

    // Sort filtered hotels based on the selected criteria
    if (cost) {
        filteredHotels.sort((a, b) => a.cost - b.cost); // Sort by cost (ascending)
    } else if (foodRating) {
        filteredHotels.sort((a, b) => b.foodRating - a.foodRating); // Sort by food rating (descending)
    } else if (ambiance) {
        filteredHotels.sort((a, b) => b.ambiance - a.ambiance); // Sort by ambiance (descending)
    }

    // Limit to top 5 hotels
    res.json(filteredHotels.slice(0, 5));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
