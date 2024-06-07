import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native"
import { ExpenseViewType, ImgData, retrieveAllExpenses } from "../utils";
import { useData } from "../utils/Hooks";
import { Loading } from "./Loading";
import * as Haptics from 'expo-haptics';
import { SearchBar } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { ExpenseList } from "./ExpenseList";

export const Expenses: React.FC<ExpenseViewType> = ({ navigation }) => {
  const { bootstrapGlobalData } = useData()
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const getGlobalData = async () => {
    try {
      setLoading(true)
      const data = await retrieveAllExpenses()
      bootstrapGlobalData(data)

    } catch (e) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Error fetching global data! ',
      });
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getGlobalData().then(() =>
      Toast.show({
        topOffset: 60,
        type: 'info',
        text1: `Welcome back David! 🤗`,
      })
    )
  }, [])

  const handleLongPress = (imgData: ImgData[]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    navigation.navigate('ModalScreen', { data: imgData })
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      {loading ?
        <Loading /> :
        <>
          <SearchBar lightTheme round placeholder="Search by year" onChangeText={updateSearch}
            value={search} />
          <ExpenseList search={search} handleLongPress={handleLongPress} />
        </>}
    </SafeAreaView >
  )
}
