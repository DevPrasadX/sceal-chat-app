import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton } from '../components/Skeleton';
import { COLORS, FONTS, commonStyles } from '../constants/styles';

interface FriendRequest {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    timestamp: string;
}

export default function PendingRequestsScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [requests, setRequests] = useState<FriendRequest[]>([]);

    // Simulated friend requests data - Replace with actual API call
    const mockRequests: FriendRequest[] = [
        {
            id: '1',
            name: 'John Doe',
            username: '@johndoe',
            avatar: 'https://i.pravatar.cc/150?img=1',
            timestamp: '2 hours ago'
        },
        {
            id: '2',
            name: 'Jane Smith',
            username: '@janesmith',
            avatar: 'https://i.pravatar.cc/150?img=2',
            timestamp: '5 hours ago'
        },
        {
            id: '3',
            name: 'Mike Johnson',
            username: '@mikejohnson',
            avatar: 'https://i.pravatar.cc/150?img=3',
            timestamp: '1 day ago'
        },
    ];

    useEffect(() => {
        // Simulate API call to fetch pending requests
        setIsLoading(true);
        setTimeout(() => {
            setRequests(mockRequests);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleAcceptRequest = (requestId: string) => {
        // TODO: Implement actual accept request logic
        setRequests(prevRequests => 
            prevRequests.filter(request => request.id !== requestId)
        );
    };

    const handleRejectRequest = (requestId: string) => {
        // TODO: Implement actual reject request logic
        setRequests(prevRequests => 
            prevRequests.filter(request => request.id !== requestId)
        );
    };

    const renderRequestCard = ({ item }: { item: FriendRequest }) => (
        <View style={styles.requestCard}>
            <Image
                source={{ uri: item.avatar }}
                style={styles.avatar}
            />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userUsername}>{item.username}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.acceptButton]}
                    onPress={() => handleAcceptRequest(item.id)}
                >
                    <Ionicons name="checkmark" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleRejectRequest(item.id)}
                >
                    <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderSkeleton = () => (
        <View style={styles.requestCard}>
            <Skeleton width={50} height={50} borderRadius={25} />
            <View style={styles.userInfo}>
                <Skeleton width={120} height={20} style={{ marginBottom: 4 }} />
                <Skeleton width={80} height={16} style={{ marginBottom: 4 }} />
                <Skeleton width={60} height={14} />
            </View>
            <View style={styles.actionButtons}>
                <Skeleton width={40} height={40} borderRadius={20} style={{ marginRight: 8 }} />
                <Skeleton width={40} height={40} borderRadius={20} />
            </View>
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
                    <Text style={styles.headerTitle}>Friend Requests</Text>
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
                        data={requests}
                        renderItem={renderRequestCard}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons name="people-outline" size={48} color={COLORS.text.secondary} />
                                <Text style={styles.emptyText}>No pending requests</Text>
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
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: COLORS.text.primary,
    },
    listContainer: {
        padding: 16,
    },
    requestCard: {
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
        marginBottom: 4,
    },
    timestamp: {
        fontSize: 12,
        fontFamily: FONTS.regular,
        color: COLORS.text.secondary,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
    },
    rejectButton: {
        backgroundColor: '#F44336',
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
        marginTop: 16,
    },
}); 