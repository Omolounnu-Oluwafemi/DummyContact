import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function IndexPage() {
  const [location, setLocation] =
    React.useState<Location.LocationObjectCoords | null>(null);

  async function getLocation() {
    const res = await Location.requestForegroundPermissionsAsync();
    if (res.status !== "granted") return null;
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);

    await AsyncStorage.setItem("location", JSON.stringify(location.coords));
    return location.coords;
  }

  return (
    <SafeAreaView>
      <Text>This is index page</Text>
      <Button onPress={getLocation} title="Get Location" />

      {location && (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}
    </SafeAreaView>
  );
}
