import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme, Text, View } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

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
          <Stack.Screen name="index" />
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
