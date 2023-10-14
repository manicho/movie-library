import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { image500 } from "../../utils/moviesapi";

const { width, height } = Dimensions.get("window");

export default function SavedScreen() {
  const navigation = useNavigation();
  const [savedMovies, setSavedMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // load saved movies from AsyncStorage when the screen is on focus
      const loadSavedMovies = async () => {
        try {
          const savedMovies = await AsyncStorage.getItem("savedMovies");
          const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];

          setSavedMovies(savedMoviesArray);
        } catch (error) {
          console.log(error);
        }
      };

      loadSavedMovies();
    }, [navigation])
  );

  const clearSavedMovies = async () => {
    try {
      await AsyncStorage.removeItem("savedMovies");
      setSavedMovies([]);
    } catch (error) {
      console.log("error cleaning saved movies");
    }
  };

  return (
    <ScrollView>
      <View className="relative flex-1">
        <ImageBackground
          source={require("../../assets/gradient2.jpg")}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        >
          <View className="mt-12 p-4">
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-xl text-white">Saved Movies</Text>
              <TouchableOpacity
                onPress={clearSavedMovies}
                className="bg-blue-800 py-2 px-4 rounded-lg"
              >
                <Text className="font-bold text-lg text-white">Clear</Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}

            <View className="flex-row justify-between flex-wrap">
              {savedMovies.map((movie, index) => (
                <View key={index} className="flex-row mt-4">
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.push("Movie", movie)}
                  >
                    <Image
                      source={{
                        uri: image500(movie.poster_path),
                      }}
                      className="w-40 h-48 rounded-3xl"
                      style={{
                        width: width * 0.41,
                        height: height * 0.25,
                      }}
                    />

                    <Text className="text-gray-300 font-bold text-lg ml-1">
                      {movie?.title?.length > 15
                        ? movie?.title?.slice(0, 15) + "..."
                        : movie?.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}
