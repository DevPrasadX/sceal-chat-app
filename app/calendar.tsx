import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants/styles';

export default function CalendarScreen() {
  return (
    <LinearGradient
      colors={[COLORS.background.start, COLORS.background.end]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Calendar</Text>
          {/* Add content for calendar here */}
          <Text style={styles.subtitle}>Calendar content will be displayed here.</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#E6E6E6',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#B3B3B3',
  },
}); 