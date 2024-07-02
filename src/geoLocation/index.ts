import { NextFunction, Request, Response, Router } from "express";
import fetch from "node-fetch";
import config from "../config";

const router = Router();

interface cityResponse {
  name: string;
  local_names: string[];
  lat: number;
  lon: number;
  country: string;
  state: string;
}

const searchCities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req;
    const wildcard: any = query.city;

    if (!wildcard || wildcard?.length < 3) {
      res
        .json({ error: "Please enter at least 3 characters to search city" })
        .status(400); // Bad request
      return;
    }

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${wildcard}&limit=5&appid=${config.openWeatherApiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (Math.floor(response.status / 100) !== 2) {
      res.status(response.status).json({ error: data.message });
      return;
    }

    const cityResults = data.map((eachCity: cityResponse) => ({
      name: eachCity.name,
      country: eachCity.country,
      state: eachCity.state,
      lat: eachCity.lat,
      lon: eachCity.lon,
    }));

    res.json({ data: cityResults, status: "success" }).status(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

router.get("/", searchCities);

export default router;
