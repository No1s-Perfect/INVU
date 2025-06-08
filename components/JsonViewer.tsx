import { View } from "react-native";
import { useData } from "../utils/Hooks";
import { Button } from "@rneui/themed";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";

export const JsonViewer = () => {
  const { globalData } = useData();
  const [fetching, setFetching] = useState<boolean>(false);

  const sendEmail = async () => {
    try {
      setFetching(true);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission denied to save images.",
        });
        return;
      }

      const images = globalData
        .map((data) => data.photoUri)
        .flat()
        .map((img) => img.photoUri);

      for (let i = 0; i < images.length; i++) {
        const fileName = `invu_image_${i + 1}.jpg`;
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

        // Write the Base64 image to a file
        await FileSystem.writeAsStringAsync(fileUri, images[i], {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Save to media library (e.g., Photos app)
        await MediaLibrary.createAssetAsync(fileUri);
      }
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Saved documents! 🎉",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: `Error saving the photos to library`,
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        display: "flex",
      }}
    >
      <Button
        radius={"sm"}
        type="solid"
        buttonStyle={{ backgroundColor: "rgba(127, 220, 103, 1)" }}
        onPress={sendEmail}
        loading={fetching}
      >
        Save to photos
      </Button>
    </View>
  );
};
