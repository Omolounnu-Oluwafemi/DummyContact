import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Contact = { id: number; name: string };

export default function ContactListPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok)
          throw new Error(`Request failed with status ${res.status}`);
        const data: Contact[] = await res.json();
        setContacts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch contacts",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator style={{ marginTop: 32 }} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text style={{ padding: 16, color: "red" }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={contacts}
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

// ============================================================
// REDUCER VERSION (commented out)
//
// Replaces the three useState calls (contacts/loading/error) above with
// one useReducer. loading/error/contacts collapse into a single
// FetchState union, so "loading" and "error" can no longer both be true
// at once — there's only ever one state.status.
//
// To use it:
//   1. Add `useReducer` to the "react" import at the top of this file
//      (next to useEffect, useState — or replace useState if you're no
//      longer using it elsewhere in the file).
//   2. Delete the current ContactListPage function above (from
//      `export default function ContactListPage()` down to its closing
//      brace), or comment it out the same way this block is commented.
//   3. Uncomment everything below (remove the /* right below this
//      comment and the */ at the end of the block).
// ============================================================
/*
type FetchState =
  | { status: "loading" }
  | { status: "success"; contacts: Contact[] }
  | { status: "error"; message: string };

type FetchAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; contacts: Contact[] }
  | { type: "FETCH_ERROR"; message: string };

function contactsReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case "FETCH_START":
      return { status: "loading" };
    case "FETCH_SUCCESS":
      return { status: "success", contacts: action.contacts };
    case "FETCH_ERROR":
      return { status: "error", message: action.message };
  }
}

export default function ContactListPage() {
  const [state, dispatch] = useReducer(contactsReducer, {
    status: "loading",
  });

  useEffect(() => {
    async function fetchContacts() {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok)
          throw new Error(`Request failed with status ${res.status}`);
        const data: Contact[] = await res.json();
        dispatch({ type: "FETCH_SUCCESS", contacts: data });
      } catch (err) {
        dispatch({
          type: "FETCH_ERROR",
          message: err instanceof Error ? err.message : "Failed to fetch contacts",
        });
      }
    }
    fetchContacts();
  }, []);

  if (state.status === "loading") {
    return (
      <SafeAreaView>
        <ActivityIndicator style={{ marginTop: 32 }} />
      </SafeAreaView>
    );
  }

  if (state.status === "error") {
    return (
      <SafeAreaView>
        <Text style={{ padding: 16, color: "red" }}>{state.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={state.contacts}
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
*/
// ============================================================ END REDUCER VERSION
