import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SearchScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts"], // same key as ContactListScreen
    queryFn: fetchContacts,
  });

  async function fetchContacts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return res.json();
  }

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator style={{ marginTop: 32 }} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text style={{ padding: 16, color: "red" }}>Something went wrong</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Link href={`/contact/${item.id}`} style={{ padding: 16 }}>
            <Text>{item.name}</Text>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
