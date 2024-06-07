import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TmpImagesView } from '../components/TmpImagesView';
import { ITempPhotos, RootStackParamList } from '../utils';
import { useState } from 'react';
import { TempPhotosContext } from '../utils/Context';
import { ExpenseForm } from '../components/ExpenseForm';
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNav = () => {
  const [tempPhotos, setTmpPhotos] = useState<ITempPhotos[]>([]);

  const addTempPhoto = (photo: ITempPhotos) => {
    setTmpPhotos([...tempPhotos, photo]);
  }

  const deleteTempPhoto = (id: number) => {
    setTmpPhotos(tempPhotos.filter(photo => photo.id !== id));
  }

  const bootstrapTmpPhotos = (photos: ITempPhotos[]) => {
    setTmpPhotos(photos);
  }
  
  return (
    <TempPhotosContext.Provider value={{ tempPhotos, addTempPhoto, deleteTempPhoto, bootstrapTmpPhotos }}>
      <Stack.Navigator >
        <Stack.Screen name="FormScreen" component={ExpenseForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TempImages" options={{ headerShown: false, presentation: 'modal' }} component={TmpImagesView} />
      </Stack.Navigator>
    </TempPhotosContext.Provider>
  );
}

export default StackNav;