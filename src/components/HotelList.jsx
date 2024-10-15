// HotelList.jsx

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const HotelList = ({ hotels }) => {
    return (
        <Box display="flex" flexDirection="column" gap={3} alignItems="center">
            {hotels.length > 0 ? (
                hotels.map((hotel) => (
                    <Card key={hotel.id} style={{ width: "100%", maxWidth: 600 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {hotel.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                City: {hotel.city}
                            </Typography>
                            <Typography variant="body2">
                                Food Rating: {hotel.foodRating} / 5
                            </Typography>
                            <Typography variant="body2">
                                Ambiance Rating: {hotel.ambiance} / 5
                            </Typography>
                            <Typography variant="body2">
                                Cost Efficiency: ₹{hotel.cost}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="body1" color="text.secondary">
                    No hotels found for the selected criteria.
                </Typography>
            )}
        </Box>
    );
};

export default HotelList;
