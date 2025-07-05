import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import styles from "./styles";

interface AnnouncementCardProps {
  _id?: string;
  title: string;
  content: string;
  date: string;
  priority: "low" | "medium" | "high";
  onEdit?: (announcement: {
    _id: string;
    title: string;
    content: string;
    date: string;
    priority: "low" | "medium" | "high";
  }) => void;
  onDelete?: (_id: string) => void;
  onPress?: (_id: string) => void;
}

const priorityColor = {
  low: "#22c55e",
  medium: "#eab308",
  high: "#ef4444",
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  _id,
  title,
  content,
  date,
  priority,
  onEdit,
  onDelete,
  onPress,
}) => {
  const { t } = useTranslation();

  const getPriorityText = (priority: "low" | "medium" | "high") => {
    return t(`announcements.priority.${priority}`);
  };
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: priorityColor[priority] }]}
      onPress={() => _id && onPress?.(_id)}
      activeOpacity={0.9}
    >
      {/* Title & Priority */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={[styles.badge, { backgroundColor: priorityColor[priority] }]}
        >
          <Text style={styles.badgeText}>{getPriorityText(priority)}</Text>
        </View>
      </View>

      {/* Body */}
      <Text style={styles.content}>{content}</Text>

      {/* Footer: Date + Actions */}
      <View style={styles.footer}>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={14} color="#64748b" />
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              _id &&
              onEdit?.({
                _id,
                title,
                content,
                date,
                priority,
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
      </View>
    </TouchableOpacity>
  );
};



export default AnnouncementCard;
