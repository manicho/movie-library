import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { image500 } from "../../../utils/moviesapi";

const { width, height } = Dimensions.get("window");

export default function MovieCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{ width: width * 0.8, height: height * 0.25 }}
        resizeMode="cover"
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
}
