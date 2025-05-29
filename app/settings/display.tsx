import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONTS } from '../../constants/styles';

export default function DisplayScreen() {
  const router = useRouter();
  const [currentFontSize, setCurrentFontSize] = useState(16);

  const handleFontSizeChange = (size) => {
    setCurrentFontSize(size);
    console.log('Font size changed to:', size);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Display</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Font Size</Text>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.displayOption}
                onPress={() => handleFontSizeChange(14)}
              >
                <Text style={styles.displayText}>Small</Text>
                {currentFontSize === 14 && <MaterialIcons name="check-circle" size={24} color="#FF6B00" />}
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.displayOption}
                onPress={() => handleFontSizeChange(16)}
              >
                <Text style={styles.displayText}>Medium</Text>
                {currentFontSize === 16 && <MaterialIcons name="check-circle" size={24} color="#FF6B00" />}
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.displayOption}
                onPress={() => handleFontSizeChange(18)}
              >
                <Text style={styles.displayText}>Large</Text>
                {currentFontSize === 18 && <MaterialIcons name="check-circle" size={24} color="#FF6B00" />}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#999',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#252525',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  displayOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  displayText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 8,
  },
}); 