export type Post = {
  id: string;
  title: string;
  liked: boolean;
  likeCount: number;
};

let posts: Post[] = [
  { id: "1", title: "My trip to Lagos", liked: false, likeCount: 12 },
  { id: "2", title: "React Native tips", liked: false, likeCount: 34 },
  { id: "3", title: "Best jollof recipe", liked: false, likeCount: 58 },
];

// Toggle this from the UI to demo the rollback path live
export let SIMULATE_FAILURE = false;
export function setSimulateFailure(value: boolean) {
  SIMULATE_FAILURE = value;
}

export function fetchPosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...posts]), 500);
  });
}

// Deliberately slow — 1.5s delay so the "waiting" version is obviously sluggish
export function likePost(postId: string): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_FAILURE) {
        reject(new Error("Failed to like post"));
        return;
      }
      posts = posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1,
            }
          : p,
      );
      resolve(posts.find((p) => p.id === postId)!);
    }, 1500);
  });
}
