import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StackNav from './StackNav';
import { GlobalDataContext } from '../utils/Context/DataContext';
import { useEffect, useState } from 'react';
import { GlobalData } from '../utils/interfaces/IGlobalData';
import { StackNavView } from './StackNavView';
import Chart from '../components/Chart';
import { JsonViewer } from '../components/JsonViewer';
import { createDocs, createImages } from '../utils';
const Tab = createBottomTabNavigator();

export const TabNav = () => {
    const [globalData, setGlobalData] = useState<GlobalData[]>([]);


    const deleteData = (id: number): void => {

    }
    const deleteDataImage = (id: number, imgId: number): void => {

    }
    const updateDataImage = (id: number, imgId: number, photoUri: string): void => {

    }

    const addData = (data: GlobalData): void => {
        setGlobalData([...globalData, data])
    }

    const bootstrapGlobalData = (globalData: GlobalData[]) => {
        setGlobalData(globalData)
    }
    
    useEffect(() => {
        createDocs()
        createImages()
    }, [])

    return (
        <GlobalDataContext.Provider value={{ globalData, deleteData, deleteDataImage, updateDataImage, addData, bootstrapGlobalData }}>
            <NavigationContainer>
                <Tab.Navigator>

                    <Tab.Screen name="View" component={StackNavView}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'View',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="eye-settings-outline" color={color} size={size} />
                            ),
                        }}

                    />
                    <Tab.Screen name="Form" component={StackNav} options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="form-dropdown" color={color} size={size} />
                        ),
                    }} />
                    <Tab.Screen name="Graphs" component={Chart}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Graphs',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="graph-outline" color={color} size={size} />
                            ),
                        }}

                    />
                    <Tab.Screen name="Data" component={JsonViewer}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Data',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="graph-outline" color={color} size={size} />
                            ),
                        }}

                    />
                </Tab.Navigator>
            </NavigationContainer>
        </GlobalDataContext.Provider>
    )
}