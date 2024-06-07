import { useState, useEffect } from "react"
import { getTotalAmountPayed } from "../repository"
import Toast from "react-native-toast-message"
import * as Haptics from 'expo-haptics';
export const useTotalAMountPaid = () => {

    const [totalAmountPaid, setTotalAmountPaid] = useState<number>(0)

    useEffect(() => {

        getTotalAmountPayed().then((res) => setTotalAmountPaid(res))
            .catch(err => {
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'Please choose a photo! 📸',
                });
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                )
                console.error(err)
            })
    }, [])
    return { totalAmountPaid }
}