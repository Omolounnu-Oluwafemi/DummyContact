import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Alert, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ExplorePage() {
  const [location, setLocation] =
    React.useState<Location.LocationObjectCoords | null>(null);

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log("Camera permission status:", status);
    if (status !== "granted") return;
    try {
      const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
      if (!result.canceled) {
        console.log(result.assets[0].uri);
      }
    } catch (err) {
      console.log("Camera error:", err);
    }
  }
  useEffect(() => {
    async function fetchLocation() {
      const location = await AsyncStorage.getItem("location");
      setLocation(location ? JSON.parse(location) : null);
    }
    fetchLocation();
  }, []);

  async function clearLocation() {
    Alert.alert(
      "Clear Location",
      "Are you sure you want to clear the location?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            setLocation(null);
            await AsyncStorage.removeItem("location");
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView>
      <Text>This is Explore page</Text>
      <Button onPress={() => router.back()} title="Go Back" />
      <Button onPress={() => router.push("/profile")} title="Go to Profile" />
      <Button onPress={takePhoto} title="Take Photo" />

      {location && (
        <Text
          style={{
            marginTop: 16,
            textDecorationLine: "underline",
            textDecorationColor: "blue",
          }}
        >
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}

      <Button onPress={clearLocation} title="Clear Location" />
    </SafeAreaView>
  );
}
