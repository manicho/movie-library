import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  BellIcon,
  MagnifyingGlassCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import TrendingMovies from "../components/TrendingMovies";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovie } from "../../utils/moviesapi";
import Loading from "../components/Loading";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const navigation = useNavigation();

  const { isLoading: isTrendingLoading } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovie,
    onSuccess: (data) => {
      setTrending(data.results);
    },
    onError: (error) => {
      console.log("Error fetching trending Movies", error);
    },
  });

  // console.log("Trending Movies", trending);

  return (
    <View className="flex-1">
      <Image
        source={require("../../assets/captain_america.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
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
            {trending?.length > 0 && <TrendingMovies data={trending} />}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
}
