import { useUser, useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import * as Location from "expo-location";
import {
  FlatList,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/app/constants";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/type";

export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const [hasPermission, setHasPermission] = useState(false);

  // Fetch recent rides from API
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`
  );

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      setHasPermission(true);

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0]?.name}, ${address[0]?.region}`,
      });
    })();
  }, []);

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <FlatList
        data={recentRides?.slice(0, 5)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center flex-1">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  style={{ width: 160, height: 160 }}
                  resizeMode="contain"
                />
                <Text className="text-sm mt-2">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            {/* Welcome + Sign out */}
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold">
                Welcome {user?.firstName} 👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            {/* Search box */}
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            {/* Current location */}
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Your current location
            </Text>
            <View className="flex flex-row items-center bg-transparent h-[300px]">
              <Map />
            </View>

            {/* Recent rides heading */}
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
}
