import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";
import { FooProps, createSingleDoc, insertImages, todayDate } from "../utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useData, useMonthAlreadyPaid } from "../utils/Hooks";
import { MONTHLY_PRICE } from "../utils/constants";
import { useTmpPhoto } from "../utils/Hooks/useTmpPhoto";
import { AnimatedGIF } from "./AnimatedGIF";
import { EMOJIS } from "../utils/constants";

export const ExpenseForm: React.FC<FooProps> = (props) => {
  const [amount, setAmount] = useState(MONTHLY_PRICE);
  const [date] = useState(todayDate);
  const { tempPhotos, bootstrapTmpPhotos } = useTmpPhoto();
  const { addData } = useData();
  const { monthPaid } = useMonthAlreadyPaid();

  const saveExpense = () => {
    if (tempPhotos.length === 0) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please choose a photo! 📸",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    const updatedAmount = parseFloat(amount.split(".").join(""));
    createSingleDoc(
      updatedAmount,
      date,
      async (insertId: number) => {
        const images = await insertImages(
          tempPhotos.map((uri) => uri.uri),
          insertId!
        );
        addData({
          id: insertId!,
          amount: updatedAmount,
          date,
          photoUri: images,
        });
        bootstrapTmpPhotos([]);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Saved documents! 🎉",
        });
      },
      (error) => console.log(error)
    );
  };

  const retrievePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access media library denied");
      return;
    }
    try {
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 3],
          quality: 1,
          allowsMultipleSelection: true,
          base64: true,
        });
      if (!result.canceled) {
        bootstrapTmpPhotos(
          result.assets.map((asset, index) => ({
            uri: asset.base64!,
            id: index,
          }))
        );
      }
    } catch (error) {
      console.error("Error picking an image: ", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          padding: 20,
          display: "flex",
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        {monthPaid ? (
          <AnimatedGIF
            title="Already paid this month."
            unicode={EMOJIS.DONALD_MONEY}
            url={require("../assets/money.gif")}
          />
        ) : (
          <>
            <View
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <View style={styles.searchSection}>
                <MaterialCommunityIcons name="cash" size={25} color={"green"} />
                <TextInput
                  editable={false}
                  placeholder="Amount"
                  value={amount}
                  onChangeText={(text) => setAmount(text)}
                  keyboardType="numeric"
                  style={styles.nonEditableInput}
                />
              </View>
              <View style={styles.searchSection}>
                <MaterialCommunityIcons
                  name="calendar-today"
                  size={25}
                  color={"blue"}
                />
                <TextInput
                  placeholder="Date"
                  value={date}
                  editable={false}
                  style={styles.nonEditableInput}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button title="Choose Photo" onPress={retrievePhoto} />
                {tempPhotos.length > 0 && (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text>{tempPhotos.length}</Text>
                    <MaterialCommunityIcons
                      name="eye-settings-outline"
                      color={"gray"}
                      size={23}
                      onPress={() => props.navigation.navigate("TempImages")}
                    />
                  </View>
                )}
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity style={styles.saveButton} onPress={saveExpense}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  nonEditableInput: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    height: 40,
    borderColor: "gray",
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
