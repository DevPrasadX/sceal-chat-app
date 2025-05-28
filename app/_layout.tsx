import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { Stack, usePathname, useRouter } from 'expo-router'; // Import Stack and usePathname
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/styles'; // Assuming COLORS is defined here or in a reachable path

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Define the screens where the navigation bar should be visible
  const shouldShowNavBar = ['/chat', '/calendar', '/pending-requests'].includes(pathname);

  return (
    <View style={styles.container}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'fade',
          presentation: 'transparentModal'
        }} 
      />

      {/* Only show navigation bar on specific screens */}
      {shouldShowNavBar && (
        <View style={styles.navigationBar}>
          <TouchableOpacity 
            style={[styles.navButton, pathname === '/chat' && styles.activeNavButton]} 
            onPress={() => router.replace('/chat')}
          >
            <Ionicons name="chatbubbles-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navButton, pathname === '/calendar' && styles.activeNavButton]} 
            onPress={() => router.replace('/calendar')}
          >
            <Ionicons name="calendar-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navButton, pathname === '/pending-requests' && styles.activeNavButton]} 
            onPress={() => router.replace('/pending-requests')}
          >
            <Ionicons name="person-add-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.primary, // Example background color
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 25, // Rounded corners
    elevation: 8, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  navButton: {
    alignItems: 'center',
    padding: 10,
  },
  activeNavButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
  },
  // Styles for Tab Bar (based on Neumorphic design)
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent', // Set background to transparent here
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 80, // Adjust height as needed
    position: 'absolute', // Positioning for the floating effect
    bottom: 20,
    left: 20,
    right: 20,
    // Remove shadow properties from here, they will be on the background view
    borderTopWidth: 0, // Remove default top border
  },
   tabBarBackground: {
    backgroundColor: '#2A2A2A', // Dark grey background
    borderRadius: 30,
     position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
     // Note: Inner shadow effect requires more advanced techniques or libraries
  },
  tabButton: {
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2A2A2A', // Button background color (can be transparent if background view handles color)
    justifyContent: 'center',
     // Apply shadows to the button itself for the raised effect
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
     // Note: Top/left highlight for a more realistic neumorphic button
    // would require an overlay View with a lighter shadow or a library.
  },
});