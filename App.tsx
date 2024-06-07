import { TabNav } from './navigators/TabNav';
import Toast from 'react-native-toast-message';
import { ThemeProvider, createTheme, lightColors } from '@rneui/themed';
import { Platform } from 'react-native';

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});


const App = () => {

  return (
  <ThemeProvider theme={theme}>
    <TabNav />
    <Toast />
  </ThemeProvider>)
}

export default App;