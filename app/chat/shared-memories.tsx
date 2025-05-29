import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Easing,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, FONTS } from '../../constants/styles';

type MemoryType = 'date' | 'anniversary' | 'birthday' | 'travel' | 'other';

interface Media {
  uri: string;
  type: 'image' | 'video';
}

interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  media: Media[];
  type: MemoryType;
  createdBy: string;
}

const MEMORY_TYPE_COLORS = {
  date: '#FF6B00',
  anniversary: '#FF8A9A',
  birthday: '#FFD166',
  travel: '#06D6A0',
  other: '#B3B3B3'
};

const MEMORY_TYPE_ICONS: Record<MemoryType, keyof typeof MaterialIcons.glyphMap> = {
  date: 'favorite',
  anniversary: 'favorite-border',
  birthday: 'cake',
  travel: 'flight',
  other: 'event'
};

const EMPTY_STATE_ILLUSTRATION = 'https://fonts.gstatic.com/s/i/materialicons/photo_library/v1/24px.svg';

interface SharedMemoriesScreenProps {
  hideHeader?: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
};

export default function SharedMemoriesScreen({ hideHeader }: SharedMemoriesScreenProps) {
  const router = useRouter();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'type'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [animatedValues] = useState<{[key: string]: Animated.Value}>(() => ({}));
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newMemory, setNewMemory] = useState<Partial<Memory>>({
    title: '',
    description: '',
    type: 'date',
    media: [] as Media[]
  });

  const filteredAndSortedMemories = useMemo(() => {
    let filtered = memories;
    
    // Apply search filter with improved matching
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(memory => 
        memory.title.toLowerCase().includes(query) ||
        memory.description.toLowerCase().includes(query) ||
        memory.type.toLowerCase().includes(query) ||
        formatDate(memory.date).toLowerCase().includes(query)
      );
    }

    // Apply date filter
    if (selectedDate) {
      filtered = filtered.filter(memory => 
        new Date(memory.date).toDateString() === selectedDate.toDateString()
      );
    }

    // Apply sorting with improved logic
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        // Sort by type with secondary sort by date
        const typeCompare = sortOrder === 'asc' 
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
        
        if (typeCompare === 0) {
          // If types are the same, sort by date
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return typeCompare;
      }
    });
  }, [memories, searchQuery, sortBy, sortOrder, selectedDate]);

  const pickMedia = async (type: 'image' | 'video') => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permission.status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newMedia = result.assets.map(asset => ({
        uri: asset.uri,
        type: type as 'image' | 'video'
      }));
      
      if (isEditing && selectedMemory) {
        setSelectedMemory(prev => ({
          ...prev!,
          media: [...(prev?.media || []), ...newMedia]
        }));
      } else {
        setNewMemory(prev => ({
          ...prev,
          media: [...(prev.media || []), ...newMedia]
        }));
      }
    }
  };

  const removeMedia = (index: number) => {
    if (isEditing && selectedMemory) {
      setSelectedMemory(prev => ({
        ...prev!,
        media: prev!.media.filter((_, i) => i !== index)
      }));
    } else {
      setNewMemory(prev => ({
        ...prev,
        media: prev.media?.filter((_, i) => i !== index) || []
      }));
    }
  };

  const addMemory = () => {
    if (!newMemory.title) {
      alert('Please enter a title for your memory');
      return;
    }

    const memory: Memory = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title: newMemory.title,
      description: newMemory.description || '',
      media: newMemory.media || [],
      type: newMemory.type || 'date',
      createdBy: 'user' // This should be replaced with actual user ID
    };

    setMemories([...memories, memory]);
    setModalVisible(false);
    setNewMemory({ title: '', description: '', type: 'date', media: [] });
  };

  const updateMemory = () => {
    if (!selectedMemory) return;

    setMemories(memories.map(memory => 
      memory.id === selectedMemory.id ? selectedMemory : memory
    ));
    setViewModalVisible(false);
    setIsEditing(false);
    setSelectedMemory(null);
  };

  const openMemoryDetails = (memory: Memory) => {
    setSelectedMemory(memory);
    setViewModalVisible(true);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const deleteMemory = (memoryId: string) => {
    Alert.alert(
      'Delete Memory',
      'Are you sure you want to delete this memory? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (animatedValues[memoryId]) {
              Animated.timing(animatedValues[memoryId], {
                toValue: Dimensions.get('window').width,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
              }).start(() => {
                setMemories(prevMemories => prevMemories.filter(memory => memory.id !== memoryId));
                delete animatedValues[memoryId];
              });
            } else {
              setMemories(prevMemories => prevMemories.filter(memory => memory.id !== memoryId));
            }
          }
        }
      ]
    );
  };

  const renderMemoryCard = (memory: Memory) => {
    if (!animatedValues[memory.id]) {
      animatedValues[memory.id] = new Animated.Value(0);
    }

    return (
      <Animated.View 
        style={[
          styles.memoryCard,
          { borderLeftColor: MEMORY_TYPE_COLORS[memory.type] },
          { transform: [{ translateX: animatedValues[memory.id] }] },
        ]}
      >
        <TouchableOpacity 
          key={memory.id} 
          style={{ flex: 1, paddingRight: 30 }}
          onPress={() => openMemoryDetails(memory)}
        >
          <View style={styles.memoryHeader}>
            <View style={styles.memoryTypeContainer}>
              <MaterialIcons name={MEMORY_TYPE_ICONS[memory.type]} size={16} color={MEMORY_TYPE_COLORS[memory.type]} />
              <Text style={[styles.memoryType, { color: MEMORY_TYPE_COLORS[memory.type] }]}>
                {memory.type.charAt(0).toUpperCase() + memory.type.slice(1)}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.memoryDate}>{formatDate(memory.date)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteMemory(memory.id)}
            >
              <MaterialIcons name="delete" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.memoryTitle}>{memory.title}</Text>
          {memory.description && (
            <Text style={styles.memoryDescription} numberOfLines={2}>{memory.description}</Text>
          )}
          {memory.media.length > 0 && (
            <View style={styles.mediaPreview}>
              <Image
                source={{ uri: memory.media[0].uri }}
                style={styles.mediaThumbnail}
                resizeMode="cover"
              />
              {memory.media.length > 1 && (
                <View style={styles.mediaCount}>
                  <Text style={styles.mediaCountText}>+{memory.media.length - 1}</Text>
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderMediaGrid = (media: Media[], canOpen: boolean) => (
    <View style={styles.mediaGrid}>
      {media.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.mediaItem}
          onPress={() => { if (canOpen) { /* Handle media preview */ } }}
          disabled={!canOpen}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.mediaGridImage}
            resizeMode="cover"
          />
          {isEditing && (
            <TouchableOpacity 
              style={styles.removeMediaButton}
              onPress={() => removeMedia(index)}
            >
              <MaterialIcons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateIconContainer}>
        <MaterialIcons name="collections" size={80} color={COLORS.button.background} />
      </View>
      <Text style={styles.emptyStateTitle}>No Memories Yet</Text>
      <Text style={styles.emptyStateText}>
        Start creating beautiful memories together! Tap the + button to add your first memory.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {!hideHeader && (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shared Memories</Text>
        </View>
      )}
      
      <View style={styles.controlsContainer}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={COLORS.text.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search memories..."
            placeholderTextColor={COLORS.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <MaterialIcons name="close" size={24} color={COLORS.text.secondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedDate && styles.filterButtonActive]}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialIcons 
              name="calendar-today" 
              size={24} 
              color={selectedDate ? COLORS.button.background : COLORS.text.primary} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterButton, showSortMenu && styles.filterButtonActive]}
            onPress={() => setShowSortMenu(true)}
          >
            <MaterialIcons 
              name="sort" 
              size={24} 
              color={showSortMenu ? COLORS.button.background : COLORS.text.primary} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSortMenu = () => (
    <Modal
      visible={showSortMenu}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowSortMenu(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowSortMenu(false)}
      >
        <View style={styles.sortMenu}>
          <Text style={styles.sortMenuTitle}>Sort By</Text>
          
          <TouchableOpacity 
            style={[styles.sortOption, sortBy === 'date' && styles.sortOptionSelected]}
            onPress={() => {
              setSortBy('date');
              setShowSortMenu(false);
            }}
          >
            <MaterialIcons name="event" size={20} color={sortBy === 'date' ? COLORS.button.background : '#B3B3B3'} />
            <Text style={[styles.sortOptionText, sortBy === 'date' && styles.sortOptionTextSelected]}>
              Date
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.sortOption, sortBy === 'type' && styles.sortOptionSelected]}
            onPress={() => {
              setSortBy('type');
              setShowSortMenu(false);
            }}
          >
            <MaterialIcons name="category" size={20} color={sortBy === 'type' ? COLORS.button.background : '#B3B3B3'} />
            <Text style={[styles.sortOptionText, sortBy === 'type' && styles.sortOptionTextSelected]}>
              Type
            </Text>
          </TouchableOpacity>

          <View style={styles.sortOrderContainer}>
            <TouchableOpacity 
              style={[styles.sortOrderButton, sortOrder === 'asc' && styles.sortOrderButtonSelected]}
              onPress={() => setSortOrder('asc')}
            >
              <MaterialIcons name="arrow-upward" size={20} color={sortOrder === 'asc' ? COLORS.button.background : '#B3B3B3'} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sortOrderButton, sortOrder === 'desc' && styles.sortOrderButtonSelected]}
              onPress={() => setSortOrder('desc')}
            >
              <MaterialIcons name="arrow-downward" size={20} color={sortOrder === 'desc' ? COLORS.button.background : '#B3B3B3'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollView}>
        {memories.length === 0 ? (
          renderEmptyState()
        ) : (
          filteredAndSortedMemories.map((memory) => (
            <View key={memory.id}>
              {renderMemoryCard(memory)}
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={24} color={COLORS.background.start} />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date);
            }
          }}
        />
      )}

      {renderSortMenu()}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => {
              Keyboard.dismiss();
              setModalVisible(false);
            }}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { fontFamily: FONTS.bold }]}>Add Memory</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.memoryTypeSelector}>
                {Object.keys(MEMORY_TYPE_COLORS).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.memoryTypeButton,
                      newMemory.type === type && { 
                        backgroundColor: MEMORY_TYPE_COLORS[type as MemoryType],
                        opacity: 0.8
                      }
                    ]}
                    onPress={() => setNewMemory({ ...newMemory, type: type as MemoryType })}
                  >
                    <MaterialIcons 
                      name={MEMORY_TYPE_ICONS[type as MemoryType]} 
                      size={20} 
                      color={newMemory.type === type ? '#fff' : MEMORY_TYPE_COLORS[type as MemoryType]} 
                    />
                    <Text style={[
                      styles.memoryTypeButtonText,
                      newMemory.type === type && { color: '#fff' }
                    ]}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={[styles.input, { fontFamily: FONTS.regular }]}
                placeholder="What's the memory about?"
                placeholderTextColor={COLORS.text.placeholder}
                value={newMemory.title}
                onChangeText={text => setNewMemory({ ...newMemory, title: text })}
              />
              
              <TextInput
                style={[styles.input, styles.textArea, { fontFamily: FONTS.regular }]}
                placeholder="Share your feelings about this memory..."
                placeholderTextColor={COLORS.text.placeholder}
                multiline
                value={newMemory.description}
                onChangeText={text => setNewMemory({ ...newMemory, description: text })}
              />

              <View style={styles.mediaButtons}>
                <TouchableOpacity
                  style={styles.mediaButton}
                  onPress={() => pickMedia('image')}
                >
                  <MaterialIcons name="image" size={24} color={COLORS.button.background} />
                  <Text style={styles.mediaButtonText}>Add Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.mediaButton}
                  onPress={() => pickMedia('video')}
                >
                  <MaterialIcons name="videocam" size={24} color={COLORS.button.background} />
                  <Text style={styles.mediaButtonText}>Add Video</Text>
                </TouchableOpacity>
              </View>

              {newMemory.media && newMemory.media.length > 0 && renderMediaGrid(newMemory.media, false)}

              <TouchableOpacity
                style={styles.addMemoryButton}
                onPress={addMemory}
              >
                <Text style={[styles.buttonText, { fontFamily: FONTS.medium }]}>Save Memory</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={viewModalVisible}
        onRequestClose={() => {
          setViewModalVisible(false);
          setIsEditing(false);
          setSelectedMemory(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEditing ? 'Edit Memory' : 'View Memory'}
              </Text>
              <TouchableOpacity 
                onPress={() => {
                  setViewModalVisible(false);
                  setIsEditing(false);
                  setSelectedMemory(null);
                }}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
              {selectedMemory && (
                <>
                  <View style={styles.memoryTypeContainer}>
                    <MaterialIcons 
                      name={MEMORY_TYPE_ICONS[selectedMemory.type]} 
                      size={20} 
                      color={MEMORY_TYPE_COLORS[selectedMemory.type]} 
                    />
                    <Text style={[styles.memoryType, { color: MEMORY_TYPE_COLORS[selectedMemory.type] }]}>
                      {selectedMemory.type.charAt(0).toUpperCase() + selectedMemory.type.slice(1)}
                    </Text>
                  </View>

                  <Text style={styles.viewMemoryTitle}>{selectedMemory.title}</Text>
                  <Text style={styles.viewMemoryDate}>{formatDate(selectedMemory.date)}</Text>
                  
                  {selectedMemory.description && (
                    <Text style={styles.viewMemoryDescription}>{selectedMemory.description}</Text>
                  )}

                  {selectedMemory.media.length > 0 && renderMediaGrid(selectedMemory.media, true)}

                  {!isEditing ? (
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={startEditing}
                    >
                      <MaterialIcons name="edit" size={20} color={COLORS.text.primary} />
                      <Text style={styles.editButtonText}>Edit Memory</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={updateMemory}
                    >
                      <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
   
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 44,
  },
  searchIcon: {
    marginRight: 12,
    color: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontFamily: FONTS.regular,
    fontSize: 15,
  },
  clearButton: {
    padding: 4,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
    borderColor: '#FF6B00',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  memoryCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  memoryHeader: {
    marginBottom: 12,
  },
  memoryTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  memoryType: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  dateContainer: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  memoryDate: {
    color: '#FF6B00',
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  memoryTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#fff',
    marginBottom: 8,
  },
  memoryDescription: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: '#ccc',
    lineHeight: 22,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#252525',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 0,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.regular,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  mediaButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  mediaButtonText: {
    color: COLORS.button.background,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  mediaPreview: {
    position: 'relative',
    marginTop: 12,
  },
  mediaThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  mediaCount: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mediaCountText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  mediaItem: {
    width: (Dimensions.get('window').width - 80) / 2,
    height: (Dimensions.get('window').width - 80) / 2,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mediaGridImage: {
    width: '100%',
    height: '100%',
  },
  removeMediaButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 4,
  },
  addMemoryButton: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.button.text,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  memoryTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  memoryTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333',
    gap: 4,
  },
  memoryTypeButtonText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.button.background,
  },
  viewMemoryTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#fff',
    marginBottom: 8,
  },
  viewMemoryDate: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: '#FF6B00',
    marginBottom: 16,
  },
  viewMemoryDescription: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  saveButton: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    opacity: 0.8,
  },
  modalScrollView: {
    padding: 24,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 60,
  },
  emptyStateIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.button.background,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#B3B3B3',
    textAlign: 'center',
    lineHeight: 24,
  },
  sortMenu: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
    width: 300,
    backgroundColor: COLORS.background.start,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sortMenuTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  sortOptionSelected: {
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
  sortOptionText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  sortOptionTextSelected: {
    color: '#FF6B00',
    fontFamily: FONTS.bold,
  },
  sortOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  sortOrderButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  sortOrderButtonSelected: {
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
}); 