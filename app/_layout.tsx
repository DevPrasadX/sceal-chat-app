import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, usePathname, useRouter } from 'expo-router';
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/styles';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const shouldShowNavBar = ['/chat', '/calendar', '/pending-requests'].includes(pathname);

  return (
    <LinearGradient
      colors={[COLORS.background.start, COLORS.background.end]}
      style={styles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container}>
        <Stack 
          screenOptions={{ 
            headerShown: false,
            animation: 'slide_from_right',
            presentation: 'card',
            contentStyle: { backgroundColor: 'transparent' },
            animationDuration: 200,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            fullScreenGestureEnabled: true,
          }} 
        >
          <Stack.Screen 
            name="settings" 
            options={{ 
              presentation: 'card',
              animation: 'slide_from_right',
            }} 
          />
          <Stack.Screen 
            name="settings/profile" 
            options={{ 
              presentation: 'card',
              animation: 'slide_from_right',
            }} 
          />
          <Stack.Screen 
            name="settings/privacy" 
            options={{ 
              presentation: 'card',
              animation: 'slide_from_right',
            }} 
          />
          <Stack.Screen 
            name="settings/notifications" 
            options={{ 
              presentation: 'card',
              animation: 'slide_from_right',
            }} 
          />
          <Stack.Screen 
            name="settings/about" 
            options={{ 
              presentation: 'card',
              animation: 'slide_from_right',
            }} 
          />
        </Stack>

        {shouldShowNavBar && (
          <View style={styles.navigationBar}>
            <TouchableOpacity 
              style={[styles.navButton, pathname === '/chat' && styles.activeNavButton]} 
              onPress={() => router.replace('/chat')}
            >
              <MaterialIcons 
                name={pathname === '/chat' ? "chat" : "chat-bubble"} 
                size={24} 
                color={pathname === '/chat' ? "#FF6B00" : "white"} 
                style={pathname === '/chat' ? styles.activeIcon : null}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.navButton, pathname === '/calendar' && styles.activeNavButton]} 
              onPress={() => router.replace('/calendar')}
            >
              <MaterialIcons 
                name={pathname === '/calendar' ? "event" : "event-note"} 
                size={24} 
                color={pathname === '/calendar' ? "#FF6B00" : "white"} 
                style={pathname === '/calendar' ? styles.activeIcon : null}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.navButton, pathname === '/pending-requests' && styles.activeNavButton]} 
              onPress={() => router.replace('/pending-requests')}
            >
              <MaterialIcons 
                name={pathname === '/pending-requests' ? "person-add" : "person"} 
                size={24} 
                color={pathname === '/pending-requests' ? "#FF6B00" : "white"} 
                style={pathname === '/pending-requests' ? styles.activeIcon : null}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  navButton: {
    alignItems: 'center',
    padding: 10,
  },
  activeNavButton: {
    backgroundColor: 'rgba(255, 107, 0, 0.06)',
    borderRadius: 50,
  },
  activeIcon: {
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
});