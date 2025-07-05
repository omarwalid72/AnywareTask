import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

// Import screens
import DashboardScreen from '../screens/DashBoardScreen/DashboardScreen';
import QuizzesScreen from '../screens/QuizzesScreen/QuizzesScreen';
import AnnouncementsScreen from '../screens/AnnouncementsScreen/AnnouncementsScreen';
import { LanguageSwitcher } from '../components';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Quizzes':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Announcements':
              iconName = focused ? 'megaphone' : 'megaphone-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingVertical: 4,
          height: 85,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 2,
        },
        headerStyle: {
          backgroundColor: '#ffffff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 3,
          height: 100, 
        },
        headerTitleStyle: {
          fontSize: 20, 
          fontWeight: 'bold',
          color: '#1f2937',
        },
        headerRightContainerStyle: {
          paddingRight: 12, 
        },
        headerTitleContainerStyle: {
          paddingHorizontal: 6, 
        },
        headerRight: () => (
          <View style={styles.headerRight}>
            <LanguageSwitcher />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={({ navigation }) => ({
          title: t('navigation.dashboard'),
          headerTitle: t('dashboard.title'),
          headerRight: () => (
            <View style={styles.headerRight}>
              <LanguageSwitcher />
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={() => {
                  // This will trigger logout from DashboardScreen
                  navigation.setParams({ triggerLogout: Date.now() });
                }}
              >
                <Ionicons name="log-out-outline" size={24} color="#dc2626" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Quizzes"
        component={QuizzesScreen}
        options={({ navigation }) => ({
          title: t('navigation.quizzes'),
          headerTitle: t('quizzes.title'),
          headerRight: () => (
            <View style={styles.headerRight}>
              <LanguageSwitcher />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                  // This will trigger the add function in QuizzesScreen
                  navigation.setParams({ triggerAdd: Date.now() });
                }}
              >
                <Ionicons name="add-circle" size={28} color="#3b82f6" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Announcements"
        component={AnnouncementsScreen}
        options={({ navigation }) => ({
          title: t('navigation.announcements'),
          headerTitle: t('announcements.title'),
          headerRight: () => (
            <View style={styles.headerRight}>
              <LanguageSwitcher />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                  // This will trigger the add function in AnnouncementsScreen
                  navigation.setParams({ triggerAdd: Date.now() });
                }}
              >
                <Ionicons name="add-circle" size={28} color="#3b82f6" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, 
  },
  addButton: {
    padding: 4,
  },
  logoutButton: {
    padding: 4,
  },
});
