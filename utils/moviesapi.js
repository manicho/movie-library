import { movieapikey } from "./apikey";
import axios from "axios";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${movieapikey}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${movieapikey}`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${movieapikey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${movieapikey}`;
const genresEndpoint = `${apiBaseUrl}/genre/movie/list?api_key=${movieapikey}`;

// Movie Details Endpoint
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${movieapikey}`;

const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${movieapikey}`;

const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${movieapikey}`;

const movieApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
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

export const fetchPopularMovie = () => {
  return movieApiCall(popularMoviesEndpoint);
};

export const fetchUpComingMovie = () => {
  return movieApiCall(upComingMoviesEndpoint);
};

export const fetchTopRatedMovie = () => {
  return movieApiCall(topRatedMoviesEndpoint);
};

export const fetchGenres = () => {
  return movieApiCall(genresEndpoint);
};

export const fetchMovieDetails = (id) => {
  return movieApiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (movieId) => {
  return movieApiCall(movieCreditsEndpoint(movieId));
};

export const fetchSimilarMovies = (movieId) => {
  return movieApiCall(similarMoviesEndpoint(movieId));
};
