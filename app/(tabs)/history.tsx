import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Platform } from "react-native";

export default function TabTwoScreen() {
  const [redemptionHistory, setRedemptionHistory] = useState([
    { date: "2024-12-08", transactionName: "Order 123", order: "Completed" },
    { date: "2024-12-09", transactionName: "Order 124", order: "Completed" },
    { date: "2024-12-09", transactionName: "Order 125", order: "Cancelled" },
    { date: "2024-12-09", transactionName: "Order 126", order: "Cancelled" },
    { date: "2024-12-10", transactionName: "Order 127", order: "Completed" },
    { date: "2024-12-10", transactionName: "Order 128", order: "Completed" },
    { date: "2024-12-11", transactionName: "Order 129", order: "Cancelled" },
    { date: "2024-12-11", transactionName: "Order 130", order: "Completed" },
    { date: "2024-12-12", transactionName: "Order 131", order: "Pending" },
  ]);

  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableHeader, styles.cell]}>Date</Text>
      <Text style={[styles.tableHeader, styles.cell]}>Transaction Name</Text>
      <Text style={[styles.tableHeader, styles.cell]}>Order</Text>
    </View>
  );

  const renderTableRow = ({ item }: { item: any }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, styles.cellText]}>{item.date}</Text>
      <Text style={[styles.cell, styles.cellText]}>{item.transactionName}</Text>
      <Text style={[styles.cell, styles.cellText]}>{item.order}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Redemption History</Text>
      <FlatList
        data={redemptionHistory}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderTableHeader}
        renderItem={renderTableRow}
        style={styles.table}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF7F2",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 75,
  },
  table: {
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: {
    fontWeight: "700",
    textAlign: "center",
    padding: 8,
    backgroundColor: "#E4EFF2",
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
  },
  cellText: {
    fontSize: 16,
  },
});
