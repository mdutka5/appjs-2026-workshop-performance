import { useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

import { ColorsContext } from "@/context/colors-context";
import { SuggestedPost } from "@/data/mock-feed";

import { SuggestedPostCard } from "./suggested-post-card";

import { FlashList } from "@shopify/flash-list";

export const SuggestedPostsSection = ({
  posts,
}: {
  posts: SuggestedPost[];
}) => {
  const colors = useContext(ColorsContext);
  const router = useRouter();

  const openSuggestions = () => {
    router.push("/suggestions");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Suggested for you
        </Text>
        <TouchableOpacity onPress={openSuggestions}>
          <Text style={[styles.seeAll, { color: colors.tint }]}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={posts}
        renderItem={({ item }) => <SuggestedPostCard post={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyExtractor={(item) => item.id}
        nestedScrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
  header: {
    borderColor: "blue",
    borderWidth: 1,
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    borderColor: "green",
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 12,
  },
});
