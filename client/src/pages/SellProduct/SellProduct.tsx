import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  DatePicker,
  InputNumber,
  Spin,
} from "antd";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { useCreateSellMutation } from "../../redux/features/sells/sellsApi";
import { DownloadOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RRPdf from "../sellsHistory/reactPdf";
import moment from "moment";

const SellProduct: React.FC = () => {
  const { data, isLoading } = useGetAllProductsQuery("");
 
  const [createSell, { isLoading: isCreatingSell }] = useCreateSellMutation();

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPdfModal, setIsPdfModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const[pdfData,setPdfData] = useState({});
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button onClick={() => handleSell(record)} danger>
          Sell
        </Button>
      ),
    },
  ];

  const filteredData = data?.data?.filter(
    (item: { [key: string]: unknown }) =>
      (item.productQuantity as number) > 0 && 
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  
  const handleSell = (product: any) => {
    setSelectedProduct(product);
    setIsModalVisible(true);

    // Set default values for the "Buyer Name" and "Selling Date" fields
    form.setFieldsValue({
      productName: product.productName,
      productQuantity: undefined, // Clear previous value
      buyerName: "", // Set default buyer name
      productPrice: product.productPrice,
      sellingDate: undefined, // Set default selling date
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsPdfModal(false);
  };

  const onFinish = async (values: {
    productId: string;
    productName: string;
    productQuantity: number;
    buyerName: string;
    productPrice: number; 
    sellingDate: string;
  }) => {
    try {
      const productId = selectedProduct?._id;
      if (!productId) {
        throw new Error("Invalid product ID");
      }

      const updatedValues = { ...values, productId };
      setPdfData(updatedValues);
      await createSell(updatedValues);
      console.log(pdfData);

      // Optionally perform any actions after successful submission
      console.log("Sell created successfully");

      // Close the modal
      setIsModalVisible(false);
      setIsPdfModal(true);
      toast.success("Sell created successfully");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Input
        placeholder="Search by name, brand, quantity, price, category"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Spin spinning={isLoading}>
        <Table columns={columns} dataSource={filteredData} rowKey="_id" />
      </Spin>

      <Modal
        title="Sell Product Now"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="sell"
            danger
            onClick={() => form.submit()}
            loading={isCreatingSell}
          >
            Sell Product
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Product Name" name="productName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Product Price" name="productPrice">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Product Quantity" name="productQuantity">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Buyer Name" name="buyerName">
            <Input />
          </Form.Item>
          <Form.Item label="Selling Date" name="sellingDate">
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        centered
        open={isPdfModal}
        onCancel={() => setIsPdfModal(false)}
        visible={isPdfModal}
        okButtonProps={{ disabled: true }}
      >
        <p className="text-xl font-semibold">
          Do you want to download this Invoice?
        </p>
        <PDFDownloadLink
          document={<RRPdf data={pdfData} />}
          fileName={`invoice_${moment().format(
            "YYYYMMDD_HHmmss"
          )}.pdf`} 
        >
          {({ loading }) =>
            loading ? (
              "Loading..."
            ) : (
              <Button
                type="default"
                icon={<DownloadOutlined />}
                size={"middle"}
              >
                Download PDF
              </Button>
            )
          }
        </PDFDownloadLink>
      </Modal>
    </div>
  );
};

export default SellProduct;
