import {
  PlaceholderBridge,
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
  CoreBridge
} from '@10play/tentap-editor';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface CategoryButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ title, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.categoryButton,
      isSelected && styles.selectedCategoryButton
    ]}
    onPress={onPress}
  >
    <Text style={[
      styles.categoryText,
      isSelected && styles.selectedCategoryText
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('To-Do');
  
  // Custom CSS for white text and larger font
  const customCSS = `
    * {
      color: #ffffff !important;
      font-size: 20px !important;
      line-height: 1.5 !important;
      font-family: ${Platform.OS === 'ios' ? 'System' : 'Roboto'} !important;
    }
    
    p {
      color: #ffffff !important;
      font-size: 24px !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    .ProseMirror {
      color: #ffffff !important;
      font-size: 18px !important;
      outline: none !important;
    }
    
    .ProseMirror p.is-editor-empty:first-child::before {
      color: #666666 !important;
      font-size: 24px !important;
      font-style: italic !important;
    }
  `;
  
  const editor = useEditorBridge({
    bridgeExtensions: [
      ...TenTapStartKit,
      PlaceholderBridge.configureExtension({
        placeholder: "Whats on your mind today?",
      }),
      CoreBridge.configureCSS(customCSS),
    ],
    autofocus: false,
    avoidIosKeyboard: true,
  });

  const categories: string[] = ['General', 'Meeting', 'To-Do'];

  // Function to handle outside taps
  const handleOutsideTap = () => {
    // Blur the editor to hide the keyboard
    editor.blur();
    // Also dismiss the native keyboard for other inputs
    // Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideTap} accessible={false}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#666666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your note"
              placeholderTextColor="#666666"
            />
          </View>
          
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="calendar-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileImage}>
                <Ionicons name="person" size={20} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Selector */}
        <Pressable>
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}
            >
              {categories.map((category: string) => (
                <CategoryButton
                  key={category}
                  title={category}
                  isSelected={selectedCategory === category}
                  onPress={() => setSelectedCategory(category)}
                />
              ))}
              <TouchableOpacity style={styles.createCategoryButton}>
                <Text style={styles.createCategoryText}>+ Create Category</Text>
              </TouchableOpacity>
            </ScrollView>
        </Pressable>

        {/* Date */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>25 Apr, 2025</Text>
        </View>

        {/* Rich Text Editor */}
        <View style={styles.editorContainer}>
          <RichText 
            editor={editor} 
            style={styles.richTextEditor}
          />
        </View>

        {/* Custom Toolbar */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.toolbarContainer}
        >
          <Toolbar 
            editor={editor}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 45,
    marginRight: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 16,
    padding: 4,
  },
  profileButton: {
    padding: 2,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4a4a4a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4a4a4a',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  selectedCategoryText: {
    color: '#1a1a1a',
  },
  createCategoryButton: {
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  createCategoryText: {
    color: '#666666',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  dateContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  editorContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  richTextEditor: {
    flex: 1,
    backgroundColor: '#000000',
  },
  toolbarContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

export default Home;