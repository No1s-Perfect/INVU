export const getTotalPayedStats = (payedSoFar: number) => [

    {
        name: "Saved",
        population: payedSoFar,
        color: "#61dd37",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Left",
        population: 26100000,
        color: "#2d97e1",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
];
