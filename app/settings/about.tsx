import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONTS } from '../../constants/styles';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
           
            <View style={styles.card}>
              <View style={{flex:1,flexDirection:'row',gap:15,alignContent:'center',alignItems:'center'}}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="info-outline" size={24} color="#FF6B00" />
                
              </View>
              <Text style={styles.sectionTitle}>About This App</Text>
              </View>
              <Text style={[styles.aboutText, styles.justifyText]}>
                Welcome to SCÉAL, a modern chat application designed to connect you seamlessly and securely with your world. Our mission is to provide a reliable and intuitive platform for all of your communication needs, whether you're catching up with friends, collaborating with colleagues, or staying in touch with family across the globe.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
           
            <View style={styles.card}>
            <View style={{flex:1,flexDirection:'row',gap:15,alignContent:'center',alignItems:'center'}}>

              <View style={styles.iconContainer}>
                <MaterialIcons name="devices" size={24} color="#FF6B00" />
              </View> 
              <Text style={styles.sectionTitle}>Resources Used</Text>
              </View>
              <View style={styles.resourceList}>
                <View style={styles.resourceItem}>
                  <MaterialIcons name="wifi" size={20} color="#666" style={styles.resourceIcon} />
                  <Text style={styles.resourceItemText}>Internet Connection</Text>
                </View>
                <View style={styles.resourceItem}>
                  <MaterialIcons name="camera-alt" size={20} color="#666" style={styles.resourceIcon} />
                  <Text style={styles.resourceItemText}>Camera</Text>
                </View>
                <View style={styles.resourceItem}>
                  <MaterialIcons name="mic" size={20} color="#666" style={styles.resourceIcon} />
                  <Text style={styles.resourceItemText}>Microphone</Text>
                </View>
                <View style={styles.resourceItem}>
                  <MaterialIcons name="photo-library" size={20} color="#666" style={styles.resourceIcon} />
                  <Text style={styles.resourceItemText}>Photo Gallery/Storage</Text>
                </View>
                <View style={styles.resourceItem}>
                  <MaterialIcons name="contacts" size={20} color="#666" style={styles.resourceIcon} />
                  <Text style={styles.resourceItemText}>Contacts</Text>
                </View>
                <View style={styles.resourceItem}>
                  <MaterialIcons name="notifications" size={20} color="#666" style={styles.resourceIcon} />
                  <Text style={styles.resourceItemText}>Notifications</Text>
                </View>
                <View style={styles.resourceItem}>
                  <MaterialIcons name="location-on" size={20} color="#666" style={styles.resourceIcon} />
                  <Text style={styles.resourceItemText}>Location Services (optional)</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
           
            <View style={styles.card}>
            <View style={{flex:1,flexDirection:'row',gap:15,alignContent:'center',alignItems:'center'}}>

              <View style={styles.iconContainer}>
                <MaterialIcons name="person" size={24} color="#FF6B00" />
              </View> 
              <Text style={styles.sectionTitle}>Founder and Developer</Text>
              </View>
              <Text style={styles.aboutText}>
                This application was founded and developed by Prasad Pansare.
              </Text>
             
            </View>
          </View>

          <View style={styles.section}>
           
            <View style={styles.card}>
            <View style={{flex:1,flexDirection:'row',gap:15,alignContent:'center',alignItems:'center'}}>

              <View style={styles.iconContainer}>
                <MaterialIcons name="settings" size={24} color="#FF6B00" />
              </View>
              <Text style={styles.sectionTitle}>App Information</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemText}>Version</Text>
                <Text style={styles.itemValue}>1.0.0</Text>
              </View>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/terms-of-service')}>
                <Text style={styles.itemText}>Terms of Service</Text>
                <MaterialIcons name="navigate-next" size={24} color="#666" style={styles.arrow} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/privacy-policy')}>
                <Text style={styles.itemText}>Privacy Policy</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#252525',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#999',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#252525',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: '#fff',
    lineHeight: 22,
  },
  justifyText: {
    textAlign: 'justify',
  },
  resourceList: {
    marginTop: 8,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  resourceIcon: {
    marginRight: 12,
  },
  resourceItemText: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: '#ccc',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#fff',
  },
  itemValue: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#ccc',
  },
  arrow: {
    opacity: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 4,
  },
}); 