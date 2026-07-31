import { router } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function profilePage() {
  return (
    <SafeAreaView>
      <Text>This is profile page</Text>
      <Button onPress={() => router.back()} title="Go Back" />
    </SafeAreaView>
  );
}
