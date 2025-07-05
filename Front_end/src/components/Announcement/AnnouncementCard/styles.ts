import { StyleSheet } from "react-native";
 
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 4,
    marginBottom: 18,
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 5,
    borderLeftColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginRight: 10,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  badgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  content: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  date: {
    fontSize: 13,
    color: "#64748b",
  },
  actions: {
    flexDirection: "row",
    gap: 14,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  disabledBtn: {
    backgroundColor: "#f8fafc",
    opacity: 0.5,
  },
});

export default styles;