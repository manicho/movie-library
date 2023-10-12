import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../../../utils/moviesapi";

const { width, height } = Dimensions.get("window");

export default function TopRatedMovies({ title, genre, data }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    const itemGenre = genre.find((g) => g.id === item.genre_ids[0]);

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navigation.push("Movie", item)}
      >
        <View className="space-y-1 mr-4 mb-6">
          <Image
            source={{ uri: image500(item.poster_path) }}
            className="rounded-3xl relative"
            style={{ width: width * 0.63, height: height * 0.15 }}
          />

          <View className="absolute bottom-3 left-3">
            <Text className="text-neutral-300 ml-1 text-lg font-bold">
              {item.title.length > 20
                ? item.title.slice(0, 20) + "..."
                : item.title}
            </Text>

            <View className="flex-row">
              <Text className="text-neutral-300 ml-1 text-sm font-medium">
                {item.vote_average} *
              </Text>
              <Text className="text-neutral-300 ml-1 text-sm font-medium">
                {itemGenre?.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View className="space-y-4 my-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg font-bold">{title}</Text>
      </View>

      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />
    </View>
  );
}
