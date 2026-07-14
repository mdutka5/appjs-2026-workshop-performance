import { View, Text, TouchableOpacity } from "react-native";
import { LikeButton } from "@/components/feed/actions/like-button";
import { ShareButton } from "@/components/feed/actions/share-button";
import { FeedPost, findPostForDetails } from "@/data/mock-feed";
import { ColorsContext } from "@/context/colors-context";
import { BookmarkButton } from "@/components/feed/actions/bookmark-button";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";

interface PostActionBarProps {
  post: FeedPost;
  onShareComplete: () => void;
}

export default function PostActionBar({
  post,
  onShareComplete,
}: PostActionBarProps) {
  const colors = useContext(ColorsContext);
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);

  useEffect(() => {
    const foundPost = findPostForDetails(post.id);
    if (foundPost) {
      setIsLiked(foundPost.isLiked);
      setLikesCount(foundPost.likes);
      setShareCount(foundPost.shares.length ?? 0);
    }
  }, [post.id]);

  const handleLike = useCallback(() => {
    setIsLiked((prevIsLiked) => {
      const nextIsLiked = !prevIsLiked;
      setLikesCount(
        (prevLikesCount) => prevLikesCount + (nextIsLiked ? 1 : -1),
      );
      return nextIsLiked;
    });
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <LikeButton isLiked={isLiked} colors={colors} onPress={handleLike} />
          <ShareButton
            postId={post.id}
            username={post.user.username}
            colors={colors}
            onShareComplete={() => onShareComplete()}
          />
        </View>

        <BookmarkButton
          initialIsBookmarked={post.isBookmarked}
          colors={colors}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingHorizontal: 12,
        }}
      >
        <TouchableOpacity onPress={() => router.push(`/likes/${post.id}`)}>
          <Text style={{ fontWeight: "600", fontSize: 14, color: colors.text }}>
            {likesCount.toLocaleString()} likes
          </Text>
        </TouchableOpacity>
        {shareCount > 0 && (
          <Text style={{ fontSize: 14, color: colors.icon }}>
            · {shareCount} {shareCount === 1 ? "share" : "shares"}
          </Text>
        )}
      </View>
    </>
  );
}
