import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";

import { FeedItem } from "@/components/feed/feed-item";
import { SuggestedPostsSection } from "@/components/feed/suggestions/suggested-posts-section";
import { FeedListItem } from "@/data/mock-feed";

const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList<FeedListItem>,
);

export const FeedList = ({ data }: { data: FeedListItem[] }) => {
  const contentHeight = useSharedValue(0);
  const layoutHeight = useSharedValue(0);
  const progress = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((e) => {
    const offset = e.contentOffset.y;
    const max = Math.max(1, contentHeight.value - layoutHeight.value);
    const p = Math.min(1, Math.max(0, offset / max));
    progress.value = p;
  }, []);

  const handleContentSizeChange = (_w: number, h: number) => {
    contentHeight.value = h;
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    layoutHeight.value = e.nativeEvent.layout.height;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.wrapper}>
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, animatedStyle]} />
      </View>
      <AnimatedFlashList
        data={data}
        renderItem={({ item }) =>
          item.type === "suggestions" ? (
            <SuggestedPostsSection posts={item.posts} />
          ) : (
            <FeedItem item={item} />
          )
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
        getItemType={(item) => item.type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  progressTrack: {
    height: 3,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF3B30",
  },
});
