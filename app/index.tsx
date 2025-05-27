import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function IndexScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          router.replace('/chat');
        } else {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        router.replace('/login');
      }
    };

    if (fontsLoaded) {
      SplashScreen.hideAsync();
      checkAuthAndRedirect();
    }
  }, [fontsLoaded, router]);

  if (!fontsLoaded) {
    return null;
  }

  return <View />;
} 