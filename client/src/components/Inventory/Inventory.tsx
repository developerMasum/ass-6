import { Divider, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";

interface DataType {
  productName: string;
  productPrice: number;
  productQuantity: number;
  releaseDate: string;
  screenSize: string;
  storageCapacity: string;
  operatingSystem: string;
  model: string;
  brand: string;
  isDeleted: boolean;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Mobile Name",
    width: 100,
    dataIndex: "productName",
    key: "productName",
    
  
  },
  {
    title: "Brand",
    width: 100,
    dataIndex: "brand",
    key: "brand",
   
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
    width: 100,
  },
  {
    title: "Operating System",
    dataIndex: "operatingSystem",
    key: "operatingSystem",
    width: 100,
  },
 
  {
    title: "Storage",
    dataIndex: "storageCapacity",
    key: "storageCapacity",
    width: 100,
  },
  {
    title: "Price",
    dataIndex: "productPrice",
    key: "productPrice",
    width: 100,
  },
];

const Inventory = () => {
  const { data } = useGetAllProductsQuery("");

  return (
    <div style={{width:'1200px'}}>
      <div className="p-5 customText  customBg " >
      <p className="text-base font-semi-bold uppercase "> SmartPhones Inventory</p>
      <Divider style={{ border: '1px solid white' }} />
      <Table
        columns={columns}
        dataSource={data?.data}
        scroll={{ x: 1000, y: 100 }}
      />
    </div>
    </div>
  );
};

export default Inventory;
