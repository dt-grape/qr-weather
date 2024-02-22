import { useContext } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import WeatherContext from '../WeatherContext';

import sunny from "../images/sun.png"
import cloudy from "../images/cloudy.png"
import rainy from "../images/rainy.png"
const HomeScreen = ({ navigation }) => {
  const { weatherData } = useContext(WeatherContext);

    const getWeatherImage = (weather) => {
        switch (weather) {
            case 'Clear':
                return sunny;
            case 'Clouds':
                return cloudy;
            case 'Rain':
                return rainy;
            // Add more cases as needed
            default:
                return sunny;
        }
    };

  return (
      <View className="flex-1 flex-col px-2">
          {!weatherData ? (
              <View className="flex-1 items-center justify-center">
                  <Text className="text-xl">Пожалуйста, отсканируйте QR-код, чтобы получить данные о погоде.</Text>
              </View>
          ) : (
              <>
                  <View className="flex-1 pt-4">
                      <Text className="text-4xl font-medium bg-white p-4 rounded-2xl self-center">{weatherData.name}</Text>
                        <View className="bg-white self-center p-6 mt-8 rounded-2xl">
                            <Image source={getWeatherImage(weatherData.weather[0].main)} className="w-32 h-32 self-center" />
                        </View>
                  </View>
                  <View className="flex-1 flex-row justify-between">
                      <View className="gap-y-2">
                          <Text className="text-sm bg-white p-4 self-start rounded-2xl">{weatherData.weather[0].description}</Text>
                          <Text className="text-sm bg-white p-4 self-start rounded-2xl">Температура: {Math.round(weatherData.main.temp)}°C</Text>
                      </View>
                      <View className="gap-y-2">
                          <Text className="text-sm bg-white p-4 self-end rounded-2xl">Влажность: {weatherData.main.humidity}%</Text>
                          <Text className="text-sm bg-white p-4 self-end rounded-2xl">Скорость ветра: {weatherData.wind.speed}м/с</Text>
                      </View>
                  </View>
              </>
          )}
          <View className="absolute bottom-4 right-4">
              <TouchableOpacity className="bg-blue-500 rounded-full aspect-square items-center justify-center p-4" onPress={() => navigation.navigate('Camera')}>
                  <Text className="text-white text-3xl">
                      +
                  </Text>
              </TouchableOpacity>
          </View>
      </View>
  );
}



export default HomeScreen;