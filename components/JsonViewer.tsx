import { View, Text, Keyboard } from "react-native";
import { useData } from "../utils/Hooks";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import { Input, Button, Switch } from "@rneui/themed";
import {
  FUNCTION_NAME,
  gpt4_1,
  gpt4o,
  gpt4oMini,
  responseBack,
  tool,
} from "../utils";
import Markdown from "react-native-markdown-display";

export const JsonViewer = () => {
  const { globalData } = useData();
  const [fetching, setFetching] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
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
      setResponse("");
    }
  };

  const handleOnChange = (value: string) => setQuery(value);

  const prettyGirlNames = () => {
    return [
      {
        name: "Sofia Daniela Campos Alfaro",
        age: "She is about to turn 27",
        work: " She is a software engineer at MSFT",
        description:
          "Doesnt like cookies and white bread, but loves a chocolate cake from CAFE ROJO",
        prevWork: ["Amazon", "Gambling company"],
        random: "She is next to me right now, she is the pretty",
      },
    ];
  };
  const handleOnPress = async () => {
    try {
      const res = await tool(query, isEnabled ? gpt4oMini : gpt4_1);
      if (res.type === "function_call") {
        if (res.name === FUNCTION_NAME.SAVE_IMAGES_TO_DEVICE_LIBRARY) {
          await sendEmail();
        }
        if (res.name === FUNCTION_NAME.GET_PRETTY_GIRL) {
          try {
            setFetching(true);
            const data = prettyGirlNames();
            const res2 = await responseBack(query, res, data);
            if (res2.type === "message") {
              const content = res2.content[0];
              setResponse(content.type === "output_text" ? content.text : "");
              Keyboard.dismiss();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          } catch (e) {
          } finally {
            setFetching(false);
            setError(false);
          }
        }
      }
      if (res.type === "message") {
      }
    } catch (e) {
      console.log(e, "error in handleOnPress");
      setError(true);
    }
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: response?.length > 0 ? "space-around" : "center",
        flex: 1,
        display: "flex",
      }}
    >
      <View style={{ margin: 20 }}>
        <Markdown>{response}</Markdown>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
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
        {error && <Switch onValueChange={setIsEnabled} value={isEnabled} />}
      </View>
    </View>
  );
};
