import { StyleSheet } from "react-native";
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  
  backBtn: {
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  languageSwitcher: {
    marginRight: 8,
  },
  list: {
    padding: 15,
    paddingTop: 8,
  },
  errorContainer: {
    backgroundColor: "#fef2f2",
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default styles;