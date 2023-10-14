import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import { image500 } from "../../utils/moviesapi";
import { fetchPersonDetails, fetchPersonMovies } from "../../utils/moviesapi";
import PopularMovies from "../components/PopularMovies/PopularMovies";

const { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);

    setLoading(false);

    if (data) setPerson(data);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);

    if (data) setPersonMovies(data.cast);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-800 px-2 py-26 relative"
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <Image
        source={require("../../assets/gradient2.jpg")}
        style={{
          width,
          height: "100%",
        }}
        className="absolute"
        resizeMode="cover"
      />

      {/* Close button */}
      <View className="flex-row justify-between absolute right-0 top-4 mx-4 z-10 my-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-xl p-2 bg-[#2496ff]"
        >
          <XMarkIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </View>

      {/* Cast Details */}
      {loading ? (
        <Loading />
      ) : (
        <View className="mt-24">
          <View className="flex-row justify-center space-x-4">
            <View className="items-center rounded-lg overflow-hidden">
              <Image
                source={{
                  uri: image500(person.profile_path),
                }}
                style={{
                  width: width * 0.35,
                  height: height * 0.3,
                }}
                resizeMode="cover"
              />
            </View>

            <View className="mt-6 w-1/2 space-y-3">
              <Text className="text-2xl text-white font-bold text-left">
                {person?.name}
              </Text>

              <Text className="text-white font-bold text-base text-left p-1 w-1/2 bg-orange-400">
                {person?.popularity?.toFixed(2)} %
              </Text>

              <Text className="text-white font-bold text-base text-left">
                {person?.place_of_birth}
              </Text>

              <Text className="text-white font-bold text-base text-left">
                {person?.birthday}
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg font-bold">Biography</Text>
            <Text className="text-neutral-100 tracking-wide leading-6">
              {person?.biography ? person.biography : "N/A"}
            </Text>
          </View>
          {/* </View> */}

          {/* Cast Movies */}
          {person?.id && personMovies.length > 0 && (
            <PopularMovies title="Movies" data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
}
