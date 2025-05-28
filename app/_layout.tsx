import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Text, useColorScheme, View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setIsAuthenticated(!!user);
    } catch (error) {
      console.error('Error checking auth state:', error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#060606', '#484848']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: '#060606' }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#060606',
            },
          }}
        >
          <Stack.Screen 
            name="index" 
            // redirect={isAuthenticated ? '/chat' : undefined}
          />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="chat" />
          <Stack.Screen name="chat/shared-media" />
          <Stack.Screen name="settings/index" />
          <Stack.Screen name="settings/about" />
          <Stack.Screen name="settings/account" />
          <Stack.Screen name="settings/appearance" />
          <Stack.Screen name="settings/help" />
          <Stack.Screen name="settings/notifications" />
          <Stack.Screen name="settings/privacy" />
          <Stack.Screen name="settings/profile" />
        </Stack>
      </View>
    </LinearGradient>
  );
}

// Set default text color and font globally
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = [
  { color: '#F5C8BD', fontFamily: 'Poppins_400Regular' },
  Text.defaultProps.style,
];
View.defaultProps = View.defaultProps || {};
View.defaultProps.style = [
  { backgroundColor: 'transparent' },
  View.defaultProps.style,
];
