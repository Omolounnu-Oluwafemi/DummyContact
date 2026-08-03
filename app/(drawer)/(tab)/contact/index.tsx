import { Link } from "expo-router";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONTACTS = [
  { id: "1", name: "Jane Doe" },
  { id: "2", name: "John Smith" },
  { id: "3", name: "Ada Lovelace" },
];

export default function ContactListPage() {
  return (
    <SafeAreaView>
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/contact/${item.id}`} style={{ padding: 16 }}>
            <Text>{item.name}</Text>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
