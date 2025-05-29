import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants/styles';

export default function PendingRequestsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Pending Requests</Text>
        {/* Add content for pending requests here */}
        <Text style={styles.subtitle}>No pending requests for now.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.start,
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