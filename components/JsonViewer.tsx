import { View } from "react-native";
import { useData } from "../utils/Hooks";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import { Input, Button } from "@rneui/themed";
import { FUNCTION_NAME, tool } from "../utils";
export const JsonViewer = () => {
  const { globalData } = useData();
  const [fetching, setFetching] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
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

  const handleOnChange = (value: string) => setQuery(value);

  const handleOnPress = async () => {
    const res = await tool(query);
    if (res.type === "function_call") {
      if (res.name === FUNCTION_NAME.SAVE_IMAGES_TO_DEVICE_LIBRARY) {
        await sendEmail();
      }
    }
    if (res.type === "message") {
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
      <Input
        onChangeText={handleOnChange}
        placeholder={"Enter your query"}
        value={fetching ? "Executing function..." : query}
      />
      <Button
        title="Send"
        loading={fetching}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
        onPress={handleOnPress}
      />
    </View>
  );
};
