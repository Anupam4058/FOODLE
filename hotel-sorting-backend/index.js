const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

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

app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Sorting API');
});


// Bubble sort
function bubbleSort(array, key, ascending = true) {
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (ascending ? array[j][key] > array[j + 1][key] : array[j][key] < array[j + 1][key]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
            }
        }
    }
    return array;
}

// Quick sort
function quickSort(array, key, ascending = true) {
    if (array.length <= 1) return array;
    const pivot = array[array.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < array.length - 1; i++) {
        if (ascending ? array[i][key] < pivot[key] : array[i][key] > pivot[key]) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    return [...quickSort(left, key, ascending), pivot, ...quickSort(right, key, ascending)];
}

// Merge sort
function mergeSort(array, key, ascending = true) {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle), key, ascending);
    const right = mergeSort(array.slice(middle), key, ascending);

    return merge(left, right, key, ascending);
}

function merge(left, right, key, ascending) {
    let result = [];
    while (left.length && right.length) {
        if (ascending ? left[0][key] < right[0][key] : left[0][key] > right[0][key]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return [...result, ...left, ...right];
}

app.get("/hotels", (req, res) => {
    const { city, filter, sortMethod } = req.query;
    let filteredHotels = hotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase());

    // Sort hotels based on the selected sorting method and filter
    switch (sortMethod) {
        case "bubbleSort":
            filteredHotels = bubbleSort(filteredHotels, filter, filter === "cost");
            break;
        case "quickSort":
            filteredHotels = quickSort(filteredHotels, filter, filter === "cost");
            break;
        case "mergeSort":
            filteredHotels = mergeSort(filteredHotels, filter, filter === "cost");
            break;
        default:
            break;
    }

    res.json(filteredHotels);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
