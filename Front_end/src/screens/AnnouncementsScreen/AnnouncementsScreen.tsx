import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AnnouncementCard from "../../components/Announcement/AnnouncementCard/AnnouncementCard";
import AddAnnouncementModal from "../../components/Announcement/AnnouncementModel/AddAnnouncementModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mockAnnouncements } from "../../data/mockData";
import {
  fetchAnnouncements,
  deleteAnnouncement,
  addAnnouncement,
  updateAnnouncement,
  Announcement,
} from "../../store/slices/announcementSlice";
import styles from "./styles";

interface AnnouncementsScreenProps {
  navigation?: any;
  route?: any;
}

export default function AnnouncementsScreen({ navigation, route }: AnnouncementsScreenProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { announcements, loading, error } = useAppSelector((state) => state.announcement);

  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const displayAnnouncements = announcements.length > 0 ? announcements : mockAnnouncements;

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  useEffect(() => {
    if (route?.params?.triggerAdd) {
      handleAdd();
    }
  }, [route?.params?.triggerAdd]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchAnnouncements()).finally(() => setRefreshing(false));
  };

  const goBack = () => navigation?.goBack();

  const handleAdd = () => {
    setEditingAnnouncement(null);
    setShowModal(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setShowModal(true);
  };

  const handleDelete = (_id: string) => {
    if (!_id) {
      Alert.alert(t('common.error'), t('announcements.messages.cannotDeleteWithoutId'));
      return;
    }

    Alert.alert(
      t('announcements.deleteAnnouncement'),
      t('announcements.deleteConfirmation'),
      [
        { text: t('common.cancel'), style: "cancel" },
        {
          text: t('common.delete'),
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch(deleteAnnouncement(_id)).unwrap();
              dispatch(fetchAnnouncements());
            } catch (error) {
              console.error("Failed to delete announcement:", error);
              Alert.alert(t('common.error'), t('announcements.messages.deleteError'));
            }
          },
        },
      ]
    );
  };

  const handleSubmitAnnouncement = async (announcementData: {
    title: string;
    content: string;
    date: string;
    priority: "low" | "medium" | "high";
  }) => {
    try {
      if (editingAnnouncement) {
        await dispatch(updateAnnouncement({ 
          _id: editingAnnouncement._id, 
          ...announcementData 
        })).unwrap();
      } else {
        await dispatch(addAnnouncement(announcementData)).unwrap();
      }

      setShowModal(false);
      setEditingAnnouncement(null);
      // Refresh the list after creation/update
      dispatch(fetchAnnouncements());
    } catch (error) {
      console.error("Failed to save announcement:", error);
      Alert.alert(t('common.error'), editingAnnouncement ? t('announcements.messages.updateError') : t('announcements.messages.addError'));
    }
  };

  const renderAnnouncement = ({ item }: { item: Announcement }) => (
    <AnnouncementCard
      _id={item._id}
      title={item.title}
      content={item.content}
      date={item.date}
      priority={item.priority}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}

      <FlatList
        data={displayAnnouncements}
        renderItem={renderAnnouncement}
        keyExtractor={(item, index) => item._id?.toString() || index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !refreshing && !loading ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="megaphone-outline" size={60} color="#9ca3af" />
              <Text style={styles.emptyTitle}>{t('announcements.noAnnouncements')}</Text>
              <Text style={styles.emptyText}>
                {t('announcements.noAnnouncementsMessage')}
              </Text>
            </View>
          ) : null
        }
      />

      <AddAnnouncementModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingAnnouncement(null);
        }}
        onSubmit={handleSubmitAnnouncement}
        initialValues={editingAnnouncement}
      />
    </SafeAreaView>
  );
}


