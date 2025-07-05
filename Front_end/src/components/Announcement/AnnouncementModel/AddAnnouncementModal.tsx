import { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import styles from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (announcement: {
    title: string;
    content: string;
    date: string;
    priority: 'low' | 'medium' | 'high';
  }) => void;
  initialValues?: {
    title: string;
    content: string;
    date: string;
    priority: 'low' | 'medium' | 'high';
  } | null;
}

export default function AddAnnouncementModal({ visible, onClose, onSubmit, initialValues }: Props) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    title: '',
    content: '',
    date: '',
    priority: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || '',
        content: initialValues.content || '',
        date: initialValues.date || '',
        priority: initialValues.priority || '',
      });
    } else {
      setForm({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0], // Default to today
        priority: 'medium',
      });
    }
  }, [initialValues, visible]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) {
      newErrors.title = t('announcements.validation.titleRequired');
    }

    if (!form.content.trim()) {
      newErrors.content = t('announcements.validation.contentRequired');
    }

    if (!form.date.trim()) {
      newErrors.date = t('announcements.validation.dateRequired');
    }

    if (!form.priority) {
      newErrors.priority = t('announcements.validation.priorityRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert(t('announcements.validation.validationError'), t('announcements.validation.fillAllFields'));
      return;
    }

    onSubmit({
      title: form.title.trim(),
      content: form.content.trim(),
      date: form.date,
      priority: form.priority as 'low' | 'medium' | 'high',
    });
  };

  const handleClose = () => {
    setForm({
      title: '',
      content: '',
      date: '',
      priority: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {initialValues ? t('announcements.editAnnouncement') : t('announcements.addAnnouncement')}
          </Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Title */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('announcements.fields.title')} *</Text>
            <TextInput
              style={[styles.input, errors.title && styles.inputError]}
              value={form.title}
              onChangeText={(text) => setForm({ ...form, title: text })}
              placeholder={t('announcements.placeholders.title')}
              placeholderTextColor="#9ca3af"
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>

          {/* Content */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('announcements.fields.content')} *</Text>
            <TextInput
              style={[styles.textArea, errors.content && styles.inputError]}
              value={form.content}
              onChangeText={(text) => setForm({ ...form, content: text })}
              placeholder={t('announcements.placeholders.content')}
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />
            {errors.content && <Text style={styles.errorText}>{errors.content}</Text>}
          </View>

          {/* Date */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('announcements.fields.date')} *</Text>
            <TextInput
              style={[styles.input, errors.date && styles.inputError]}
              value={form.date}
              onChangeText={(text) => setForm({ ...form, date: text })}
              placeholder={t('announcements.placeholders.date')}
              placeholderTextColor="#9ca3af"
            />
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
          </View>

          {/* Priority */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('announcements.fields.priority')} *</Text>
            <View style={[styles.pickerContainer, errors.priority && styles.inputError]}>
              <Picker
                selectedValue={form.priority}
                onValueChange={(value) => setForm({ ...form, priority: value })}
                style={styles.picker}
              >
                <Picker.Item label={t('announcements.priority.select')} value="" />
                <Picker.Item label={t('announcements.priority.low')} value="low" />
                <Picker.Item label={t('announcements.priority.medium')} value="medium" />
                <Picker.Item label={t('announcements.priority.high')} value="high" />
              </Picker>
            </View>
            {errors.priority && <Text style={styles.errorText}>{errors.priority}</Text>}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>
              {initialValues ? t('common.update') : t('common.create')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}


