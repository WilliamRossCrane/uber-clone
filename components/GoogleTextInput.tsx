import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useState, useEffect } from "react";
import Constants from "expo-constants";

import { icons } from "@/app/constants";

interface Suggestion {
  place_id: string;
  description: string;
  lat: number;
  lng: number;
}

interface GoogleInputProps {
  icon?: any;
  initialLocation?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textInputBackgroundColor?: string;
  handlePress: (data: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

const googleKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor = "white",
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState(initialLocation ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounce input
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchSuggestions = async (input: string) => {
    if (!googleKey) {
      console.warn("Google API key missing!");
      return;
    }

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
        )}&key=${googleKey}&components=country:au&types=geocode`
      );
      const data = await res.json();

      if (!data.predictions || !Array.isArray(data.predictions)) return;

      const places: Suggestion[] = await Promise.all(
        data.predictions.map(async (p: any) => {
          const detailsRes = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${p.place_id}&key=${googleKey}`
          );
          const detailsData = await detailsRes.json();
          return {
            place_id: p.place_id,
            description: p.description,
            lat: detailsData.result.geometry.location.lat,
            lng: detailsData.result.geometry.location.lng,
          };
        })
      );

      setSuggestions(places);
    } catch (e) {
      console.error("Google Places autocomplete error:", e);
    }
  };

  const onSelect = (item: Suggestion) => {
    setQuery(item.description);
    setSuggestions([]);
    setShowDropdown(false);
    handlePress({
      latitude: item.lat,
      longitude: item.lng,
      address: item.description,
    });
  };

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: textInputBackgroundColor },
          containerStyle && StyleSheet.flatten(containerStyle),
        ]}
      >
        <Image source={icon ?? icons.search} style={styles.icon} />
        <TextInput
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setShowDropdown(true);
          }}
          placeholder="Where do you want to go?"
          placeholderTextColor="gray"
          style={styles.textInput}
        />
      </View>

      {showDropdown && suggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => onSelect(item)}
                style={[
                  styles.suggestionItem,
                  index === suggestions.length - 1 && { borderBottomWidth: 0 },
                ]}
                activeOpacity={0.7}
              >
                <Image source={icons.search} style={styles.suggestionIcon} />
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 50,
    zIndex: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    height: "100%",
  },
  dropdown: {
    position: "absolute",
    top: 55,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    zIndex: 9999,
    maxHeight: 250,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "white",
  },
  suggestionIcon: {
    width: 16,
    height: 16,
    marginRight: 12,
    opacity: 0.6,
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    lineHeight: 20,
  },
});

export default GoogleTextInput;
