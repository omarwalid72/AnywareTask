import { StyleSheet } from "react-native";
 
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 4,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginRight: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 14,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 5,
  },
  category: {
    fontSize: 13,
    color: "#6366f1",
    fontWeight: "600",
    marginLeft: "auto",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  iconBtn: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
    backgroundColor: "#f3f4f6",
  },
  disabledBtn: {
    backgroundColor: "#f8fafc",
    opacity: 0.5,
  },
});

export default styles;