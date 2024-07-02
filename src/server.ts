// Import the 'express' module
import express from "express";
import searchCityRouter from "./geoLocation";
import getWeatherRouter from "./weather";

import cors from "cors";

// Create an Express application
const app = express();

// Set the port number for the server
const port = 4000;

app.use(cors());

app.use("/search", searchCityRouter);
app.use("/weather", getWeatherRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});
