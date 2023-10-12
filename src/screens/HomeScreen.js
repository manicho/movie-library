import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  BellIcon,
  MagnifyingGlassCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import TrendingMovies from "../components/TrendingMovies";
import TopRatedMovies from "../components/TopRatedMovies";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularMovie,
  fetchTopRatedMovie,
  fetchTrendingMovie,
  fetchUpComingMovie,
  fetchGenres,
} from "../../utils/moviesapi";
import Loading from "../components/Loading";
import PopularMovies from "../components/PopularMovies/PopularMovies";
import UpComingMovies from "../components/UpComingMovies";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [genres, setGenres] = useState([]);

  const navigation = useNavigation();

  const { isLoading: isTrendingLoading } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovie,
    onSuccess: (data) => {
      setTrending(data.results);
    },
    onError: (error) => {
      console.log("Error fetching Trending Movies", error);
    },
  });

  const { isLoading: isTopRatedLoading } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: fetchTopRatedMovie,
    onSuccess: (data) => {
      setTopRated(data.results);
    },
    onError: (error) => {
      console.log("Error fetching Top Rated Movies", error);
    },
  });

  const { isLoading: isPopularLoading } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovie,
    onSuccess: (data) => {
      setPopular(data.results);
    },
    onError: (error) => {
      console.log("Error fetching Popular Movies", error);
    },
  });

  const { isLoading: isUpComingLoading } = useQuery({
    queryKey: ["upComingMovies"],
    queryFn: fetchUpComingMovie,
    onSuccess: (data) => {
      setUpComing(data.results);
    },
    onError: (error) => {
      console.log("Error fetching UpComing Movies", error);
    },
  });

  const { isLoading: isGenresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    onSuccess: (data) => {
      setGenres(data.genres);
    },
    onError: (error) => {
      console.log("Error fetching Genre", error);
    },
  });

  return (
    <View className="flex-1">
      <Image
        source={require("../../assets/movie_teather.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.9,
        }}
        resizeMode="cover"
      />
      <ScrollView className="mt-16">
        <StatusBar style="light" />

        {/* Welcome Title */}
        <View className="flex-row justify-between items-center mx-4 mg-4">
          <View className="border-2 border-white rounded-full overflow-hidden">
            <Image
              source={require("../../assets/avatar-svgrepo-com.png")}
              style={{ width: 45, height: 45 }}
              resizeMode="cover"
            />
          </View>

          {/* Notification and Search Icon */}
          <View className="flex-row space-x-4">
            <BellIcon size={30} strokeWidth={2} color="white" />
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassCircleIcon
                size={30}
                strokeWidth={2}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Movie Card */}
        {isTrendingLoading ? (
          <Loading />
        ) : (
          <ScrollView>
            {/* Tending Movies */}
            {trending?.length > 0 && <TrendingMovies data={trending} />}

            {/* Popular Movies */}
            {popular?.length > 0 && (
              <PopularMovies title="Popular" data={popular} />
            )}

            {/* Top Rated Movies */}
            {topRated?.length > 0 && (
              <TopRatedMovies
                genre={genres}
                title="Top Rated"
                data={topRated}
              />
            )}

            {/* UpComing Movies */}
            {upComing?.length > 0 && (
              <UpComingMovies title="UpComing" data={topRated} />
            )}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
}
