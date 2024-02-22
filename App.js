import {useState} from "react";
import WeatherContext from "./WeatherContext";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen";
import CameraComponent from "./components/CameraComponent";
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


export default function App() {
    const [weatherData, setWeatherData] = useState(null);

    return (
        <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="Camera" component={CameraComponent} />
                </Stack.Navigator>
            </NavigationContainer>
        </WeatherContext.Provider>
    );
};


