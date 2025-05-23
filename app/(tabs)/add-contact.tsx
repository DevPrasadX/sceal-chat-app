import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Placeholder data for user search results
const users = [
  { id: 'u1', name: 'John Doe', username: 'johndoe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 'u2', name: 'Jane Smith', username: 'janesmith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 'u3', name: 'Robert Johnson', username: 'robertj', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  // Add more placeholder users
];

export default function AddContactScreen() {
  const [searchText, setSearchText] = React.useState('');
  const [searchResults, setSearchResults] = React.useState(users); // Initially show all users or empty

  // Future: Implement actual search logic based on searchText
  const handleSearch = (text: string) => {
    setSearchText(text);
    // Filter users based on text - placeholder logic
    if (text) {
      setSearchResults(users.filter(user => 
        user.name.toLowerCase().includes(text.toLowerCase()) || 
        user.username.toLowerCase().includes(text.toLowerCase())
      ));
    } else {
      setSearchResults(users); // Or empty array if no search text
    }
  };

  const handleSendRequest = (userId: string) => {
    console.log('Send connection request to user:', userId);
    // Future: Implement sending connection request
  };

  const renderItem = ({ item }: { item: typeof users[0] }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.usernameText}>@{item.username}</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => handleSendRequest(item.id)}
      >
        <Ionicons name="add" size={24} color="#222" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users by name or username..."
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={24} color="#666" style={styles.searchIcon} />
      </View>

      {searchResults.length === 0 && searchText !== '' ? (
        <View style={styles.noUsersContainer}>
          <Text style={styles.noUsersText}>No users found.</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Use transparent to show the linear gradient background
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#F5C8BD', // SCÉAL text color
    fontFamily: 'Poppins_400Regular', // SCÉAL font
  },
  searchIcon: {
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222', // Card background
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000', // Add subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F5C8BD',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F5C8BD',
    fontFamily: 'Poppins_700Bold',
  },
  usernameText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  addButton: {
    backgroundColor: '#F5C8BD',
    borderRadius: 8,
    padding: 6,
  },
  noUsersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    fontSize: 18,
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
}); 