import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

// Define styles
const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 50,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center", // Center the text
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  watermark: {
    position: "absolute",
    fontSize: 12,
    opacity: 0.5,
    zIndex: 1,
    bottom: 20,
    right: "50%",
    transform: "translateX(50%)",
    textAlign: "center",
  },
  signature: {
    position: "absolute",
    bottom: 50,
    left: 50,
  },
});

// Define the component
const RRPdf = ({ data }: any) => {
  // Calculate total price
  const totalPrice = data?.productPrice * data?.productQuantity;
  // console.log(data.productPrice,data?.productQuantity,data);
  const formattedSellingDate =
    data.sellingDate instanceof Date
      ? moment(data.sellingDate).format("LL")
      : moment(new Date(data.sellingDate)).format("LL");
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Invoice</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Invoice Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Product Name</Text>
              <Text style={styles.tableColHeader}>Product Quantity</Text>
              <Text style={styles.tableColHeader}>Total Price</Text>
              <Text style={styles.tableColHeader}>Selling Date</Text>
              <Text style={styles.tableColHeader}>Buyer</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}>{data.productName}</Text>
              <Text style={styles.tableCol}>{data.productQuantity}</Text>
              <Text style={styles.tableCol}>{totalPrice} $USD</Text>
              <Text style={styles.tableCol}>{formattedSellingDate}</Text>
              <Text style={styles.tableCol}>{data.buyerName}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.watermark}>Computer Auto Generated</Text>
        <View style={styles.signature}>
          <Text>__________________________</Text>
          <Text>Date: {moment().format("LL")}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default RRPdf;
