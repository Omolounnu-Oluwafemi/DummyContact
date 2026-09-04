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
import { useIsOnline } from "../../hooks/useIsOnline";
import {
  fetchPosts,
  likePost,
  Post,
  setSimulateFailure,
} from "../../utils/mockApi";

export default function DemoSolution() {
  const [failureMode, setFailureMode] = useState(false);
  const queryClient = useQueryClient();
  const isOnline = useIsOnline();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["demo-posts"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: likePost,

    onMutate: async (postId: string) => {
      // Stop any in-flight refetch from overwriting our optimistic change
      await queryClient.cancelQueries({ queryKey: ["demo-posts"] });

      // Snapshot current data — this is what we roll back to if it fails
      const previousPosts = queryClient.getQueryData<Post[]>(["demo-posts"]);

      // Update the UI immediately, before the server responds
      queryClient.setQueryData<Post[]>(["demo-posts"], (old) =>
        old?.map((p) =>
          p.id === postId
            ? {
                ...p,
                liked: !p.liked,
                likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1,
              }
            : p,
        ),
      );

      return { previousPosts };
    },

    onError: (_err, _postId, context) => {
      // Roll back to the snapshot — UI reverts as if the tap never happened
      if (context?.previousPosts) {
        queryClient.setQueryData(["demo-posts"], context.previousPosts);
      }
    },

    onSettled: () => {
      // Always resync with the real server state, success or failure
      queryClient.invalidateQueries({ queryKey: ["demo-posts"] });
    },
  });

  if (isLoading) return <ActivityIndicator style={styles.loader} />;

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>✅ The Solution</Text>
      <Text style={styles.subheading}>
        Tap a like button — it updates instantly, then confirms in the
        background
      </Text>

      {/* NEW — offline banner, only shown when isOnline is false */}
      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineBannerText}>
            No internet — showing cached data
          </Text>
        </View>
      )}

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
      {failureMode && (
        <Text style={styles.failureNote}>
          Try liking a post — it&apos;ll update instantly, then roll back a
          moment later.
        </Text>
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Post }) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Pressable
              style={styles.likeButton}
              onPress={() => mutation.mutate(item.id)}
            >
              <Text style={styles.likeText}>
                {item.liked ? "❤️" : "🤍"} {item.likeCount}
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
  heading: { fontSize: 24, fontWeight: "bold", color: "#1E8E5A" },
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
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#EAF6ED",
    borderRadius: 10,
  },
  switchLabel: { fontSize: 14, fontWeight: "600" },
  failureNote: {
    fontSize: 13,
    color: "#8A6D00",
    backgroundColor: "#FFF8E8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
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
  offlineBanner: {
    backgroundColor: "#E76F51",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  }, // NEW
  offlineBannerText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
  }, // NEW
  likeButtonRisky: { opacity: 0.5 },
});
