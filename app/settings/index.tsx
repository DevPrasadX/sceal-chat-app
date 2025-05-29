import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS, commonStyles } from '../../constants/styles';

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      router.replace('/login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView style={[commonStyles.container, styles.container]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={[commonStyles.section, styles.section]}>
          <Text style={[commonStyles.sectionTitle, styles.sectionTitle]}>Account</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/profile')}>
              <MaterialIcons name="account-circle" size={24} color="#FF6B00" style={styles.itemIcon} />
              <Text style={styles.itemText}>Profile</Text>
              <MaterialIcons name="navigate-next" size={24} color="#666" style={styles.arrow} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/privacy')}>
              <MaterialIcons name="security" size={24} color="#FF6B00" style={styles.itemIcon} />
              <Text style={styles.itemText}>Privacy</Text>
              <MaterialIcons name="navigate-next" size={24} color="#666" style={styles.arrow} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/notifications')}>
              <MaterialIcons name="notifications-active" size={24} color="#FF6B00" style={styles.itemIcon} />
              <Text style={styles.itemText}>Notifications</Text>
              <MaterialIcons name="navigate-next" size={24} color="#666" style={styles.arrow} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[commonStyles.section, styles.section]}>
          <Text style={[commonStyles.sectionTitle, styles.sectionTitle]}>Appearance</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/theme')}>
              <MaterialIcons name="style" size={24} color="#FF6B00" style={styles.itemIcon} />
              <Text style={styles.itemText}>Theme</Text>
              <MaterialIcons name="navigate-next" size={24} color="#666" style={styles.arrow} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/display')}>
              <MaterialIcons name="brightness-6" size={24} color="#FF6B00" style={styles.itemIcon} />
              <Text style={styles.itemText}>Display</Text>
              <MaterialIcons name="navigate-next" size={24} color="#666" style={styles.arrow} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[commonStyles.section, styles.section]}>
          <Text style={[commonStyles.sectionTitle, styles.sectionTitle]}>Support</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/help-center')}>
              <MaterialIcons name="support-agent" size={24} color="#FF6B00" style={styles.itemIcon} />
              <Text style={styles.itemText}>Help Center</Text>
              <MaterialIcons name="navigate-next" size={24} color="#666" style={styles.arrow} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/about')}>
              <MaterialIcons name="info-outline" size={24} color="#FF6B00" style={styles.itemIcon} />
              <Text style={styles.itemText}>About</Text>
              <MaterialIcons name="navigate-next" size={24} color="#666" style={styles.arrow} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#FF6B00" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  section: {
    
  },
  sectionTitle: {
    marginLeft: 12,
    marginBottom: 8,
    fontSize: 16,
    color: '#999',
  },
  card: {
    backgroundColor: '#252525',
    borderRadius: 12,
    marginHorizontal: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  padding:16,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: '#fff',
  },
  arrow: {
    opacity: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 16,
  },
  logout: {
    marginTop: 24,
    marginHorizontal: 12,
    marginBottom: 24,
    backgroundColor: '#252525',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#FF6B00',
    fontSize: 15,
    fontFamily: FONTS.bold,
  },
}); 