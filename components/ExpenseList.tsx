import { View, Text, FlatList, Pressable } from "react-native";
import { Card } from "@rneui/themed";
import { client, IExpenseList, model } from "../utils";
import { useData } from "../utils/Hooks";
import { AnimatedGIF } from "./AnimatedGIF";
import { EMOJIS, TOTAL_AMOUNT } from "../utils/constants";
import { useEffect, useState } from "react";
import { Information } from "./Information";

export const ExpenseList = ({ search, handleLongPress }: IExpenseList) => {
  const { globalData } = useData();
  const [msg, setMsg] = useState<string>("");
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

  const getMessage = async () => {
    const res = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content: `I am making a savings for a house, 
                    the total amount I need is ${TOTAL_AMOUNT.FOUR_YEARS.toLocaleString(
                      "es-CR"
                    )} CRC 
                    and I have ${Number(amount).toLocaleString("es-CR")} CRC.
                    Keep it simple, less than 20 words, you can use emojis.
                    Can you give an optimistic message for me, my name is David`,
        },
      ],
    });
    setMsg(res.output_text);
  };

  useEffect(() => {
    getMessage().then();
  }, []);
  return (
    <View>
      <Information
        amount={amount}
        msg={msg}
        numberOfPayments={globalData.length}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 150 }} // 👈 add extra space at the bottom
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
                <Text>
                  Amount: ₡{Number(item.amount).toLocaleString("es-CR")}
                </Text>
                <Text>Number of files: {item.photoUri.length.toString()}</Text>
              </View>
            </Card>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
