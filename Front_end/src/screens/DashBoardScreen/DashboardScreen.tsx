import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleLogout } from "../../store/slices/authSlice";
import { fetchQuizzes } from "../../store/slices/quizSlice";
import { fetchAnnouncements } from "../../store/slices/announcementSlice";
import AnnouncementCard from "../../components/Announcement/AnnouncementCard";
import QuizCard from "../../components/Quize/QuizCard";
import styles from "./styles";

interface DashboardScreenProps {
  navigation: any;
  route?: any;
}

export default function DashboardScreen({ navigation, route }: DashboardScreenProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { quizzes, loading } = useAppSelector((state) => state.quiz);
  const { announcements } = useAppSelector((state) => state.announcement);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data on component mount
  React.useEffect(() => {
    dispatch(fetchQuizzes());
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  // Listen for logout button press from navigation header
  React.useEffect(() => {
    if (route?.params?.triggerLogout) {
      handleLogout();
    }
  }, [route?.params?.triggerLogout]);

  const handleRefresh = () => {
    setRefreshing(true);
    Promise.all([
      dispatch(fetchQuizzes()),
      dispatch(fetchAnnouncements()),
    ]).finally(() => {
      setRefreshing(false);
    });
  };

  const handleLogout = () => dispatch(toggleLogout());

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || loading}
            onRefresh={handleRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            title={t("navigation.announcements")}
            count={announcements.length}
            icon="megaphone"
            color="#3b82f6"
            onpress={() => navigation.navigate("Announcements")}
          />
          <StatCard
            title={t("navigation.quizzes")}
            count={quizzes.length}
            icon="book"
            color="#10b981"
            onpress={() => navigation.navigate("Quizzes")}
          />
        </View>

        {/* Latest Content Section */}
        <View style={styles.contentSection}>
          
          <Section title={t("dashboard.latestAnnouncement")} color="#3b82f6">
            {announcements.length > 0 ? (
              announcements
                .slice()
                .reverse()
                .slice(0, 1)
                .map((item, index) => (
                  <AnnouncementCard
                    key={`announcement-${item._id || index}`}
                    _id={item._id}
                    title={item.title}
                    content={item.content}
                    date={item.date}
                    priority={item.priority}
                  />
                ))
            ) : (
              <Text style={styles.emptyText}>
                {t("dashboard.noAnnouncements")}
              </Text>
            )}
          </Section>

          <Section title={t("dashboard.latestQuiz")} color="#10b981">
            {quizzes.length > 0 ? (
              quizzes
                .slice()
                .reverse()
                .slice(0, 1)
                .map((item, index) => (
                  <QuizCard
                    key={`quiz-${item._id || index}`}
                    _id={item._id}
                    title={item.title}
                    description={item.description}
                    duration={item.duration}
                    questionCount={item.questionCount}
                    difficulty={item.difficulty}
                    category={item.category}
                    // onEdit={() => {}}
                    // onDelete={() => {}}
                  />
                ))
            ) : (
              <Text style={styles.emptyText}>{t("dashboard.noQuizzes")}</Text>
            )}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* === COMPONENTS === */

interface StatCardProps {
  title: string;
  count: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onpress?: () => void;
}

function StatCard({ title, count, icon, color , onpress }: StatCardProps) {
  const { t } = useTranslation();

  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <TouchableOpacity onPress={onpress} activeOpacity={0.9}>
      <View style={styles.statIcon}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statCount}>
          {count} {t("common.items")}
        </Text>
      </View>
      </TouchableOpacity>
    </View>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  color: string;
}

function Section({ title, children, color }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
      {children}
    </View>
  );
}



