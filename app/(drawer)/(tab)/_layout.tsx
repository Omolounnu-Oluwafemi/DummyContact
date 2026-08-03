import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "red",
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={"explore"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
