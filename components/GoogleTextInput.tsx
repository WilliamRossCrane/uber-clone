import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import Constants from "expo-constants";

import { icons } from "@/app/constants";
import { GoogleInputProps } from "@/types/type";

const geoapifyKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_GEOAPIFY_API_KEY;

interface Suggestion {
  place_id: string;
  formatted: string;
  lat: number;
  lon: number;
}

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle = "",
  textInputBackgroundColor = "white",
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState(initialLocation ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!geoapifyKey) {
      console.warn(
        "Geoapify API key is missing! Check .env and app.config.js."
      );
    }
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            query
          )}&limit=5&apiKey=${geoapifyKey}`
        );
        const data = await res.json();

        if (!data.features || !Array.isArray(data.features)) {
          setSuggestions([]);
          return;
        }

        const places: Suggestion[] = data.features.map((f: any) => ({
          place_id: f.properties.place_id,
          formatted: f.properties.formatted,
          lat: f.properties.lat,
          lon: f.properties.lon,
        }));

        setSuggestions(places);
      } catch (e) {
        console.error("Geoapify autocomplete error:", e);
      }
    };

    fetchSuggestions();
  }, [query]);

  const onSelect = (item: Suggestion) => {
    setQuery(item.formatted);
    setSuggestions([]);
    setShowDropdown(false);
    handlePress({
      latitude: item.lat,
      longitude: item.lon,
      address: item.formatted,
    });
  };

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: textInputBackgroundColor },
        ]}
      >
        <Image source={icon ? icon : icons.search} style={styles.icon} />
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
                <Text style={styles.suggestionText}>{item.formatted}</Text>
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
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 45,
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
    top: 50,
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
