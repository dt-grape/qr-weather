import { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import axios from "axios";
import WeatherContext from "../WeatherContext";

import {useNavigation} from "@react-navigation/native";

const CameraComponent = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const { setWeatherData } = useContext(WeatherContext);
    const navigation = useNavigation();

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
        const response = await axios.get(`${data}`);
        setWeatherData(response.data);
        navigation.goBack();
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                ratio="1:1"
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        aspectRatio: 1
    },
});

export default CameraComponent;