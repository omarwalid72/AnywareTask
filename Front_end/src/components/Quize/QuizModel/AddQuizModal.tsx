import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import styles from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (quiz: {
    title: string;
    description: string;
    questionCount: number;
    duration: number;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
  }) => void;
  initialValues?: {
    title: string;
    description: string;
    questionCount: number;
    duration: number;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
  } | null;
}

export default function AddQuizModal({ visible, onClose, onSubmit, initialValues }: Props) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    title: '',
    description: '',
    questionCount: '',
    duration: '',
    difficulty: '',
    category: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || '',
        description: initialValues.description || '',
        questionCount: String(initialValues.questionCount || ''),
        duration: String(initialValues.duration || ''),
        difficulty: initialValues.difficulty || '',
        category: initialValues.category || '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        questionCount: '10',
        duration: '30',
        difficulty: 'medium',
        category: '',
      });
    }
  }, [initialValues, visible]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) {
      newErrors.title = t('quizzes.validation.titleRequired');
    }

    if (!form.description.trim()) {
      newErrors.description = t('quizzes.validation.descriptionRequired');
    }

    if (!form.questionCount.trim()) {
      newErrors.questionCount = t('quizzes.validation.questionCountRequired');
    } else if (isNaN(Number(form.questionCount)) || Number(form.questionCount) <= 0) {
      newErrors.questionCount = t('quizzes.validation.questionCountPositive');
    }

    if (!form.duration.trim()) {
      newErrors.duration = t('quizzes.validation.durationRequired');
    } else if (isNaN(Number(form.duration)) || Number(form.duration) <= 0) {
      newErrors.duration = t('quizzes.validation.durationPositive');
    }

    if (!form.difficulty) {
      newErrors.difficulty = t('quizzes.validation.difficultyRequired');
    }

    if (!form.category.trim()) {
      newErrors.category = t('quizzes.validation.categoryRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert(t('quizzes.validation.validationError'), t('quizzes.validation.fillAllFields'));
      return;
    }

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      questionCount: Number(form.questionCount),
      duration: Number(form.duration),
      difficulty: form.difficulty as 'easy' | 'medium' | 'hard',
      category: form.category.trim(),
    });
  };

  const handleClose = () => {
    setForm({
      title: '',
      description: '',
      questionCount: '',
      duration: '',
      difficulty: '',
      category: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {initialValues ? t('quizzes.editQuiz') : t('quizzes.addQuiz')}
          </Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Title */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('quizzes.fields.title')} *</Text>
            <TextInput
              style={[styles.input, errors.title && styles.inputError]}
              value={form.title}
              onChangeText={(text) => setForm({ ...form, title: text })}
              placeholder={t('quizzes.placeholders.title')}
              placeholderTextColor="#9ca3af"
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>

          {/* Description */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('quizzes.fields.description')} *</Text>
            <TextInput
              style={[styles.textArea, errors.description && styles.inputError]}
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              placeholder={t('quizzes.placeholders.description')}
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={3}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>

          {/* Question Count */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('quizzes.fields.questionCount')} *</Text>
            <TextInput
              style={[styles.input, errors.questionCount && styles.inputError]}
              value={form.questionCount}
              onChangeText={(text) => setForm({ ...form, questionCount: text })}
              placeholder={t('quizzes.placeholders.questionCount')}
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
            {errors.questionCount && <Text style={styles.errorText}>{errors.questionCount}</Text>}
          </View>

          {/* Duration */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('quizzes.fields.duration')} *</Text>
            <TextInput
              style={[styles.input, errors.duration && styles.inputError]}
              value={form.duration}
              onChangeText={(text) => setForm({ ...form, duration: text })}
              placeholder={t('quizzes.placeholders.duration')}
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
            {errors.duration && <Text style={styles.errorText}>{errors.duration}</Text>}
          </View>

          {/* Difficulty */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('quizzes.fields.difficulty')} *</Text>
            <View style={[styles.pickerContainer, errors.difficulty && styles.inputError]}>
              <Picker
                selectedValue={form.difficulty}
                onValueChange={(value) => setForm({ ...form, difficulty: value })}
                style={styles.picker}
              >
                <Picker.Item label={t('quizzes.difficulty.select')} value="" />
                <Picker.Item label={t('quizzes.difficulty.easy')} value="easy" />
                <Picker.Item label={t('quizzes.difficulty.medium')} value="medium" />
                <Picker.Item label={t('quizzes.difficulty.hard')} value="hard" />
              </Picker>
            </View>
            {errors.difficulty && <Text style={styles.errorText}>{errors.difficulty}</Text>}
          </View>

          {/* Category */}
          <View style={styles.field}>
            <Text style={styles.label}>{t('quizzes.fields.category')} *</Text>
            <TextInput
              style={[styles.input, errors.category && styles.inputError]}
              value={form.category}
              onChangeText={(text) => setForm({ ...form, category: text })}
              placeholder={t('quizzes.placeholders.category')}
              placeholderTextColor="#9ca3af"
            />
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
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


