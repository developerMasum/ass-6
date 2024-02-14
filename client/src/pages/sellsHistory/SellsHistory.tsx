import React, { useState } from "react";
import { Table, Select, Button } from "antd";
import { useGetAllSellQuery } from "../../redux/features/sells/sellsApi";
import Loader from "../../components/utils/Loader";
import moment from "moment";
import { PDFDownloadLink } from '@react-pdf/renderer';
import RRPdf from "./reactPdf";
import { DownloadOutlined } from "@ant-design/icons";


const { Option } = Select;

interface SellData {
  productName: string;
  productQuantity: number;
  sellingDate: Date;
  buyerName: string;
}

const SellsHistory: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const {
    data: sellsData,
    isLoading,
  } = useGetAllSellQuery(category);
// console.log(sellsData);
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Product quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Selling Date",
      dataIndex: "sellingDate",
      key: "sellingDate",
      render: (text: Date) => moment(text).format('LLL')
    },
    {
      title: "Buyer",
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: "Download Invoice",
      dataIndex: "download",
      render: (_: any, record: SellData) => (
       
        <PDFDownloadLink
  document={<RRPdf data={record} />}
  fileName={`invoice_${record.buyerName}_${moment().format("YYYYMMDD_HHmmss")}.pdf`}
  
>
  {({ loading }) => (loading ? 'Loading...' :  <Button type="default" icon={<DownloadOutlined />} size={"middle"}>Download PDF</Button>)}
</PDFDownloadLink>

      ),
      
    },
    
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sells History</h1>
      <div style={styles.categorySelector}>
        <label style={styles.label}>Select Category:</label>
        <Select
          style={styles.select}
          defaultValue=""
          onChange={(value: string) => setCategory(value)}
        >
          <Option value="">All</Option>
          <Option value="weekly">Weekly</Option>
          <Option value="daily">Daily</Option>
          <Option value="monthly">Monthly</Option>
          <Option value="yearly">Yearly</Option>
        </Select>
      </div>

      <Table
        dataSource={sellsData?.data || []}
        columns={columns}
        pagination={false}
        scroll={{ x: true }}
        style={styles.table}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: "#fff",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  header: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  },
  categorySelector: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  label: {
    marginRight: "10px",
    fontSize: "14px",
    color: "#555",
  },
  select: {
    width: "150px",
  },
  table: {
    marginTop: "20px",
  },
};

export default SellsHistory;
