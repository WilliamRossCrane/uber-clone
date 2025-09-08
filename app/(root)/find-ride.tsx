import { router } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "../constants";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride">
      <View className="px-5 pt-5">
        {/* From */}
        <Text className="text-lg font-JakartaSemiBold mb-2">From</Text>
        <View className="bg-white shadow-md shadow-neutral-300 rounded-xl p-2 mb-4">
          <GoogleTextInput
            icon={icons.target}
            initialLocation={userAddress!}
            containerStyle="bg-white"
            textInputBackgroundColor="#fff"
            handlePress={(location) => setUserLocation(location)}
          />
        </View>

        {/* To */}
        <Text className="text-lg font-JakartaSemiBold mb-2">To</Text>
        <View className="bg-white shadow-md shadow-neutral-300 rounded-xl p-2 mb-6">
          <GoogleTextInput
            icon={icons.map}
            initialLocation={destinationAddress!}
            containerStyle="bg-white"
            textInputBackgroundColor="#fff"
            handlePress={(location) => setDestinationLocation(location)}
          />
        </View>

        {/* Find Now button */}
        <View className="mt-2">
          <CustomButton
            title="Find Now"
            onPress={() => router.push(`/(root)/confirm-ride`)}
          />
        </View>
      </View>
    </RideLayout>
  );
};

export default FindRide;
