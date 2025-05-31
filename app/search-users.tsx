import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton } from '../components/Skeleton';
import { COLORS, FONTS, commonStyles } from '../constants/styles';

interface User {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    isRequestSent?: boolean;
}

export default function SearchUsersScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    // Simulated user data - Replace with actual API call
    const mockUsers: User[] = [
        {
            id: '1',
            name: 'John Doe',
            username: '@johndoe',
            avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
            id: '2',
            name: 'Jane Smith',
            username: '@janesmith',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        {
            id: '3',
            name: 'Mike Johnson',
            username: '@mikejohnson',
            avatar: 'https://i.pravatar.cc/150?img=3',
        },
    ];

    useEffect(() => {
        // Simulate API call to fetch users
        setIsLoading(true);
        setTimeout(() => {
            setUsers(mockUsers);
            setFilteredUsers(mockUsers);
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchQuery, users]);

    const handleSendRequest = (userId: string) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId
                    ? { ...user, isRequestSent: true }
                    : user
            )
        );
        // TODO: Implement actual friend request logic
    };

    const renderUserCard = ({ item }: { item: User }) => (
        <View style={styles.userCard}>
            <Image
                source={{ uri: item.avatar }}
                style={styles.avatar}
            />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userUsername}>{item.username}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.requestButton,
                    item.isRequestSent && styles.requestSentButton
                ]}
                onPress={() => handleSendRequest(item.id)}
                disabled={item.isRequestSent}
            >
                <Text style={[
                    styles.requestButtonText,
                    item.isRequestSent && styles.requestSentButtonText
                ]}>
                    {item.isRequestSent ? 'Request Sent' : 'Send Request'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderSkeleton = () => (
        <View style={styles.userCard}>
            <Skeleton width={50} height={50} borderRadius={25} />
            <View style={styles.userInfo}>
                <Skeleton width={120} height={20} style={{ marginBottom: 4 }} />
                <Skeleton width={80} height={16} />
            </View>
            <Skeleton width={100} height={36} borderRadius={18} />
        </View>
    );

    return (
        <LinearGradient
            colors={[COLORS.background.start, COLORS.background.end]}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={commonStyles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Find People</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={COLORS.text.secondary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name or username"
                        placeholderTextColor={COLORS.text.placeholder}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => setSearchQuery('')}
                        >
                            <Ionicons name="close-circle" size={20} color={COLORS.text.secondary} />
                        </TouchableOpacity>
                    )}
                </View>

                {isLoading ? (
                    <FlatList
                        data={[1, 2, 3]}
                        renderItem={renderSkeleton}
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                ) : (
                    <FlatList
                        data={filteredUsers}
                        renderItem={renderUserCard}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No users found</Text>
                            </View>
                        }
                    />
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: COLORS.text.primary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 44,
        color: COLORS.text.primary,
        fontFamily: FONTS.regular,
    },
    clearButton: {
        padding: 4,
    },
    listContainer: {
        padding: 16,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontFamily: FONTS.semiBold,
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    userUsername: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.text.secondary,
    },
    requestButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 18,
    },
    requestButtonText: {
        color: '#FFFFFF',
        fontFamily: FONTS.medium,
        fontSize: 14,
    },
    requestSentButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    requestSentButtonText: {
        color: COLORS.text.secondary,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: FONTS.medium,
        color: COLORS.text.secondary,
    },
}); 