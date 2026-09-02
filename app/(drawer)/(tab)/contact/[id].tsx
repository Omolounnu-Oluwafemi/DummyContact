import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ContactDetail = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { city: string };
};

export default function ContactDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  async function fetchContactById(): Promise<ContactDetail> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return res.json();
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts", id], // same key prefix as ContactListPage
    queryFn: fetchContactById,
  });

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator style={{ marginTop: 32 }} />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView>
        <Text style={{ padding: 16, color: "red" }}>Something went wrong</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ padding: 16, gap: 4 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{data.name}</Text>
      <Text>{data.email}</Text>
      <Text>{data.phone}</Text>
      <Text>{data.company.name}</Text>
      <Text>{data.address.city}</Text>
    </SafeAreaView>
  );
}
