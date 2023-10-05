import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-end items-center space-y-10 relative">
      <Image
        source={require("../../assets/avengers.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.3,
        }}
        resizeMode="cover"
      />

      <StatusBar style="light" />

      {/* Title and Button */}
      <View className="flex items-center justify-center py-28 max-w-[80%]">
        <View className="bg-red-600 p-4 rounded-3xl">
          <Text className="text-white text-4xl font-extrabold tracking-widest my-4">
            ML
          </Text>
        </View>
        <Text className="text-white text-4xl font-bold tracking-widest my-4">
          Movie Library
        </Text>
        <Text className="text-white tracking-widest mb-2 text-lg text-center font-medium">
          Watch and find movies that bring your mood back
        </Text>
      </View>
      <View className="my-4 mb-36">
        <TouchableOpacity
          className="px-12 py-3 rounded-lg bg-red-600"
          onPress={() => navigation.navigate("HomeTab")}
        >
          <Text className="text-white text-lg font-medium">Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
