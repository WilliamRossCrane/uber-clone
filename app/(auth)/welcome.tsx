import { Image, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "../constants";
import CustomButton from "@/components/CustomButton";

const { width, height } = Dimensions.get("window");

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center p-5 pt-2">
            <Image
              source={item.image}
              className="w-[320px] h-[260px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-8">
              <Text className="text-black text-2xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-xs font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <View className="px-5 pb-5">
        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          onPress={() =>
            isLastSlide
              ? router.replace("/(auth)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
          className="w-full"
        />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
