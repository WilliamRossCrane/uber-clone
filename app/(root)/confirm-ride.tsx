import { router } from "expo-router";
import { FlatList, View } from "react-native";

import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item) => String(item.id)}
        extraData={selectedDriver} // <- ensures FlatList re-renders when selection changes
        renderItem={({ item }) => (
          <DriverCard
            selected={selectedDriver} // keep numeric selected in store
            setSelected={() => setSelectedDriver(Number(item.id))} // keep Number(...)
            item={item}
          />
        )}
        contentContainerStyle={{
          backgroundColor: "white",
          paddingBottom: 40,
        }}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
