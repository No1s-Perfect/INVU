import { TOTAL_AMOUNT } from "./totalAmount";

export const getTotalPayedStats = (payedSoFar: number) => [
  {
    name: `Saved \n (${payedSoFar})`,
    population: payedSoFar,
    color: "#61dd37",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: `Left`,
    population: TOTAL_AMOUNT.FOUR_YEARS,
    color: "#2d97e1",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];
