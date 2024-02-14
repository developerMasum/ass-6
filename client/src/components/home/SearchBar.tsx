// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { SearchOutlined, UserOutlined } from '@ant-design/icons';
// // import { Avatar, Button } from 'antd';

// interface SearchBarProps {
//   // You can define any additional props here
// }

// const SearchBar: React.FC<SearchBarProps> = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = (data: { search: string }) => {
//     console.log(data.search);
//     // Add your search logic here
//   };

//   return (
//     <div className='flex justify-between items-center'>
//       <div>
//         <form onSubmit={handleSubmit(onSubmit)} className="relative">
//           <input
//             {...register('search')}
//             type="text"
//             className="bg-red-500 text-white px-8 py-1 rounded-md focus:outline-none"
//             placeholder="Search..."
//           />
//           <SearchOutlined className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white" />
//         </form>
//       </div>
     
//     </div>
//   );
// };

// export default SearchBar;
