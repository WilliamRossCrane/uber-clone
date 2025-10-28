import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/app/constants";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-2xl font-JakartaBold">Chat</Text>
        <View className="flex-1 h-fit flex justify-center items-center">
          <Image
            source={images.message}
            alt="message"
            className="w-[260px] h-[180px] -mt-10"
            resizeMode="contain"
          />
          <Text className="text-2xl font-JakartaBold mt-3">
            No Messages Yet
          </Text>
          <Text className="text-2 mt-2 text-center px-7">
            Start a conversation with your driver to confirm pickup details.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
