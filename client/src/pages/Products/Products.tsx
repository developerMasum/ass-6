import { useState } from "react";
import {
  Button,
  Divider,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Slider,
} from "antd";
import type { TableColumnsType } from "antd";

import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductNewMutation,
} from "../../redux/features/product/productApi";

import { toast } from "sonner";
import { Link } from "react-router-dom";

const { Option } = Select;
interface DataType {
  _id: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  brand: string;
  storageCapacity: string;
  operatingSystem: string;
  screenSize: string;
}

const Products = () => {
  // const { data, isLoading } = useGetAllProductsQuery("", );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedScreenSize, setSelectedScreenSize] = useState("");
  const [selectedStorageCapacity, setSelectedStorageCapacity] = useState("");
  const [selectedOperatingSystem, setSelectedOperatingSystem] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Set an initial price range

  const { data: queyData } = useGetAllProductsQuery({
    searchTerm,
    brand: selectedBrand,
    screenSize: selectedScreenSize,
    storageCapacity: selectedStorageCapacity,
    operatingSystem: selectedOperatingSystem,
    priceRange,
  });

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };

  const handleScreenSizeChange = (value: string) => {
    setSelectedScreenSize(value);
  };

  const handleStorageCapacityChange = (value: string) => {
    setSelectedStorageCapacity(value);
  };

  const handleOperatingSystemChange = (value: string) => {
    setSelectedOperatingSystem(value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    console.log();
  };

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductNewMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedProduct, setEditedProduct] = useState<DataType | null>(null);

  const handleDelete = (id: string) => {
    console.log("Deleting product with _id:", id);
    deleteProduct(id);
    toast.success("Product deleted successfully");
  };

  const handleEdit = (record: DataType) => {
    setEditedProduct(record);
    setIsModalVisible(true);
  };
  const handleDuplicate = (id: string) => {
    console.log("issue", id);
    // setEditedProduct(id);

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = () => {
    // Replace the console.log statement with your actual update logic

    const options = {
      productId: editedProduct?._id,
      data: {
        productName: editedProduct?.productName,
        productPrice: Number(editedProduct?.productPrice),
        productQuantity: Number(editedProduct?.productQuantity),
        brand: editedProduct?.brand,
        storageCapacity: editedProduct?.storageCapacity,
        operatingSystem: editedProduct?.operatingSystem,
        screenSize: editedProduct?.screenSize,
      },
    };
    console.log("Updating product:", options.data);
    updateProduct(options);
    console.log(updateProduct(options));
    setIsModalVisible(false);
    toast.success("Product updated successfully");
  };

  const handleInputChange = (fieldName: keyof DataType, value: any) => {
    // Update the editedProduct state with the new value
    setEditedProduct((prevProduct) => ({
      ...prevProduct!,
      [fieldName]: value,
    }));
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Smartphone Name",
      width: 80,
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Brand",
      width: 80,
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      width: 130,
    },
    {
      title: "Operating System",
      dataIndex: "operatingSystem",
      key: "operatingSystem",
      width: 130,
    },
    {
      title: "Storage Capacity",
      dataIndex: "storageCapacity",
      key: "storageCapacity",
      width: 130,
    },
    {
      title: "releaseDate",
      dataIndex: "releaseDate",
      key: "releaseDate",
      width: 130,
    },
    {
      title: "screenSize",
      dataIndex: "screenSize",
      key: "screenSize",
      width: 130,
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
      width: 130,
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      key: "productPrice",
      width: 130,
    },

    {
      title: "Action",
      key: "operation",

      width: 80,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "5px" }}>
          <Link to={`/product/${record._id}`}>
            <Button>
              Duplicate
            </Button>
          </Link>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <div
      className="customText customBg"
      style={{
        borderRadius: "25px",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Products</p>
        {/* FilterMenu component goes here */}
      </div>
      <Divider style={{ border: "2px solid white" }} />
      <div>
        {/* Search Bar */}
        <div className="w-1/3 mt-5 mb-5">
          <Input
            placeholder="Search Brand Name...."
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
          />
        </div>

        {/* Brand Dropdown */}
        <Select
          placeholder="Select Brand"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <option value="">Select Brand</option>
          <Option value="apple">Apple</Option>
          <Option value="samsung">Samsung</Option>
          <Option value="nokia">Nokia</Option>
          <Option value="xiaomi">Xiaomi</Option>
          <Option value="vivo">Vivo</Option>
          <Option value="oppo">Oppo</Option>
        </Select>

        {/* Screen Size Dropdown */}
        <Select
          placeholder="Select Screen Size"
          value={selectedScreenSize}
          onChange={handleScreenSizeChange}
        >
          <option value="">Select Screen Size</option>
          <Option value="5">5 inches</Option>
          <Option value="5.5">5.5 inches</Option>
          <Option value="6">6 inches</Option>
          <Option value="6.25">6.25 inches</Option>
          <Option value="7">7 inches</Option>
          <Option value="7.5">7.5 inches</Option>
          <Option value="8">8 inches</Option>
        </Select>

        <Select
          placeholder="Select Storage Capacity"
          value={selectedStorageCapacity}
          onChange={handleStorageCapacityChange}
        >
          <option value="">Select Storage</option>
          <Option value="16GB">16GB</Option>
          <Option value="32GB">32GB</Option>
          <Option value="64GB">64GB</Option>
          <Option value="128GB">128GB</Option>
          <Option value="512GB">512GB</Option>
          <Option value="1TB">1TB</Option>
        </Select>

        {/* Operating System Dropdown */}
        <Select
          placeholder="Select Operating System"
          value={selectedOperatingSystem}
          onChange={handleOperatingSystemChange}
        >
          <option value="">Select Operating System</option>
          <option value="IOS">IOS</option>
          <option value="Windows">Windows</option>
          <option value="Android">Android</option>
          {/* Add more options as needed */}
        </Select>

        {/* Price Range Slider */}
        <div className="w-1/3">
          <p className="font-semibold"> Price Range</p>
          <Slider
            range
            min={0}
            max={10000}
            value={priceRange}
            onChange={handlePriceRangeChange}
          />{" "}
        </div>
      </div>

      <Table
        className="customText customBg"
        columns={columns}
        dataSource={queyData?.data}
        scroll={{ x: 1300, y: 300 }}
      />

      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleUpdate}
      >
        {/* Your edit form goes here */}
        <Form>
          <Form.Item label="Product Name">
            <Input
              value={editedProduct?.productName}
              onChange={(e) => handleInputChange("productName", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Product Price">
            <Input
              value={editedProduct?.productPrice}
              onChange={(e) =>
                handleInputChange("productPrice", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Product Quantity">
            <Input
              value={editedProduct?.productQuantity}
              onChange={(e) =>
                handleInputChange("productQuantity", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Brand">
            <Input
              value={editedProduct?.brand}
              onChange={(e) => handleInputChange("brand", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="storage Capacity">
            <Input
              value={editedProduct?.storageCapacity}
              onChange={(e) =>
                handleInputChange("storageCapacity", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="storage Capacity">
            <Input
              value={editedProduct?.operatingSystem}
              onChange={(e) =>
                handleInputChange("operatingSystem", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="storage Capacity">
            <Input
              value={editedProduct?.screenSize}
              onChange={(e) => handleInputChange("screenSize", e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
