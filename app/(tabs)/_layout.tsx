import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F5C8BD', // SCÉAL text color
        tabBarInactiveTintColor: '#666', // Adjust as needed for dark theme
        tabBarStyle: {
          backgroundColor: '#222', // Dark background for tab bar
          borderTopWidth: 0,
          elevation: 0, // Remove shadow on Android
        },
        headerStyle: {
          backgroundColor: '#222', // Dark header background
        },
        headerTintColor: '#F5C8BD', // SCÉAL text color for header title/buttons
        headerTitleStyle: {
          fontFamily: 'Poppins_700Bold', // SCÉAL font
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins_400Regular', // SCÉAL font
        },
      }}
    >
      <Tabs.Screen
        name="recents"
        options={{
          title: 'Recents',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-add" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-contact"
        options={{
          title: 'Add Contact',
          tabBarButton: () => null, // Hide this tab from the tab bar
          headerShown: true, // Show header for this screen
        }}
      />
    </Tabs>
  );
}
