const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware to parse JSON and enable CORS
app.use(cors());
app.use(express.json());

// Expanded dummy hotel data
const hotels = [
    { id: 1, name: 'The Grand Central Hotel', city: 'New York', foodRating: 4.5, ambiance: 4.2, cost: 150 },
    { id: 2, name: 'Riverside Inn', city: 'New York', foodRating: 4.0, ambiance: 4.1, cost: 120 },
    { id: 3, name: 'Skyline Luxury Suites', city: 'New York', foodRating: 4.8, ambiance: 4.6, cost: 200 },
    { id: 4, name: 'Maple Leaf Hotel', city: 'New York', foodRating: 3.9, ambiance: 3.8, cost: 90 },
    { id: 5, name: 'Cityscape Boutique Hotel', city: 'New York', foodRating: 4.7, ambiance: 4.5, cost: 160 },
    { id: 6, name: 'Pacific View Resort', city: 'Los Angeles', foodRating: 4.3, ambiance: 4.2, cost: 130 },
    { id: 7, name: 'Sunset Bay Hotel', city: 'Los Angeles', foodRating: 4.6, ambiance: 4.3, cost: 140 },
    { id: 8, name: 'Coastal Haven Inn', city: 'Los Angeles', foodRating: 3.5, ambiance: 3.0, cost: 70 },
    { id: 9, name: 'Ocean Breeze Resort', city: 'Los Angeles', foodRating: 4.9, ambiance: 4.8, cost: 220 },
    { id: 10, name: 'Hollywood Star Hotel', city: 'Los Angeles', foodRating: 4.1, ambiance: 4.0, cost: 110 },
    { id: 11, name: 'Windy City Plaza', city: 'Chicago', foodRating: 4.4, ambiance: 4.3, cost: 180 },
    { id: 12, name: 'Lakeview Lodge', city: 'Chicago', foodRating: 3.8, ambiance: 3.9, cost: 95 },
    { id: 13, name: 'The Chicagoan', city: 'Chicago', foodRating: 4.2, ambiance: 4.1, cost: 150 },
    { id: 14, name: 'Magnificent Mile Hotel', city: 'Chicago', foodRating: 4.0, ambiance: 4.0, cost: 120 },
    { id: 15, name: 'Urban Oasis Hotel', city: 'Chicago', foodRating: 4.1, ambiance: 4.2, cost: 170 },
    { id: 16, name: 'The Royal Palace', city: 'Miami', foodRating: 4.6, ambiance: 4.5, cost: 210 },
    { id: 17, name: 'Sapphire Shores Resort', city: 'Miami', foodRating: 4.2, ambiance: 4.0, cost: 180 },
    { id: 18, name: 'Oceanview Suites', city: 'Miami', foodRating: 3.9, ambiance: 3.8, cost: 100 },
    { id: 19, name: 'Palm Tree Hotel', city: 'Miami', foodRating: 4.4, ambiance: 4.3, cost: 175 },
    { id: 20, name: 'The Sunflower Inn', city: 'Miami', foodRating: 4.5, ambiance: 4.2, cost: 160 },
    { id: 21, name: 'The Historic Inn', city: 'San Francisco', foodRating: 4.7, ambiance: 4.8, cost: 230 },
    { id: 22, name: 'Bay View Lodge', city: 'San Francisco', foodRating: 4.1, ambiance: 4.0, cost: 145 },
    { id: 23, name: 'Golden Gate Hotel', city: 'San Francisco', foodRating: 4.3, ambiance: 4.2, cost: 160 },
    { id: 24, name: 'Seaside Retreat', city: 'San Francisco', foodRating: 4.2, ambiance: 4.1, cost: 150 },
    { id: 25, name: 'Hillside Lodge', city: 'San Francisco', foodRating: 4.5, ambiance: 4.6, cost: 175 },
    { id: 26, name: 'Mountain Peak Inn', city: 'Denver', foodRating: 4.0, ambiance: 4.1, cost: 130 },
    { id: 27, name: 'The Rocky Mountain Hotel', city: 'Denver', foodRating: 4.3, ambiance: 4.4, cost: 165 },
    { id: 28, name: 'Ski Resort Lodge', city: 'Denver', foodRating: 4.6, ambiance: 4.5, cost: 200 },
    { id: 29, name: 'Pine Forest Retreat', city: 'Denver', foodRating: 4.1, ambiance: 4.0, cost: 110 },
    { id: 30, name: 'Canyon View Hotel', city: 'Denver', foodRating: 4.2, ambiance: 4.3, cost: 140 },
];

// Sorting algorithms
const mergeSort = (arr, key, order) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), key, order);
    const right = mergeSort(arr.slice(mid), key, order);
    return merge(left, right, key, order);
};

const merge = (left, right, key, order) => {
    const result = [];
    while (left.length && right.length) {
        const compare = order === 'asc'
            ? left[0][key] <= right[0][key]
            : left[0][key] >= right[0][key];
        if (compare) result.push(left.shift());
        else result.push(right.shift());
    }
    return result.concat(left, right);
};

const quickSort = (arr, key, order) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        const compare = order === 'asc'
            ? arr[i][key] < pivot[key]
            : arr[i][key] > pivot[key];
        if (compare) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return [...quickSort(left, key, order), pivot, ...quickSort(right, key, order)];
};

const bubbleSort = (arr, key, order) => {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < arr.length - 1; i++) {
            const compare = order === 'asc'
                ? arr[i][key] > arr[i + 1][key]
                : arr[i][key] < arr[i + 1][key];
            if (compare) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
            }
        }
    }
    return arr;
};

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Sorting API');
});


// Route to get hotels based on filters
app.get('/hotels', (req, res) => {
    const { city, foodRating, ambiance, cost, sortAlgorithm } = req.query;

    let filteredHotels = hotels;

    // Apply city filter
    if (city) {
        filteredHotels = filteredHotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase());
    }

    // Apply filters
    if (foodRating) {
        filteredHotels = filteredHotels.filter(hotel => hotel.foodRating >= 4.0);
    }
    if (ambiance) {
        filteredHotels = filteredHotels.filter(hotel => hotel.ambiance >= 4.0);
    }
    if (cost) {
        filteredHotels = filteredHotels.filter(hotel => hotel.cost <= 150);
    }

    // Sort filtered hotels based on the selected algorithm
    const sortingKey = cost ? 'cost' : foodRating ? 'foodRating' : 'ambiance';
    const order = cost ? 'asc' : 'desc';

    switch (sortAlgorithm) {
        case 'mergeSort':
            filteredHotels = mergeSort(filteredHotels, sortingKey, order);
            break;
        case 'quickSort':
            filteredHotels = quickSort(filteredHotels, sortingKey, order);
            break;
        case 'bubbleSort':
            filteredHotels = bubbleSort(filteredHotels, sortingKey, order);
            break;
        default:
            filteredHotels.sort((a, b) => {
                return order === 'asc' ? a[sortingKey] - b[sortingKey] : b[sortingKey] - a[sortingKey];
            });
    }

    // Limit to top 5 hotels
    res.json(filteredHotels.slice(0, 7));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
