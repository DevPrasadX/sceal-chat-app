import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { COLORS, FONTS, commonStyles } from '../../constants/styles';

interface MediaItem {
  id: string;
  type: 'image' | 'voice';
  uri: string;
  time: string;
}

interface Message {
  id: string;
  type: 'text' | 'image' | 'voice';
  text?: string;
  imageUri?: string;
  audioUri?: string;
  sender: 'user' | 'other';
  time: string;
}

const { width } = Dimensions.get('window');
const numColumns = 3;
const tileSize = width / numColumns;

export default function SharedMediaScreen() {
  const { user, messages: messagesParam } = useLocalSearchParams();
  const router = useRouter();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Parse the messages from the route params
      const messages: Message[] = JSON.parse(messagesParam as string);
      
      // Filter and transform messages into media items
      const mediaItems: MediaItem[] = messages
        .filter(msg => msg.type === 'image' || msg.type === 'voice')
        .map(msg => ({
          id: msg.id,
          type: msg.type,
          uri: msg.type === 'image' ? msg.imageUri! : msg.audioUri!,
          time: msg.time,
        }));

      setMediaItems(mediaItems);
    } catch (error) {
      console.error('Error parsing messages:', error);
    }
  }, [messagesParam]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playVoiceMessage = async (uri: string, id: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setPlayingId(id);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          setPlayingId(null);
        }
      });
    } catch (err) {
      console.error('Failed to play voice message', err);
    }
  };

  const renderMediaItem = ({ item }: { item: MediaItem }) => {
    const isPlaying = playingId === item.id;
    
    return (
      <TouchableOpacity 
        style={styles.mediaItem}
        onPress={() => {
          if (item.type === 'voice') {
            playVoiceMessage(item.uri, item.id);
          } else {
            // Handle image preview
            // You could add a modal or navigation to a full-screen view
          }
        }}
      >
        {item.type === 'image' ? (
          <Image source={{ uri: item.uri }} style={styles.mediaImage} />
        ) : (
          <View style={styles.audioItem}>
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={24} 
              color={COLORS.primary} 
            />
            <Text style={styles.audioDuration}>{item.time}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shared Media</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Media Grid */}
      <FlatList
        data={mediaItems}
        renderItem={renderMediaItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.mediaGrid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold,
  },
  placeholder: {
    width: 40,
  },
  mediaGrid: {
    padding: 1,
  },
  mediaItem: {
    width: tileSize - 2,
    height: tileSize - 2,
    margin: 1,
    backgroundColor: COLORS.input.background,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  audioItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.input.background,
  },
  audioDuration: {
    fontSize: 12,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular,
    marginTop: 4,
  },
}); 