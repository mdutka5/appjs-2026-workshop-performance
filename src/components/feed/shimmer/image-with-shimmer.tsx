import { useState } from "react";
import { ImageProps, View } from "react-native";
import { Image } from "expo-image";

import { ImageShimmer } from "./image-shimmer";

export const ImageWithShimmer = ({ style, ...imageProps }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <View style={[style, { overflow: "hidden" }]}>
      <Image
        source={imageProps.source}
        style={style}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && <ImageShimmer />}
    </View>
  );
};
