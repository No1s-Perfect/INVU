import { View, Text, FlatList, Pressable } from "react-native";
import { Card } from "@rneui/themed";
import { IExpenseList } from "../utils";
import { useData } from "../utils/Hooks";
import { AnimatedGIF } from "./AnimatedGIF";
import { EMOJIS } from "../utils/constants";

export const ExpenseList = ({ search, handleLongPress }: IExpenseList) => {
  const { globalData } = useData();
  const transformDate = (date: string) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateParts = date.split("/");
    const year = dateParts[0];
    const month = parseInt(dateParts[1], 10) - 1;
    const day = dateParts[2];

    const formattedDate = `${months[month]} ${parseInt(day, 10)}, ${year}`;
    return formattedDate;
  };
  const amount = globalData.reduce(
    (acc, current): number => (acc += current.amount),
    0
  );
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        {" "}
        <Text>Total: ₡{Number(amount).toLocaleString("es-CR")}</Text>
      </View>
      <FlatList
        ListEmptyComponent={
          <AnimatedGIF
            url={require("../assets/empty.gif")}
            title="Nothing to see."
            unicode={EMOJIS.EMPTY}
          />
        }
        data={globalData
          ?.sort((a, b) => {
            return b.date.localeCompare(a.date);
          })
          .filter((item) => item.date.includes(search))}
        renderItem={({ item }) => (
          <Pressable onLongPress={() => handleLongPress(item.photoUri)}>
            <Card
              containerStyle={{
                flex: 1,
                borderColor: "#a6ea7c",
                borderRadius: 10,
              }}
            >
              <Card.Title>{transformDate(item.date)}</Card.Title>
              <Card.Divider />
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text>Amount: ₡{item.amount}</Text>
                <Text>Number of files: {item.photoUri.length}</Text>
              </View>
            </Card>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
