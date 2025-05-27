import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../constants/styles';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to SCÉAL</Text>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/chats')}
            >
              <Ionicons name="chatbubbles-outline" size={24} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Chats</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/contacts')}
            >
              <Ionicons name="people-outline" size={24} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Contacts</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/profile')}
            >
              <Ionicons name="person-outline" size={24} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <Text style={styles.emptyText}>No recent activity</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.start,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background.end,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: COLORS.background.end,
    padding: 16,
    borderRadius: 12,
    width: '30%',
  },
  actionButtonText: {
    marginTop: 8,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular,
  },
  activityList: {
    backgroundColor: COLORS.background.end,
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular,
  },
}); 