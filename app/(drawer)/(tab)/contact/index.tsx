import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// type Contact = { id: number; name: string };

// export default function ContactListPage() {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchContacts() {
//       try {
//         const res = await fetch("https://jsonplaceholder.typicode.com/users");
//         if (!res.ok)
//           throw new Error(`Request failed with status ${res.status}`);
//         const data: Contact[] = await res.json();
//         setContacts(data);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "Failed to fetch contacts",
//         );
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchContacts();
//   }, []);

//   if (loading) {
//     return (
//       <SafeAreaView>
//         <ActivityIndicator style={{ marginTop: 32 }} />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView>
//         <Text style={{ padding: 16, color: "red" }}>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView>
//       <FlatList
//         data={contacts}
//         keyExtractor={(item) => String(item.id)}
//         renderItem={({ item }) => (
//           <Link href={`/contact/${item.id}`} style={{ padding: 16 }}>
//             <Text>{item.name}</Text>
//           </Link>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// type FetchState =
//   | { status: "loading" }
//   | { status: "success"; contacts: Contact[] }
//   | { status: "error"; message: string };

// type FetchAction =
//   | { type: "FETCH_START" }
//   | { type: "FETCH_SUCCESS"; contacts: Contact[] }
//   | { type: "FETCH_ERROR"; message: string };

// function contactsReducer(state: FetchState, action: FetchAction): FetchState {
//   switch (action.type) {
//     case "FETCH_START":
//       return { status: "loading" };
//     case "FETCH_SUCCESS":
//       return { status: "success", contacts: action.contacts };
//     case "FETCH_ERROR":
//       return { status: "error", message: action.message };
//   }
// }

export default function ContactListPage() {
  // const [state, dispatch] = useReducer(contactsReducer, {
  //   status: "loading",
  // });

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  // useEffect(() => {
  //   async function fetchContacts() {
  //     dispatch({ type: "FETCH_START" });
  //     try {
  //       const res = await fetch("https://jsonplaceholder.typicode.com/users");
  //       if (!res.ok)
  //         throw new Error(`Request failed with status ${res.status}`);
  //       const data: Contact[] = await res.json();
  //       dispatch({ type: "FETCH_SUCCESS", contacts: data });
  //     } catch (err) {
  //       dispatch({
  //         type: "FETCH_ERROR",
  //         message:
  //           err instanceof Error ? err.message : "Failed to fetch contacts",
  //       });
  //     }
  //   }
  //   fetchContacts();
  // }, []);

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
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
}
