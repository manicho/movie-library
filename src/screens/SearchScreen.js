import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { XMarkIcon } from "react-native-heroicons/outline";
import { image500, searchMovies } from "../../utils/moviesapi";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      setLoading(true);

      searchMovies({
        query: search,
        include_adult: false,
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);

        if (data && data.results) {
          setResults(data.results);
        }
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View className="flex-1 relative">
      <Image
        source={require("../../assets/gradient1.jpg")}
        style={{
          width,
          height,
        }}
        className="absolute"
      />

      {/* Search Input */}
      <View className="mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-white rounded-lg">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your favorite movies"
          placeholderTextColor={"gray"}
          className="pb-1 pl-6 flex-1 font-medium text-black tracking-wider"
        />

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="space-y-6"
        >
          <Text className="text-white font-semibold ml-1 text-lg mt-2">
            {results.length} Results
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri:
                          image500(item.poster_path) ||
                          "https://media.istockphoto.com/vectors/error-icon-vector-illustration-vector-id922024224?k=6&m=922024224&s=612x612&w=0&h=LXl8Ul7bria6auAXKIjlvb6hRHkAodTqyqBeA6K7R54=",
                      }}
                      className="rounded-3xl"
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                    />
                    <Text className="text-gray-300 font-bold text-lg ml-1">
                      {item.title.length > 19
                        ? item.title.slice(0, 19) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        ""
      )}
    </View>
  );
}
