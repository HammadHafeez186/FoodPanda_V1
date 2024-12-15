import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF2B85",
    marginBottom: 20,
    textAlign: "center",
  },
  addonItem: {
    backgroundColor: "#FF2B85",        //"#fd5c63", 
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#FFD54F",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addonItemSelected: {
    backgroundColor: "#fd5c63",
    borderColor: "#FF6F00",
    borderWidth: 2,
  },
  addonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  addonPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  doneButton: {
    backgroundColor: "#FF2B85",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  doneButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  loadingText: {
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
    marginTop: 20,
  },
});