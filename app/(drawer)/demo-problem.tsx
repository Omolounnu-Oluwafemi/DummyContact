import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {
  fetchPosts,
  likePost,
  Post,
  setSimulateFailure,
} from "../../utils/mockApi";

export default function DemoProblem() {
  const [failureMode, setFailureMode] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["demo-posts"],
    queryFn: fetchPosts,
  });

  // NO optimistic update — waits for the server before showing anything
  const mutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demo-posts"] });
    },
  });

  if (isLoading) return <ActivityIndicator style={styles.loader} />;

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>❌ The Problem</Text>
      <Text style={styles.subheading}>
        Tap a like button — watch the delay before anything happens
      </Text>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Simulate server failure</Text>
        <Switch
          value={failureMode}
          onValueChange={(v) => {
            setFailureMode(v);
            setSimulateFailure(v);
          }}
        />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Post }) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Pressable
              style={styles.likeButton}
              onPress={() => mutation.mutate(item.id)}
              disabled={mutation.isPending}
            >
              <Text style={styles.likeText}>
                {mutation.isPending ? "..." : item.liked ? "❤️" : "🤍"}{" "}
                {item.likeCount}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, paddingTop: 60 },
  loader: { flex: 1, justifyContent: "center" },
  heading: { fontSize: 24, fontWeight: "bold", color: "#C0392B" },
  subheading: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#FBEFEC",
    borderRadius: 10,
  },
  switchLabel: { fontSize: 14, fontWeight: "600" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { fontSize: 15, flex: 1 },
  likeButton: { paddingHorizontal: 12, paddingVertical: 8 },
  likeText: { fontSize: 15, fontWeight: "bold" },
});
