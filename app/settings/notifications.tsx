import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { FONTS } from '../../constants/styles';

export default function NotificationsScreen() {
  const router = useRouter();
  const [messageNotificationsEnabled, setMessageNotificationsEnabled] = useState(true);
  const [callNotificationsEnabled, setCallNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Message Notifications</Text>
            <View style={styles.card}>
              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Receive message notifications</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#FF6B00" }}
                  thumbColor={messageNotificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setMessageNotificationsEnabled}
                  value={messageNotificationsEnabled}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Call Notifications</Text>
            <View style={styles.card}>
               <View style={styles.settingItem}>
                <Text style={styles.settingText}>Receive call notifications</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#FF6B00" }}
                  thumbColor={callNotificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setCallNotificationsEnabled}
                  value={callNotificationsEnabled}
                />
              </View>
            </View>
          </View>

           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notification Preferences</Text>
            <View style={styles.card}>
               <View style={styles.settingItem}>
                <Text style={styles.settingText}>Sound</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#FF6B00" }}
                  thumbColor={soundEnabled ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setSoundEnabled}
                  value={soundEnabled}
                />
              </View>
               <View style={styles.divider} />
                <View style={styles.settingItem}>
                <Text style={styles.settingText}>Vibration</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#FF6B00" }}
                  thumbColor={vibrationEnabled ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setVibrationEnabled}
                  value={vibrationEnabled}
                />
              </View>
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
   divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 8,
  },
}); 