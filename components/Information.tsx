import { View, Text } from "react-native";
import { NUMBER_OF_MONTHS, TOTAL_AMOUNT } from "../utils/constants";

interface IInformation {
  amount: number;
  msg: string;
  numberOfPayments: number;
}
export const Information = ({
  amount,
  msg,
  numberOfPayments,
}: IInformation) => {
  return (
    <View style={{ alignItems: "center", gap: 5 }}>
      <Text>
        Total: ₡ {Number(amount).toLocaleString("es-CR")} ({numberOfPayments}) /{" "}
        {TOTAL_AMOUNT.FOUR_YEARS.toLocaleString("es-CR")} ({NUMBER_OF_MONTHS})
      </Text>
      <Text style={{ marginRight: 20, marginLeft: 20 }}>{msg}</Text>
    </View>
  );
};
