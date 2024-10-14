import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const HotelList = ({ hotels }) => {
    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {hotels.map((hotel) => (
                <Card key={hotel.id} className="card">
                    <CardContent className="card-content">
                        <Typography variant="h6">{hotel.name}</Typography>
                        <Typography variant="body2">
                            Food Rating: {hotel.food_rating}
                        </Typography>
                        <Typography variant="body2">
                            Ambiance Rating: {hotel.ambiance_rating}
                        </Typography>
                        <Typography variant="body2">
                            Cost: {hotel.cost}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default HotelList;
