import { NextFunction, Request, Response, Router } from "express";
import fetch from "node-fetch";
import config from "../config";

const router = Router();

const getWeather = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req;
    const latitude: any = query.lat;
    const longitude: any = query.lon;

    if (!latitude || !longitude) {
      res.status(400).json({ error: "Latitude and Longiude are mandatory" }); // Bad request
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.openWeatherApiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (Math.floor(response.status / 100) !== 2) {
      res.status(response.status).json({ error: data.message });
      return;
    }

    const weather = {
      temperature: data?.main?.temp,
      description: data?.weather?.[0]?.description,
      humidity: data?.main?.humidity,
      windSpeed: data?.wind?.speed,
    };

    res.status(200).json({ data: weather, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

router.get("/", getWeather);

export default router;
