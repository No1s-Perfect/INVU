import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackViewParamList } from '../utils';
import { ModalImageView } from '../components/ModalImageView';
import { Expenses } from '../components/Expenses';
const Stack = createNativeStackNavigator<RootStackViewParamList>();

export const StackNavView = () => {
    return (
        <Stack.Navigator >
        <Stack.Screen name="Expenses" component={Expenses}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ModalScreen" options={{ headerShown: false, presentation: 'modal' }} component={ModalImageView} />
      </Stack.Navigator>
    );
}