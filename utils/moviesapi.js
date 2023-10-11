import { movieapikey } from "./apikey";
import axios from "axios";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${movieapikey}`;

const movieApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// Get images in different sizes
export const image500 = (posterpath) =>
  posterpath ? "https://image.tmdb.org/t/p/w500" + posterpath : null;

export const fetchTrendingMovie = () => {
  return movieApiCall(trendingMoviesEndpoint);
};
