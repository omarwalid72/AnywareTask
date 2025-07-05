import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import styles from "./styles";

interface QuizCardProps {
  _id: string;
  title: string;
  description: string;
  questionCount: number;
  duration: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  onEdit?: (quiz: {
    _id: string;
    title: string;
    description: string;
    questionCount: number;
    duration: number;
    difficulty: "easy" | "medium" | "hard";
    category: string;
  }) => void;
  onDelete?: (id: string) => void;
  onPress?: (id: string) => void;
}

const difficultyColors = {
  easy: "#22c55e",
  medium: "#eab308",
  hard: "#ef4444",
};

const QuizCard: React.FC<QuizCardProps> = ({
  _id,
  title,
  description,
  questionCount,
  duration,
  difficulty,
  category,
  onEdit,
  onDelete,
  onPress,
}) => {
  const { t } = useTranslation();

  const getDifficultyText = (difficulty: "easy" | "medium" | "hard") => {
    return t(`quizzes.difficulty.${difficulty}`);
  };
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: difficultyColors[difficulty] }]}
      onPress={() => onPress?.(_id)}
      activeOpacity={0.9}
    >
      {/* Title + Difficulty Badge */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: difficultyColors[difficulty] },
          ]}
        >
          <Text style={styles.badgeText}>{getDifficultyText(difficulty)}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Stats Row */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Ionicons name="help-circle-outline" size={16} color="#64748b" />
          <Text style={styles.statText}>{questionCount} Q</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color="#64748b" />
          <Text style={styles.statText}>{duration} min</Text>
        </View>
        <Text style={styles.category}>{category}</Text>
      </View>

      {/* Edit/Delete Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() =>
            _id &&
            onEdit?.({
              _id,
              title,
              description,
              questionCount,
              duration,
              difficulty,
              category,
            })
          }
          style={[styles.iconBtn, (!_id || !onEdit) && styles.disabledBtn]}
          disabled={!_id || !onEdit}
        >
          <Ionicons
            name="create-outline"
            size={18}
            color={!_id || !onEdit ? "#9ca3af" : "#3b82f6"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => _id && onDelete?.(_id)}
          style={[styles.iconBtn, (!_id || !onDelete) && styles.disabledBtn]}
          disabled={!_id || !onDelete}
        >
          <Ionicons
            name="trash-outline"
            size={18}
            color={!_id || !onDelete ? "#9ca3af" : "#ef4444"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};



export default QuizCard;
