import React, { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { icons } from "@/app/constants";
import Map from "@/components/Map";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const RideLayout = ({
  title,
  snapPoints,
  children,
}: {
  title?: string;
  snapPoints?: string[];
  children: React.ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const isDriverList = title === "Choose a Driver";

  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Map */}
        <Map className="flex-1" />

        {/* Header */}
        <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center"
          >
            <Image
              source={icons.backArrow}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <Text className="text-xl font-JakartaSemiBold ml-5">
            {title || "Go Back"}
          </Text>
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["45%", "85%"]}
          index={0}
        >
          {isDriverList ? (
            <BottomSheetView
              style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 40 }}
            >
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView
              style={{ flex: 1, paddingHorizontal: 20 }}
              contentContainerStyle={{ paddingBottom: 100 }}
            >
              {children}
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
