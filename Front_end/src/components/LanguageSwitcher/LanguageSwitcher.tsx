import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

interface LanguageSwitcherProps {
  style?: any;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const isRTL = i18n.language === 'ar';

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={toggleLanguage}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Ionicons 
          name="language-outline" 
          size={20} 
          color="#3b82f6" 
          style={styles.icon}
        />
        <Text style={styles.text}>
          {i18n.language.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
});

export default LanguageSwitcher;
