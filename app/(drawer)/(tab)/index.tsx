import { router } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function IndexPage() {
  return (
    <SafeAreaView>
      <Text>This is index page</Text>
      <Button onPress={() => router.push("/explore")} title="Go to Explore" />
    </SafeAreaView>
  );
}
