import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/app/constants";
import { fetchAPI } from "@/lib/fetch";

type PaymentProps = {
  fullName?: string;
  email?: string;
  amount?: number;
  driverId?: string;
  rideTime?: number;
};

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const safeAmount = amount ?? 10.99;

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: Math.round(safeAmount * 100),
          currencyCode: "USD",
        },
        confirmHandler: async (
          paymentMethod,
          shouldSavePaymentMethod,
          intentCreationCallback
        ) => {
          const { paymentIntent, customer } = await fetchAPI(
            "/(api)/(stripe)/create",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: fullName || email?.split("@")[0] || "Test User",
                email: email || "test@example.com",
                amount: safeAmount,
                paymentMethodId: paymentMethod.id,
              }),
            }
          );

          if (paymentIntent?.client_secret) {
            const { result } = await fetchAPI("/(api)/(stripe)/pay", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                payment_method_id: paymentMethod.id,
                payment_intent_id: paymentIntent.id,
                customer_id: customer,
                client_secret: paymentIntent.client_secret,
              }),
            });

            if (result?.client_secret) {
              // Optional: create ride if driverId and rideTime provided
              if (driverId && rideTime) {
                await fetchAPI("/(api)/ride/create", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ride_time: rideTime.toFixed(0),
                    fare_price: Math.round(safeAmount * 100),
                    payment_status: "paid",
                    driver_id: driverId,
                  }),
                });
              }

              intentCreationCallback({ clientSecret: result.client_secret });
            }
          }
        },
      },
      returnURL: "myapp://book-ride",
    });

    if (error) {
      Alert.alert("Error initializing payment sheet", error.message);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      <CustomButton
        title={`Pay $${safeAmount.toFixed(2)} USD`}
        className="my-10"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />
          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>
          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>
          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
