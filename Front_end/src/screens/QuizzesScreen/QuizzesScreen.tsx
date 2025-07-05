import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import QuizCard from "../../components/Quize/QuizCard";
import AddQuizModal from "../../components/Quize/QuizModel/AddQuizModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mockQuizzes } from "../../data/mockData";
import {
  fetchQuizzes,
  deleteQuiz,
  addQuiz,
  updateQuiz,
  Quiz,
} from "../../store/slices/quizSlice";
import styles from "./styles";

interface QuizzesScreenProps {
  navigation?: any;
  route?: any;
}

export default function QuizzesScreen({ navigation, route }: QuizzesScreenProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { quizzes, loading, error } = useAppSelector((state) => state.quiz);

  const [showModal, setShowModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const displayQuizzes = quizzes.length > 0 ? quizzes : mockQuizzes;

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  useEffect(() => {
    if (route?.params?.triggerAdd) {
      handleAdd();
    }
  }, [route?.params?.triggerAdd]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchQuizzes()).finally(() => setRefreshing(false));
  };

  const goBack = () => navigation?.goBack();

  const handleAdd = () => {
    setEditingQuiz(null);
    setShowModal(true);
  };

  const handleEdit = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setShowModal(true);
  };

   const handleDelete = (_id: string) => {
      if (!_id) {
        Alert.alert(t('common.error'), t('quizzes.messages.cannotDeleteWithoutId'));
        return;
      }
  
      Alert.alert(
        t('quizzes.deleteQuiz'),
        t('quizzes.deleteConfirmation'),
        [
          { text: t('common.cancel'), style: "cancel" },
          {
            text: t('common.delete'),
            style: "destructive",
            onPress: async () => {
              try {
                await dispatch(deleteQuiz(_id)).unwrap();
                // Refresh the list after deletion
                dispatch(fetchQuizzes());
              } catch (error) {
                console.error("Failed to delete quiz:", error);
                Alert.alert(t('common.error'), t('quizzes.messages.deleteError'));
              }
            },
          },
        ]
      );
    };

  const handleSubmitQuiz = async (quizData: {
    title: string;
    description: string;
    questionCount: number;
    duration: number;
    difficulty: "easy" | "medium" | "hard";
    category: string;
  }) => {
    try {
      if (editingQuiz) {
        await dispatch(updateQuiz({ _id: editingQuiz._id, ...quizData })).unwrap();
      } else {
        await dispatch(addQuiz(quizData)).unwrap();
      }

      setShowModal(false);
      setEditingQuiz(null);
      dispatch(fetchQuizzes());
    } catch (error) {
      console.error("Failed to save quiz:", error);
      Alert.alert(t('common.error'), editingQuiz ? t('quizzes.messages.updateError') : t('quizzes.messages.addError'));
    }
  };

  const renderQuiz = ({ item }: { item: Quiz }) => (
    <QuizCard
      _id={item._id}
      title={item.title}
      description={item.description}
      questionCount={item.questionCount}
      duration={item.duration}
      difficulty={item.difficulty}
      category={item.category}
      onEdit={() => handleEdit(item)}
      onDelete={handleDelete}
      onPress={() => {}}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      

      <FlatList
        data={displayQuizzes}
        renderItem={renderQuiz}
        keyExtractor={(item, index) => item._id?.toString() || index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || loading}
            onRefresh={handleRefresh}
          />
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && !refreshing ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{t('quizzes.noQuizzes')}</Text>
              <Text style={styles.emptySubtext}>{t('quizzes.createFirstQuiz')}</Text>
            </View>
          ) : null
        }
      />

      <AddQuizModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingQuiz(null);
        }}
        onSubmit={handleSubmitQuiz}
        initialValues={editingQuiz}
      />
    </SafeAreaView>
  );
}


