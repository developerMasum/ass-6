// import React, { useState } from 'react';
// import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
// import { Input, Select, Slider } from 'antd';

// const { Option } = Select;

// const ProductList = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBrand, setSelectedBrand] = useState("");
//   const [selectedScreenSize, setSelectedScreenSize] = useState("");
//   const [selectedStorageCapacity, setSelectedStorageCapacity] = useState("");
//   const [selectedOperatingSystem, setSelectedOperatingSystem] = useState("");
//   const [priceRange, setPriceRange] = useState([0, 1000]); // Set an initial price range

//   const { queryData } = useGetAllProductsQuery({
//     searchTerm,
//     brand: selectedBrand,
//     screenSize: selectedScreenSize,
//     storageCapacity: selectedStorageCapacity,
//     operatingSystem: selectedOperatingSystem,
//     priceRange,
//   });

//   const handleSearchTermChange = (value: string) => {
//     setSearchTerm(value);
//   };

//   const handleBrandChange = (value: string) => {
//     setSelectedBrand(value);
//   };

//   const handleScreenSizeChange = (value: string) => {
//     setSelectedScreenSize(value);
   
//   };

//   const handleStorageCapacityChange = (value: string) => {
//     setSelectedStorageCapacity(value);
//   };

//   const handleOperatingSystemChange = (value: string) => {
//     setSelectedOperatingSystem(value);
//   };

//   const handlePriceRangeChange = (value: [number, number]) => {
//     setPriceRange(value);
//     console.log();
//   };

//   console.log("from issue ", queryData);

//   return (
//     <div>
//       <h1>Product List</h1>

//       {/* Search Bar */}
//       <Input placeholder="Search products..." value={searchTerm} onChange={(e) => handleSearchTermChange(e.target.value)} />

//       {/* Brand Dropdown */}
//       <Select placeholder="Select Brand" value={selectedBrand} onChange={handleBrandChange}>
//       <option value="">Select</option>
//         <Option value="apple">Apple</Option>
//         <Option value="samsung">Samsung</Option>
//         <Option value="nokia">Nokia</Option>
//         <Option value="xiaomi">Xiaomi</Option>
//         <Option value="vivo">Vivo</Option>
//         <Option value="oppo">Oppo</Option>
        
//       </Select>

//       {/* Screen Size Dropdown */}
//       <Select placeholder="Select Screen Size" value={selectedScreenSize} onChange={handleScreenSizeChange}>
//       <option value="">Select</option>
//         <Option value="5">5 inches</Option>
//         <Option value="5.5">5.5 inches</Option>
//         <Option value="6">6 inches</Option>
//         <Option value="6.25">6.25 inches</Option>
//         <Option value="7">7 inches</Option>
//         <Option value="7.5">7.5 inches</Option>
//         <Option value="8">8 inches</Option>
       
//       </Select>

//       <Select placeholder="Select Storage Capacity" value={selectedStorageCapacity} onChange={handleStorageCapacityChange}>
//       <option value="">Select</option>
// <Option value="16GB">16GB</Option>
//         <Option value="32GB">32GB</Option>
//         <Option value="64GB">64GB</Option>
//         <Option value="128GB">128GB</Option>
//         <Option value="512GB">512GB</Option>
//         <Option value="1TB">1TB</Option>
        
//       </Select>

//       {/* Operating System Dropdown */}
//       <Select placeholder="Select Operating System" value={selectedOperatingSystem} onChange={handleOperatingSystemChange}>
//       <option value="">Select</option>
//       <option value="IOS">IOS</option>
//             <option value="Windows">Windows</option>
//             <option value="Android">Android</option>
//         {/* Add more options as needed */}
//       </Select>

//       {/* Price Range Slider */}
//       <Slider range min={0} max={10000} value={priceRange} onChange={handlePriceRangeChange} />

//       {/* Render your product list using the 'queryData' from the API */}

//       {queryData && (
//         <div>
//           {queryData?.queryData?.map((product) => (
//             <div key={product?.id}>
//               {/* Render product details here */}
//               <p>{product?.productName}</p>
//               <p>{product?.price}</p>
//               {/* Add more details as needed */}
//             </div>
//           ))}
//         </div>
//       )}
    
//     </div>
//   );
// };

// export default ProductList;
