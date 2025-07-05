import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { toggleLogin } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/hooks";
import styles from "./style";
import { LanguageSwitcher } from "../../components";

export default function LoginScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languageSwitcher}>
        <LanguageSwitcher />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t('auth.welcome')}</Text>
        <Text style={styles.subtitle}>{t('auth.loginSubtitle')}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(toggleLogin())}
        >
          <Text style={styles.buttonText}>{t('auth.login')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
