import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Platform, Switch, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../../constants/styles';

export default function PrivacyScreen() {
  const router = useRouter();
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true);
  const [activeStatusEnabled, setActiveStatusEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activity Status</Text>
            <View style={styles.card}>
              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Show when you're active</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#FF6B00" }}
                  thumbColor={activeStatusEnabled ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setActiveStatusEnabled}
                  value={activeStatusEnabled}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Messages</Text>
            <View style={styles.card}>
              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Read Receipts</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#FF6B00" }}
                  thumbColor={readReceiptsEnabled ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setReadReceiptsEnabled}
                  value={readReceiptsEnabled}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Blocked Users</Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.item} onPress={() => console.log('Navigate to Blocked Users')}>
                <Text style={styles.itemText}>View Blocked Users</Text>
                <MaterialIcons name="navigate-next" size={24} color="#666" style={styles.arrow} />
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#fff',
  },
   item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#fff',
  },
  arrow: {
    opacity: 0.5,
  },
}); 