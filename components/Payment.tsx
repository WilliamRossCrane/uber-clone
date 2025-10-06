import { useStripe } from "@stripe/stripe-react-native";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const confirmHandler = async (
    paymentMethod,
    shouldSavePaymentMethod,
    intentCreationCallback
  ) => {
    // Make a request to your own server.
    const myServerResponse = await fetch("YOUR_SERVER_URL_HERE");
    // Call the `intentCreationCallback` with your server response's client secret or error
    const { clientSecret, error } = await myServerResponse.json();
    if (clientSecret) {
      intentCreationCallback({ clientSecret });
    } else {
      intentCreationCallback({ error });
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });

    if (error) {
      // handle error
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
    <CustomButton
      title="Confirm Ride"
      className="my-10"
      onPress={openPaymentSheet}
    />
  );
};

export default Payment;
