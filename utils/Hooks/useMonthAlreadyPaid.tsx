import { useEffect, useState } from "react";
import { isThisMonthCovered } from "../repository";
import Toast from "react-native-toast-message";
import * as Haptics from 'expo-haptics';
import { useData } from "./useData";
export const useMonthAlreadyPaid = () => {
    const [monthAlreadyPaid, setMonthAlreadyPaid] = useState(true);
    const galobalData = useData()
    useEffect(() => {
        isThisMonthCovered().then(result => setMonthAlreadyPaid(result))
            .catch(() => {
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'Error checking if month is already paid! 🤯',
                });
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                )
                setMonthAlreadyPaid(false)
            })
    }, [galobalData.globalData])


    return { monthPaid: monthAlreadyPaid }
}