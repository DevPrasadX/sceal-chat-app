import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, commonStyles } from '../../constants/styles';

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Get all keys in AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      // Remove all items associated with those keys
      await AsyncStorage.multiRemove(keys);
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally, navigate to login anyway in case of an error to prevent being stuck
      router.replace('/login');
    }
  };

  return (
    <ScrollView style={commonStyles.container}>
      <View style={commonStyles.section}>
        <Text style={commonStyles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemIcon}>👤</Text>
          <Text style={styles.itemText}>Profile</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemIcon}>🔒</Text>
          <Text style={styles.itemText}>Privacy</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemIcon}>🔔</Text>
          <Text style={styles.itemText}>Notifications</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={commonStyles.section}>
        <Text style={commonStyles.sectionTitle}>Appearance</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemIcon}>🎨</Text>
          <Text style={styles.itemText}>Theme</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemIcon}>📱</Text>
          <Text style={styles.itemText}>Display</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={commonStyles.section}>
        <Text style={commonStyles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemIcon}>❓</Text>
          <Text style={styles.itemText}>Help Center</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemIcon}>ℹ️</Text>
          <Text style={styles.itemText}>About</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background.end,
  },
  itemIcon: {
    marginRight: 16,
    color: COLORS.primary,
    fontSize: 22,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular,
    flex: 1,
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 20,
    marginLeft: 8,
  },
  logout: {
    marginTop: 32,
    backgroundColor: COLORS.input.background,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
}); 